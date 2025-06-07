import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <motion.div 
      className={cn("logo-pulse font-space font-bold text-2xl md:text-3xl flex items-center", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-purple-secondary">NOUGHTY</span>
      <span className="text-[#00FFFF]">PLAY</span>
      <motion.i 
        className="fas fa-dice-d20 ml-2 text-purple-secondary"
        animate={{ rotate: [0, 15, 0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      ></motion.i>
    </motion.div>
  );
};
