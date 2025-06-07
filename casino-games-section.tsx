import { motion } from "framer-motion";
import { GameCard } from "@/components/ui/game-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { CASINO_GAMES } from "@/lib/constants";

export const CasinoGamesSection = () => {
  return (
    <section id="casino" className="py-16 bg-dark-purple/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Premium Casino Games</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Experience the thrill of our high-stakes crypto casino games with stunning graphics and provably fair outcomes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASINO_GAMES.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              type={game.type}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <GradientButton size="lg">
            View All Games <i className="fas fa-chevron-right ml-2"></i>
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
};
