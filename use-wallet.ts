import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";

interface Wallet {
  id: number;
  userId: number;
  balance: string;
  createdAt: string;
}

interface Transaction {
  id: number;
  userId: number;
  type: string;
  amount: string;
  status: string;
  createdAt: string;
}

export const useWallet = () => {
  const { isAuthenticated } = useAuth();
  
  const {
    data: wallet,
    isLoading: isWalletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: ["/api/wallet"],
    enabled: isAuthenticated,
    staleTime: 30000, // 30 seconds
  });
  
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["/api/transactions"],
    enabled: isAuthenticated,
    staleTime: 30000, // 30 seconds
  });
  
  const depositMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await apiRequest("POST", "/api/wallet/deposit", { amount });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
  });
  
  const withdrawMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await apiRequest("POST", "/api/wallet/withdraw", { amount });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
  });
  
  const gameHistoryMutation = useMutation({
    mutationFn: async ({ gameType, betAmount }: { gameType: string; betAmount: number }) => {
      const response = await apiRequest("POST", "/api/games/bet", {
        gameType,
        betAmount,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/games/history"] });
    },
  });
  
  return {
    wallet: wallet?.wallet as Wallet | undefined,
    transactions: transactions?.transactions as Transaction[] | undefined,
    isWalletLoading,
    isTransactionsLoading,
    walletError,
    transactionsError,
    refetchWallet,
    refetchTransactions,
    deposit: depositMutation.mutate,
    withdraw: withdrawMutation.mutate,
    placeBet: gameHistoryMutation.mutate,
    isDepositLoading: depositMutation.isPending,
    isWithdrawLoading: withdrawMutation.isPending,
    isPlaceBetLoading: gameHistoryMutation.isPending,
  };
};
