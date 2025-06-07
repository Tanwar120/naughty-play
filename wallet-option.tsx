import { motion } from "framer-motion";

interface WalletOptionProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}

export const WalletOption = ({ 
  name, 
  description, 
  icon, 
  color,
  onClick
}: WalletOptionProps) => {
  return (
    <motion.button 
      className="w-full bg-dark-slate hover:bg-dark-slate/80 transition-colors p-4 rounded-xl flex items-center"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(65, 60, 80, 0.8)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center mr-4`}>
        <i className={`fas fa-${icon} text-white`}></i>
      </div>
      <div className="text-left">
        <div className="font-medium">{name}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
      <i className="fas fa-arrow-right ml-auto"></i>
    </motion.button>
  );
};
