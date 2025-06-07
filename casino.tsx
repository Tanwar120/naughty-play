import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameCard } from "@/components/ui/game-card";
import { CASINO_GAMES, GAME_TYPES } from "@/lib/constants";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useWallet } from "@/hooks/use-wallet";
import { apiRequest } from "@/lib/queryClient";

interface GameModalProps {
  gameType: string;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (amount: number) => void;
}

const GameModal = ({ gameType, isOpen, onClose, onPlay }: GameModalProps) => {
  const [betAmount, setBetAmount] = useState<string>("10");
  
  if (!isOpen) return null;
  
  const gameTitle = CASINO_GAMES.find(game => game.type === gameType)?.title || "Game";
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div 
        className="glass p-6 rounded-xl w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-space font-bold">{gameTitle}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Bet Amount
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
            />
            <span className="absolute right-3 top-2 text-gray-400">USDT</span>
          </div>
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
            onClick={() => onPlay(Number(betAmount))}
          >
            Play Now
          </GradientButton>
        </div>
      </motion.div>
    </div>
  );
};

const Casino = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { wallet, refetchWallet } = useWallet();
  
  useEffect(() => {
    document.title = "Casino Games | NOUGHTYPLAY";
  }, []);
  
  const handleGameSelect = (gameType: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to play games.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedGame(gameType);
    setIsModalOpen(true);
  };
  
  const handlePlayGame = async (betAmount: number) => {
    if (!user || !selectedGame) return;
    
    if (!wallet || Number(wallet.balance) < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Please deposit funds to your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/games/bet", {
        gameType: selectedGame,
        betAmount: betAmount
      });
      
      const result = await response.json();
      
      // Refresh wallet data
      await refetchWallet();
      
      toast({
        title: result.message,
        description: `Your new balance: $${Number(result.wallet.balance).toFixed(2)}`,
        variant: result.message.includes("Congratulations") ? "default" : "destructive"
      });
      
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place bet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <GameModal 
        gameType={selectedGame || ""}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlay={handlePlayGame}
      />
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-space font-bold text-3xl md:text-5xl mb-4">Premium Casino Games</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Experience the thrill of our high-stakes crypto casino games with stunning graphics and provably fair outcomes.
          </p>
        </motion.div>
        
        {/* Featured Games */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CASINO_GAMES.map((game) => (
            <div key={game.id} onClick={() => handleGameSelect(game.type)}>
              <GameCard
                id={game.id}
                title={game.title}
                description={game.description}
                image={game.image}
                type={game.type}
              />
            </div>
          ))}
        </div>
        
        {/* Game Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <motion.div 
            className="glass rounded-xl p-6 hover:bg-dark-purple transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-purple-secondary text-4xl mb-4">
              <i className="fas fa-trophy"></i>
            </div>
            <h3 className="font-space text-xl font-bold mb-2">Tournaments</h3>
            <p className="text-gray-300 mb-4">
              Compete against other players in daily, weekly, and monthly tournaments with huge prize pools.
            </p>
            <GradientButton variant="outline" className="w-full">
              View Tournaments
            </GradientButton>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl p-6 hover:bg-dark-purple transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-purple-secondary text-4xl mb-4">
              <i className="fas fa-gem"></i>
            </div>
            <h3 className="font-space text-xl font-bold mb-2">VIP Program</h3>
            <p className="text-gray-300 mb-4">
              Join our exclusive VIP program for cashback, personal manager, and unique bonuses.
            </p>
            <GradientButton variant="outline" className="w-full">
              VIP Details
            </GradientButton>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl p-6 hover:bg-dark-purple transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-purple-secondary text-4xl mb-4">
              <i className="fas fa-gift"></i>
            </div>
            <h3 className="font-space text-xl font-bold mb-2">Bonuses & Promotions</h3>
            <p className="text-gray-300 mb-4">
              Check out our latest bonuses, free spins, and special promotions.
            </p>
            <GradientButton variant="outline" className="w-full">
              View Promotions
            </GradientButton>
          </motion.div>
        </div>
        
        {/* Features */}
        <div className="mt-20">
          <motion.h2 
            className="text-center font-space font-bold text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Why Play with NOUGHTYPLAY
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-5xl text-purple-secondary mb-4 flex justify-center">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="font-space text-xl font-bold mb-2">Provably Fair Games</h3>
              <p className="text-gray-300">
                All our games use blockchain technology to ensure fairness and transparency.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="text-5xl text-purple-secondary mb-4 flex justify-center">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="font-space text-xl font-bold mb-2">Instant Withdrawals</h3>
              <p className="text-gray-300">
                Withdraw your winnings instantly to your crypto wallet without delays.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-5xl text-purple-secondary mb-4 flex justify-center">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="font-space text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-300">
                Our dedicated support team is available 24/7 to assist you with any queries.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casino;
