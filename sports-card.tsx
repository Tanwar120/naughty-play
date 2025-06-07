import { motion } from "framer-motion";

interface TeamProps {
  name: string;
  score?: number;
  logo?: string;
}

interface SportsCardProps {
  league: string;
  teamA: TeamProps | string;
  teamB: TeamProps | string;
  time: string;
  odds?: {
    home: number;
    draw?: number;
    away: number;
  };
  isLive?: boolean;
  viewers?: number;
  image?: string;
}

export const SportsCard = ({ 
  league, 
  teamA, 
  teamB, 
  time, 
  odds, 
  isLive = false,
  viewers,
  image
}: SportsCardProps) => {
  // Handle both string and object formats for teams
  const getTeamA = (): TeamProps => {
    return typeof teamA === 'string' 
      ? { name: teamA } 
      : teamA;
  };
  
  const getTeamB = (): TeamProps => {
    return typeof teamB === 'string'
      ? { name: teamB }
      : teamB;
  };

  if (image) {
    // Featured match with image
    return (
      <div className="glass p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center mb-4">
          {isLive && (
            <span className="bg-purple-secondary/30 text-[#00FFFF] text-sm py-1 px-3 rounded-full">
              LIVE NOW
            </span>
          )}
          {viewers && (
            <span className="text-gray-300">
              <i className="fas fa-users"></i> {(viewers / 1000).toFixed(1)}K Watching
            </span>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <span className="text-2xl font-bold">{getTeamA().name}</span>
            <div className="w-12 h-12 my-2 bg-dark-slate rounded-full flex items-center justify-center">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            {getTeamA().score !== undefined && (
              <span className="text-3xl font-bold">{getTeamA().score}</span>
            )}
          </div>
          
          <div className="text-center">
            <div className="text-purple-secondary text-sm mb-2">{league}</div>
            <div className="text-[#00FFFF] text-xl mb-2">{time}</div>
            {odds && (
              <div className="flex space-x-4 justify-center">
                <motion.button 
                  className="border border-purple-secondary hover:bg-purple-secondary/20 px-4 py-1 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home {odds.home.toFixed(2)}
                </motion.button>
                {odds.draw && (
                  <motion.button 
                    className="border border-purple-secondary hover:bg-purple-secondary/20 px-4 py-1 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Draw {odds.draw.toFixed(2)}
                  </motion.button>
                )}
                <motion.button 
                  className="border border-purple-secondary hover:bg-purple-secondary/20 px-4 py-1 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Away {odds.away.toFixed(2)}
                </motion.button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <span className="text-2xl font-bold">{getTeamB().name}</span>
            <div className="w-12 h-12 my-2 bg-dark-slate rounded-full flex items-center justify-center">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            {getTeamB().score !== undefined && (
              <span className="text-3xl font-bold">{getTeamB().score}</span>
            )}
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden relative">
          <img src={image} alt={`${getTeamA().name} vs ${getTeamB().name}`} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-between items-center">
                <span>
                  <i className="fas fa-circle text-red-500 animate-pulse mr-2"></i> Live Stream
                </span>
                <motion.button 
                  className="bg-[#00FFFF]/80 hover:bg-[#00FFFF] text-dark px-4 py-1 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Live
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Simplified card for upcoming matches
  return (
    <motion.div 
      className="sports-card glass p-4 rounded-xl"
      whileHover={{ 
        y: -3,
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)"
      }}
    >
      <div className="text-sm text-gray-300 mb-2">{league} • {time}</div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-dark-slate rounded-full flex items-center justify-center mr-2">
            <i className="fas fa-shield-alt text-sm"></i>
          </div>
          <span>{getTeamA().name}</span>
        </div>
        {odds && (
          <div className="flex space-x-2">
            <motion.button 
              className="border border-purple-secondary hover:bg-purple-secondary/20 px-3 py-1 rounded-lg text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {odds.home.toFixed(2)}
            </motion.button>
            <motion.button 
              className="border border-purple-secondary hover:bg-purple-secondary/20 px-3 py-1 rounded-lg text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {odds.away.toFixed(2)}
            </motion.button>
          </div>
        )}
        <div className="flex items-center">
          <span>{getTeamB().name}</span>
          <div className="w-8 h-8 bg-dark-slate rounded-full flex items-center justify-center ml-2">
            <i className="fas fa-shield-alt text-sm"></i>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
