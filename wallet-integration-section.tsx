import { motion } from "framer-motion";
import { WalletOption } from "@/components/ui/wallet-option";
import { WALLET_PROVIDERS } from "@/lib/constants";

export const WalletIntegrationSection = () => {
  return (
    <section className="py-16 bg-dark-purple/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Wallet Integration</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Connect your existing crypto wallets or create a new one to start playing, betting, and trading.
          </p>
        </motion.div>
        
        <motion.div 
          className="glass rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-space font-bold text-2xl mb-6">Choose Your Wallet</h3>
              <p className="text-gray-300 mb-8">
                NOUGHTYPLAY supports multiple wallet options for seamless crypto transactions. Choose your preferred wallet or create a new one directly on our platform.
              </p>
              
              <div className="space-y-4">
                {WALLET_PROVIDERS.map((provider, index) => (
                  <WalletOption
                    key={index}
                    name={provider.name}
                    description={provider.description}
                    icon={provider.icon}
                    color={provider.color}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <img 
                src="https://pixabay.com/get/gf0571471e81a7083cbfd085d5ff45888f035417f48ec8d4d41888399103ec04f7ea27e48e5b4605ba8198eeb386ff4a27ece77cd1278def72d430e9c6879fd66_1280.jpg" 
                alt="Crypto Wallet App" 
                className="rounded-2xl inline-block shadow-xl" 
              />
              <motion.div 
                className="mt-6 p-4 glass inline-block rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-gray-300">
                  <i className="fas fa-lock text-[#00FFFF] mr-2"></i> 
                  Military-grade encryption and secure private key storage
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
