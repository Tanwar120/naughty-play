import { motion } from "framer-motion";
import { Link } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <motion.div 
      className="glass rounded-xl p-6 hover:bg-dark-purple transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="text-purple-secondary text-4xl mb-4">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="font-space text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export const HeroSection = () => {
  const features = [
    {
      icon: "wallet",
      title: "Crypto Wallet Integration",
      description: "Create a secure wallet or connect your favorite crypto wallets seamlessly.",
    },
    {
      icon: "dice",
      title: "Premium Casino Games",
      description: "Enjoy top-tier casino games including slots, poker, roulette, and blackjack.",
    },
    {
      icon: "chart-line",
      title: "Built-in Exchange",
      description: "Trade cryptocurrencies directly on our platform with real-time market updates.",
    },
  ];

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1 animate-float"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-space font-bold text-4xl md:text-6xl mb-4 leading-tight">
              <span className="text-white">Play. Trade. Win.</span><br/>
              <span className="text-purple-secondary">All in One Place.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              NOUGHTYPLAY is the all-in-one crypto-integrated entertainment platform merging high-stakes casino gaming, sports betting, and crypto trading in one secure ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <a>
                  <GradientButton size="lg">
                    Get Started
                  </GradientButton>
                </a>
              </Link>
              <Link href="/whitepaper">
                <a>
                  <GradientButton variant="outline" size="lg">
                    View Whitepaper
                  </GradientButton>
                </a>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Crypto Gaming Interface" 
              className="rounded-2xl neon-border inline-block shadow-2xl" 
            />
          </motion.div>
        </div>
        
        {/* Features Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
