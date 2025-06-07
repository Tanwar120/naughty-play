import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertWalletSchema, insertTransactionSchema, insertGameHistorySchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";
import { z } from "zod";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  const SessionStore = MemoryStore(session);
  
  app.use(
    session({
      store: new SessionStore({ checkPeriod: 86400000 }), // 24h
      secret: process.env.SESSION_SECRET || "noughtyplay-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Authentication middleware
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Helper function to hash passwords
  const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  // AUTH ROUTES
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(validatedData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(validatedData.password);
      
      // Create the user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      // Create a wallet for the user
      await storage.createWallet({
        userId: user.id,
        balance: 1000, // Give some initial balance for demo purposes
      });
      
      // Set session
      req.session.userId = user.id;
      
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: "User not found" });
      }
      
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  // WALLET ROUTES
  app.get("/api/wallet", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const wallet = await storage.getWallet(userId);
      
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      return res.status(200).json({ wallet });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/wallet/deposit", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const { amount } = req.body;
      
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      
      // Update wallet balance
      const updatedWallet = await storage.updateWalletBalance(userId, Number(amount));
      
      if (!updatedWallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "deposit",
        amount: Number(amount),
        status: "completed",
      });
      
      return res.status(200).json({ 
        message: "Deposit successful", 
        wallet: updatedWallet 
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/wallet/withdraw", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const { amount } = req.body;
      
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      
      const wallet = await storage.getWallet(userId);
      
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      if (Number(wallet.balance) < Number(amount)) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      
      // Update wallet balance (subtract amount)
      const updatedWallet = await storage.updateWalletBalance(userId, -Number(amount));
      
      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "withdraw",
        amount: Number(amount),
        status: "completed",
      });
      
      return res.status(200).json({ 
        message: "Withdrawal successful", 
        wallet: updatedWallet 
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  // TRANSACTIONS HISTORY
  app.get("/api/transactions", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const transactions = await storage.getTransactions(userId);
      
      return res.status(200).json({ transactions });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  // GAME ROUTES
  app.post("/api/games/bet", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const { gameType, betAmount } = req.body;
      
      if (!gameType || !betAmount || isNaN(Number(betAmount)) || Number(betAmount) <= 0) {
        return res.status(400).json({ message: "Invalid bet data" });
      }
      
      const wallet = await storage.getWallet(userId);
      
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      if (Number(wallet.balance) < Number(betAmount)) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      
      // Simulate a random outcome for the game
      // For simplicity, we'll use a 50% chance to win or lose
      const isWin = Math.random() >= 0.5;
      const winMultiplier = isWin ? (Math.random() * 2) + 1 : 0; // Random multiplier between 1 and 3 if won
      const outcome = isWin ? Number(betAmount) * winMultiplier - Number(betAmount) : -Number(betAmount);
      
      // Update wallet balance
      await storage.updateWalletBalance(userId, outcome);
      
      // Create game history record
      const gameHistoryRecord = await storage.createGameHistory({
        userId,
        gameType,
        betAmount: Number(betAmount),
        outcome,
      });
      
      // Create transaction record
      await storage.createTransaction({
        userId,
        type: isWin ? "win" : "bet",
        amount: Math.abs(outcome),
        status: "completed",
      });
      
      const updatedWallet = await storage.getWallet(userId);
      
      return res.status(200).json({
        message: isWin ? "Congratulations! You won!" : "Better luck next time!",
        gameResult: gameHistoryRecord,
        wallet: updatedWallet,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/games/history", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const gameHistory = await storage.getGameHistory(userId);
      
      return res.status(200).json({ gameHistory });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

  // WHITEPAPER DOWNLOAD (mock endpoint)
  app.get("/api/whitepaper", (req, res) => {
    return res.status(200).json({ 
      message: "Whitepaper download link", 
      downloadUrl: "/whitepaper.pdf" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
