import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  name: string;
  symbol: string;
  icon: string;
  color: string;
  amount?: number;
  value?: number;
  onClick?: () => void;
}

export const CryptoCard = ({ 
  name, 
  symbol, 
  icon, 
  color, 
  amount, 
  value,
  onClick 
}: CryptoCardProps) => {
  return (
    <motion.div 
      className="flex justify-between items-center p-3 bg-dark-slate/60 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(65, 60, 80, 0.6)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={cn("token-glow mr-3 text-2xl", color)}>
          <i className={`${icon.startsWith('fa') ? icon : `fab fa-${icon}`}`}></i>
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-gray-400 text-sm">{symbol}</div>
        </div>
      </div>
      {amount !== undefined && value !== undefined && (
        <div className="text-right">
          <div className="font-medium">{amount} {symbol}</div>
          <div className="text-gray-400 text-sm">≈ ${value.toLocaleString()}</div>
        </div>
      )}
    </motion.div>
  );
};
