import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CryptoCard } from "@/components/ui/crypto-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { CRYPTO_COINS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useWallet } from "@/hooks/use-wallet";
import { apiRequest } from "@/lib/queryClient";
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Generate some mock chart data
const generateChartData = () => {
  const data = [];
  let price = 58000 + Math.random() * 2000;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random price movement
    price = price + (Math.random() - 0.5) * 500;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: price
    });
  }
  
  return data;
};

const chartData = generateChartData();

interface TransactionModalProps {
  type: "deposit" | "withdraw";
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const TransactionModal = ({ type, isOpen, onClose, onSubmit }: TransactionModalProps) => {
  const [amount, setAmount] = useState<string>("100");
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div 
        className="glass p-6 rounded-xl w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-space font-bold">
            {type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
            />
            <span className="absolute right-3 top-2 text-gray-400">USDT</span>
          </div>
          
          {type === "deposit" && (
            <div className="mt-2 text-sm text-gray-400">
              <i className="fas fa-info-circle mr-1"></i> 
              Funds will be instantly added to your wallet for demo purposes.
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
          <GradientButton
            className="flex-1"
            onClick={() => onSubmit(Number(amount))}
          >
            {type === "deposit" ? "Deposit" : "Withdraw"}
          </GradientButton>
        </div>
      </motion.div>
    </div>
  );
};

const Exchange = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [buyAmount, setBuyAmount] = useState<string>("0.05");
  const [buyPrice, setBuyPrice] = useState<string>("59,342.80");
  const [sellAmount, setSellAmount] = useState<string>("0.05");
  const [sellPrice, setSellPrice] = useState<string>("59,342.80");
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const { wallet, refetchWallet } = useWallet();
  
  useEffect(() => {
    document.title = "Crypto Exchange | NOUGHTYPLAY";
  }, []);
  
  const calculateTotal = (amount: string, price: string): string => {
    const cleanedPrice = price.replace(/,/g, '');
    const numAmount = parseFloat(amount) || 0;
    const numPrice = parseFloat(cleanedPrice) || 0;
    return (numAmount * numPrice).toFixed(2);
  };
  
  const buyTotal = calculateTotal(buyAmount, buyPrice);
  const sellTotal = calculateTotal(sellAmount, sellPrice);
  
  const handleDeposit = async (amount: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to deposit funds.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/wallet/deposit", {
        amount: amount
      });
      
      const result = await response.json();
      
      // Refresh wallet data
      await refetchWallet();
      
      toast({
        title: "Deposit Successful",
        description: `$${amount} has been added to your wallet.`,
      });
      
      setTransactionType(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deposit funds. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleWithdraw = async (amount: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to withdraw funds.",
        variant: "destructive"
      });
      return;
    }
    
