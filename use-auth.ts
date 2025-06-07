import React, { useState, useEffect, createContext, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return;
      }
      
      setUser(null);
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password,
      });
      
      const data = await response.json();
      setUser(data.user);
      
      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/games/history"] });
      
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to login");
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await apiRequest("POST", "/api/auth/register", {
        username,
        email,
        password,
      });
      
      const data = await response.json();
      setUser(data.user);
      
      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to register");
    }
  };

  const logout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      setUser(null);
      
      // Clear all user-related queries from cache
      queryClient.removeQueries({ queryKey: ["/api/wallet"] });
      queryClient.removeQueries({ queryKey: ["/api/transactions"] });
      queryClient.removeQueries({ queryKey: ["/api/games/history"] });
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return React.createElement(AuthContext.Provider, {
    value: {
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      checkAuth,
    },
    children
  });
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
