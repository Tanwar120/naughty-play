import { Link } from "wouter";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";

interface GameCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
}

export const GameCard = ({ id, title, description, image, type }: GameCardProps) => {
  return (
    <motion.div 
      className="game-card glass rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(195, 0, 255, 0.5)"
      }}
    >
      <div className="overflow-hidden">
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-space font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <Link href={`/casino/${type.toLowerCase()}`}>
          <a className="block text-center">
            <GradientButton className="w-full">Play Now</GradientButton>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};
