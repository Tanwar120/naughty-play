import { motion } from "framer-motion";
import { SportsCard } from "@/components/ui/sports-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  LIVE_SPORTS_EVENTS, 
  UPCOMING_SPORTS_EVENTS, 
  POPULAR_LEAGUES 
} from "@/lib/constants";

export const SportsBettingSection = () => {
  return (
    <section id="sports" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Live Sports Betting</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Bet on your favorite sports with crypto, enjoy real-time odds updates and live streaming of matches.
          </p>
        </motion.div>
        
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
                <SportsCard
                  key={event.id}
                  league={event.league}
                  teamA={{ name: event.teamA, score: event.scoreA }}
                  teamB={{ name: event.teamB, score: event.scoreB }}
                  time={event.time}
                  odds={event.odds}
                  isLive={true}
                  viewers={event.liveViewers}
                  image={event.image}
                />
              ))}
              
              {/* Upcoming Matches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UPCOMING_SPORTS_EVENTS.map((event) => (
                  <SportsCard
                    key={event.id}
                    league={event.league}
                    teamA={event.teamA}
                    teamB={event.teamB}
                    time={event.time}
                    odds={event.odds}
                  />
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
      </div>
    </section>
  );
};