    if (!wallet || Number(wallet.balance) < amount) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds to withdraw this amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/wallet/withdraw", {
        amount: amount
      });
      
      const result = await response.json();
      
      // Refresh wallet data
      await refetchWallet();
      
      toast({
        title: "Withdrawal Successful",
        description: `$${amount} has been withdrawn from your wallet.`,
      });
      
      setTransactionType(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to withdraw funds. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBuy = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to trade.",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(buyTotal);
    
    if (!wallet || Number(wallet.balance) < amount) {
      toast({
        title: "Insufficient Balance",
        description: "Please deposit funds to your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order Placed",
      description: `You've successfully purchased ${buyAmount} BTC for $${buyTotal}.`,
    });
  };
  
  const handleSell = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to trade.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order Placed",
      description: `You've successfully sold ${sellAmount} BTC for $${sellTotal}.`,
    });
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <TransactionModal 
        type={transactionType || "deposit"}
        isOpen={transactionType !== null}
        onClose={() => setTransactionType(null)}
        onSubmit={transactionType === "deposit" ? handleDeposit : handleWithdraw}
      />
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-space font-bold text-3xl md:text-5xl mb-4">Crypto Exchange</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Trade cryptocurrencies seamlessly with real-time market updates, low fees, and instant transactions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crypto Wallet Card */}
          <motion.div 
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-space font-medium text-xl mb-4">Your Wallet</h3>
            <img 
              src="https://pixabay.com/get/gc31f3a2bbb1999b7fea4640c3f438f4b0497cafc30203a52f9349e933c87d872e795df24b7bd0a80593f276f0ab5fd8a4d3e1bc11f0e0bddf2c25cb1a4b6b862_1280.jpg" 
              alt="Crypto wallet interface" 
              className="w-full rounded-lg mb-6" 
            />
            
            <div className="space-y-4">
              {CRYPTO_COINS.slice(0, 3).map((coin) => (
                <CryptoCard
                  key={coin.symbol}
                  name={coin.name}
                  symbol={coin.symbol}
                  icon={coin.icon}
                  color={coin.color}
                  amount={coin.symbol === "BTC" ? 0.325 : coin.symbol === "ETH" ? 4.78 : 1250}
                  value={coin.symbol === "BTC" ? 19245.00 : coin.symbol === "ETH" ? 9892.00 : 1250.00}
                />
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-dark-slate/40 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Available Balance:</span>
                <span className="font-medium">
                  ${wallet ? Number(wallet.balance).toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.button 
                className="text-center bg-purple-primary hover:bg-purple-secondary transition-colors py-2 rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTransactionType("deposit")}
              >
                <i className="fas fa-arrow-down mr-1"></i> Deposit
              </motion.button>
              <motion.button 
                className="text-center border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTransactionType("withdraw")}
              >
                <i className="fas fa-arrow-up mr-1"></i> Withdraw
              </motion.button>
            </div>
          </motion.div>
          
          {/* Trading Chart */}
          <motion.div 
            className="glass rounded-xl p-6 lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="token-glow text-amber-400 mr-2 text-2xl">
                  <i className="fab fa-bitcoin"></i>
                </div>
                <h3 className="font-space font-medium text-xl">BTC/USDT</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#00FFFF]">$59,342.80</div>
                <div className="text-green-400 text-sm">+5.32% <i className="fas fa-arrow-up"></i></div>
              </div>
            </div>
            
            <div className="h-64 md:h-80 bg-dark-slate/60 rounded-lg mb-6 relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    orientation="right"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2e293880', 
                      borderColor: '#C300FF50',
                      borderRadius: '8px',
                      backdropFilter: 'blur(4px)'
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#C300FF" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="absolute top-0 right-0 m-3">
                <div className="flex space-x-2">
                  {["1H", "1D", "1W", "1M"].map((timeframe) => (
                    <button 
                      key={timeframe}
                      className={`${
                        activeTimeframe === timeframe 
                          ? "bg-purple-primary" 
                          : "bg-dark-slate"
                      } px-3 py-1 rounded text-sm`}
                      onClick={() => setActiveTimeframe(timeframe)}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trading Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-slate/60 rounded-lg p-4">
                <h4 className="font-medium text-center mb-3">Buy BTC</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Amount</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={buyAmount} 
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">BTC</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Price</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={buyPrice} 
                        onChange={(e) => setBuyPrice(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Total</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formatNumber(parseFloat(buyTotal))} 
                        readOnly
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <GradientButton className="w-full" onClick={handleBuy}>
                    Buy BTC
                  </GradientButton>
                </div>
              </div>
              
              <div className="bg-dark-slate/60 rounded-lg p-4">
                <h4 className="font-medium text-center mb-3">Sell BTC</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Amount</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={sellAmount} 
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">BTC</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Price</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={sellPrice} 
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Total</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formatNumber(parseFloat(sellTotal))} 
                        readOnly
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <button 
                    className="w-full border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium"
                    onClick={handleSell}
                  >
                    Sell BTC
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Market Trends */}
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-space font-bold text-xl mb-6">Market Trends</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-dark-slate/60">
                  <th className="text-left p-4 rounded-tl-lg">#</th>
                  <th className="text-left p-4">Coin</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">24h Change</th>
                  <th className="text-left p-4">24h Volume</th>
                  <th className="text-left p-4 rounded-tr-lg">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {CRYPTO_COINS.map((coin, index) => (
                  <tr key={coin.symbol} className={index < CRYPTO_COINS.length - 1 ? "border-b border-dark-slate/30" : ""}>
                    <td className={`p-4 ${index === CRYPTO_COINS.length - 1 ? "rounded-bl-lg" : ""}`}>{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <i className={`${coin.icon.includes('-') ? 'fas' : 'fab'} fa-${coin.icon} ${coin.color} mr-2`}></i>
                        <span>{coin.name}</span>
                        <span className="text-gray-400 ml-2">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="p-4">${coin.price.toLocaleString()}</td>
                    <td className={`p-4 ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {coin.change >= 0 ? "+" : ""}{coin.change}%
                    </td>
                    <td className="p-4">${(Math.random() * 50).toFixed(1)}B</td>
                    <td className={`p-4 ${index === CRYPTO_COINS.length - 1 ? "rounded-br-lg" : ""}`}>
                      ${(Math.random() * 1200).toFixed(1)}B
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Exchange;
