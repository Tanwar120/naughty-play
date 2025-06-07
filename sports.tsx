import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SportsCard } from "@/components/ui/sports-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useWallet } from "@/hooks/use-wallet";
import { apiRequest } from "@/lib/queryClient";
import { 
  LIVE_SPORTS_EVENTS, 
  UPCOMING_SPORTS_EVENTS, 
  POPULAR_LEAGUES,
  SPORTS_CATEGORIES
} from "@/lib/constants";

interface BetModalProps {
  matchInfo: {
    league: string;
    teamA: string;
    teamB: string;
    odds: {
      home: number;
      draw?: number;
      away: number;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceBet: (amount: number, selection: string) => void;
}

const BetModal = ({ matchInfo, isOpen, onClose, onPlaceBet }: BetModalProps) => {
  const [betAmount, setBetAmount] = useState<string>("10");
  const [selection, setSelection] = useState<string>("home");
  
  if (!isOpen || !matchInfo) return null;
  
  const getSelectionOdds = () => {
    if (selection === "home") return matchInfo.odds.home;
    if (selection === "draw" && matchInfo.odds.draw) return matchInfo.odds.draw;
    return matchInfo.odds.away;
  };
  
  const getPotentialWinnings = () => {
    const amount = parseFloat(betAmount) || 0;
    const odds = getSelectionOdds();
    return (amount * odds).toFixed(2);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div 
        className="glass p-6 rounded-xl w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-space font-bold">Place Your Bet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="mb-4 text-center p-3 bg-dark-slate/60 rounded-lg">
          <div className="text-sm text-purple-secondary mb-1">{matchInfo.league}</div>
          <div className="text-lg font-medium">
            {matchInfo.teamA} vs {matchInfo.teamB}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            Select Outcome
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`p-2 rounded-lg font-medium text-sm ${
                selection === "home" 
                  ? "bg-purple-primary" 
                  : "bg-dark-slate/60 hover:bg-purple-primary/30"
              }`}
              onClick={() => setSelection("home")}
            >
              {matchInfo.teamA} Win<br/>
              <span className="text-xs">{matchInfo.odds.home.toFixed(2)}</span>
            </button>
            
            {matchInfo.odds.draw && (
              <button
                className={`p-2 rounded-lg font-medium text-sm ${
                  selection === "draw" 
                    ? "bg-purple-primary" 
                    : "bg-dark-slate/60 hover:bg-purple-primary/30"
                }`}
                onClick={() => setSelection("draw")}
              >
                Draw<br/>
                <span className="text-xs">{matchInfo.odds.draw.toFixed(2)}</span>
              </button>
            )}
            
            <button
              className={`p-2 rounded-lg font-medium text-sm ${
                selection === "away" 
                  ? "bg-purple-primary" 
                  : "bg-dark-slate/60 hover:bg-purple-primary/30"
              }`}
              onClick={() => setSelection("away")}
            >
              {matchInfo.teamB} Win<br/>
              <span className="text-xs">{matchInfo.odds.away.toFixed(2)}</span>
            </button>
          </div>
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
          
          <div className="mt-3 text-sm text-right">
            <span className="text-gray-400">Potential winnings: </span>
            <span className="text-[#00FFFF]">${getPotentialWinnings()}</span>
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
            onClick={() => onPlaceBet(Number(betAmount), selection)}
          >
            Place Bet
          </GradientButton>
        </div>
      </motion.div>
    </div>
  );
};

const Sports = () => {
  const [activeCategory, setActiveCategory] = useState<string>(SPORTS_CATEGORIES.FOOTBALL);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { wallet, refetchWallet } = useWallet();
  
  useEffect(() => {
    document.title = "Sports Betting | NOUGHTYPLAY";
  }, []);
  
  const handleMatchSelect = (match: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to place bets.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedMatch(match);
    setIsModalOpen(true);
  };
  
  const handlePlaceBet = async (amount: number, selection: string) => {
    if (!user || !selectedMatch) return;
    
    if (!wallet || Number(wallet.balance) < amount) {
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
        gameType: "sports",
        betAmount: amount
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
      <BetModal 
        matchInfo={selectedMatch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlaceBet={handlePlaceBet}
      />
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-space font-bold text-3xl md:text-5xl mb-4">Live Sports Betting</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Bet on your favorite sports with crypto, enjoy real-time odds updates and live streaming of matches.
          </p>
        </motion.div>
        
        {/* Sports Categories Nav */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.values(SPORTS_CATEGORIES).map((category) => (
            <motion.button
              key={category}
              className={`px-5 py-2 rounded-full ${
                activeCategory === category
                  ? "gradient-button"
                  : "border border-purple-secondary hover:bg-purple-secondary/10"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="glass rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Featured Match */}
              {LIVE_SPORTS_EVENTS.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => handleMatchSelect({
                    league: event.league,
                    teamA: event.teamA,
                    teamB: event.teamB,
                    odds: event.odds
                  })}
                >
                  <SportsCard
                    league={event.league}
                    teamA={{ name: event.teamA, score: event.scoreA }}
                    teamB={{ name: event.teamB, score: event.scoreB }}
                    time={event.time}
                    odds={event.odds}
                    isLive={true}
                    viewers={event.liveViewers}
                    image={event.image}
                  />
                </div>
              ))}
              
              {/* Upcoming Matches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UPCOMING_SPORTS_EVENTS.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => handleMatchSelect({
                      league: event.league,
                      teamA: event.teamA,
                      teamB: event.teamB,
                      odds: event.odds
                    })}
                  >
                    <SportsCard
                      league={event.league}
                      teamA={event.teamA}
                      teamB={event.teamB}
                      time={event.time}
                      odds={event.odds}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Popular Leagues */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-space font-bold text-xl mb-4">Popular Leagues</h3>
              <div className="space-y-4">
                {POPULAR_LEAGUES.map((league) => (
                  <motion.a 
                    key={league.id}
                    href={`#${league.name.toLowerCase()}`} 
                    className="flex items-center p-3 hover:bg-purple-secondary/10 transition-colors rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <i className={`fas fa-${league.icon} mr-3 text-lg text-purple-secondary`}></i>
                    <span>{league.name}</span>
                    <span className="ml-auto bg-dark-slate px-2 py-1 rounded text-xs">{league.count}</span>
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-lg mb-4">Live Now</h4>
                <img 
                  src="https://pixabay.com/get/g18a81e5230a929516490b28ad4462c25995d18e4c4b99d5d076778d185173c4af0fadfec3d76731f735a42dfad90e7860483f8ab9c8808423afa83bb2438d0cd_1280.jpg" 
                  alt="Live sports betting" 
                  className="w-full rounded-lg mb-4" 
                />
                <GradientButton className="w-full" variant="outline">
                  View 37 Live Events
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Features */}
        <div className="mt-16">
          <motion.h2 
            className="text-center font-space font-bold text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Why Bet with NOUGHTYPLAY
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-purple-secondary text-3xl mb-4">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="font-space text-lg font-bold mb-2">Instant Payouts</h3>
              <p className="text-gray-300 text-sm">
                Receive your winnings instantly in your crypto wallet.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-purple-secondary text-3xl mb-4">
                <i className="fas fa-percentage"></i>
              </div>
              <h3 className="font-space text-lg font-bold mb-2">Best Odds</h3>
              <p className="text-gray-300 text-sm">
                We offer the most competitive odds in the market.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-purple-secondary text-3xl mb-4">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="font-space text-lg font-bold mb-2">Live Streaming</h3>
              <p className="text-gray-300 text-sm">
                Watch live matches while placing your bets.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-purple-secondary text-3xl mb-4">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="font-space text-lg font-bold mb-2">Mobile Betting</h3>
              <p className="text-gray-300 text-sm">
                Place bets on-the-go with our mobile-optimized platform.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
