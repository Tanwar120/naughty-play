import { 
  users, type User, type InsertUser,
  wallets, type Wallet, type InsertWallet,
  transactions, type Transaction, type InsertTransaction,
  gameHistory, type GameHistory, type InsertGameHistory 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Wallet methods
  getWallet(userId: number): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  updateWalletBalance(userId: number, amount: number): Promise<Wallet | undefined>;
  
  // Transaction methods
  getTransactions(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Game history methods
  getGameHistory(userId: number): Promise<GameHistory[]>;
  createGameHistory(gameHistory: InsertGameHistory): Promise<GameHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private wallets: Map<number, Wallet>;
  private transactions: Map<number, Transaction>;
  private gameHistories: Map<number, GameHistory>;
  
  private userIdCounter: number;
  private walletIdCounter: number;
  private transactionIdCounter: number;
  private gameHistoryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.transactions = new Map();
    this.gameHistories = new Map();
    
    this.userIdCounter = 1;
    this.walletIdCounter = 1;
    this.transactionIdCounter = 1;
    this.gameHistoryIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Wallet methods
  async getWallet(userId: number): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.userId === userId,
    );
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const id = this.walletIdCounter++;
    const createdAt = new Date();
    const wallet: Wallet = { ...insertWallet, id, createdAt };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async updateWalletBalance(userId: number, amount: number): Promise<Wallet | undefined> {
    const wallet = await this.getWallet(userId);
    if (!wallet) return undefined;
    
    const updatedWallet = { 
      ...wallet, 
      balance: Number(wallet.balance) + amount 
    };
    
    this.wallets.set(wallet.id, updatedWallet);
    return updatedWallet;
  }

  // Transaction methods
  async getTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const createdAt = new Date();
    const transaction: Transaction = { ...insertTransaction, id, createdAt };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Game history methods
  async getGameHistory(userId: number): Promise<GameHistory[]> {
    return Array.from(this.gameHistories.values()).filter(
      (history) => history.userId === userId,
    );
  }

  async createGameHistory(insertGameHistory: InsertGameHistory): Promise<GameHistory> {
    const id = this.gameHistoryIdCounter++;
    const createdAt = new Date();
    const gameHistory: GameHistory = { ...insertGameHistory, id, createdAt };
    this.gameHistories.set(id, gameHistory);
    return gameHistory;
  }
}

export const storage = new MemStorage();
