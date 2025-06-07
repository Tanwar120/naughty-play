import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { WHITEPAPER_SECTIONS } from "@/lib/constants";

const WhitepaperItem = ({ title, icon, description }: { title: string, icon: string, description: string }) => {
  return (
    <motion.div 
      className="glass p-4 rounded-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <h3 className="font-medium text-xl mb-2 flex items-center">
        <i className={`fas fa-${icon} text-purple-secondary mr-3`}></i>
        {title}
      </h3>
      <p className="text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

export const WhitepaperSection = () => {
  return (
    <section id="whitepaper" className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-6">Platform Whitepaper</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Dive deep into our comprehensive whitepaper to understand the technology, tokenomics, and security measures behind NOUGHTYPLAY.
            </p>
            <div className="space-y-6">
              {WHITEPAPER_SECTIONS.map((section, index) => (
                <WhitepaperItem
                  key={index}
                  title={section.title}
                  icon={section.icon}
                  description={section.description}
                />
              ))}
            </div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <a href="#download-whitepaper">
                <GradientButton size="lg">
                  Download Whitepaper <i className="fas fa-download ml-2"></i>
                </GradientButton>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Whitepaper Document" 
              className="rounded-2xl neon-border shadow-2xl" 
            />
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-dark-purple p-4 rounded-xl glass animate-float"
              style={{ animationDelay: "0s" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="text-[#00FFFF] text-sm font-medium mb-1">Daily Active Users</div>
              <div className="text-2xl font-bold">47,500+</div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-dark-purple p-4 rounded-xl glass animate-float"
              style={{ animationDelay: "0.5s" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="text-[#00FFFF] text-sm font-medium mb-1">Transaction Volume</div>
              <div className="text-2xl font-bold">$2.8M+</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
