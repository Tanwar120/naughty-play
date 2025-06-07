import { useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";

export const JoinCommunitySection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our updates.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Join Our Community</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Be part of the NOUGHTYPLAY community and stay updated on the latest features, events, and promotions.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a 
              key={social.name}
              href={social.url} 
              className="glass p-4 rounded-xl flex items-center space-x-3 hover:bg-dark-purple transition-colors"
              whileHover={{ y: -5, backgroundColor: "rgba(30, 16, 51, 0.8)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + (index * 0.1) 
              }}
            >
              <i className={`fab fa-${social.icon} text-3xl ${
                social.icon === 'telegram' ? 'text-blue-400' : 
                social.icon === 'discord' ? 'text-indigo-400' : 
                social.icon === 'twitter' ? 'text-blue-400' : 
                'text-orange-500'
              }`}></i>
              <span>{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto glass p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-space font-bold text-2xl mb-4">Subscribe to Updates</h3>
          <p className="text-gray-300 mb-6">
            Get notified about new features, promotions, and special events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-dark px-4 py-3 rounded-lg border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
            />
            <GradientButton type="submit">
              Subscribe Now
            </GradientButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
