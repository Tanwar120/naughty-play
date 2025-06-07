import { useEffect } from "react";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { WHITEPAPER_SECTIONS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const WhitepaperItem = ({ title, icon, description }: { title: string, icon: string, description: string }) => {
  return (
    <motion.div 
      className="glass p-6 rounded-xl mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <h3 className="font-medium text-xl mb-3 flex items-center">
        <i className={`fas fa-${icon} text-purple-secondary mr-3`}></i>
        {title}
      </h3>
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      <div className="bg-dark-slate/40 p-4 rounded-lg">
        <h4 className="text-[#00FFFF] font-medium mb-2">Key Highlights:</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {title === "Tokenomics" && (
            <>
              <li>Total Supply: 1,000,000,000 NPTY tokens</li>
              <li>Initial Distribution: 40% public sale, 30% development, 20% team, 10% marketing</li>
              <li>Utility: Platform fees, staking rewards, governance</li>
              <li>Deflationary mechanism through token burning</li>
            </>
          )}
          {title === "Security Architecture" && (
            <>
              <li>Multi-signature wallets for all platform assets</li>
              <li>Encryption at rest and in transit for all user data</li>
              <li>Regular security audits by leading blockchain security firms</li>
              <li>Bug bounty program to identify potential vulnerabilities</li>
            </>
          )}
          {title === "KYC/AML Compliance" && (
            <>
              <li>User verification through multi-tier KYC process</li>
              <li>Compliance with international AML regulations</li>
              <li>Real-time transaction monitoring for suspicious activities</li>
              <li>Partnerships with regulatory compliance experts</li>
            </>
          )}
          {title === "Roadmap" && (
            <>
              <li>Q3 2023: Platform launch with core features</li>
              <li>Q4 2023: Mobile app release and expansion to 10 new markets</li>
              <li>Q1 2024: Integration with additional blockchains and tokens</li>
              <li>Q2 2024: Launch of NFT marketplace and metaverse gaming</li>
            </>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

const Whitepaper = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Whitepaper | NOUGHTYPLAY";
  }, []);
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your whitepaper is being downloaded.",
    });
    
    // In a real implementation, this would trigger an actual download
    // For demo purposes, we just show a toast
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "The whitepaper has been downloaded successfully.",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-space font-bold text-3xl md:text-5xl mb-4">Platform Whitepaper</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Dive deep into our comprehensive whitepaper to understand the technology, tokenomics, and security measures behind NOUGHTYPLAY.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="glass p-6 rounded-xl">
                <h2 className="font-space font-bold text-2xl mb-4">Executive Summary</h2>
                <p className="text-gray-300 mb-4">
                  NOUGHTYPLAY is a revolutionary crypto-powered gaming and betting platform designed to bring transparency, security, and innovative features to the online entertainment industry. By leveraging blockchain technology, we aim to provide a seamless and fair gaming experience for users worldwide.
                </p>
                <p className="text-gray-300">
                  Our platform combines high-stakes casino gaming, sports betting, and crypto trading under one secure ecosystem, allowing users to engage with their favorite entertainment options while benefiting from the advantages of cryptocurrency transactions.
                </p>
              </div>
              
              {WHITEPAPER_SECTIONS.map((section, index) => (
                <WhitepaperItem
                  key={index}
                  title={section.title}
                  icon={section.icon}
                  description={section.description}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass p-6 rounded-xl sticky top-24">
              <div className="text-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500" 
                  alt="Whitepaper Document" 
                  className="rounded-xl neon-border shadow-xl inline-block mb-4" 
                />
                <h3 className="font-space font-bold text-xl">NOUGHTYPLAY Whitepaper</h3>
                <p className="text-gray-300 text-sm mb-4">Version 1.5 • Last Updated: July 2023</p>
              </div>
              
              <div className="space-y-4">
                <GradientButton className="w-full" onClick={handleDownload}>
                  Download PDF <i className="fas fa-download ml-2"></i>
                </GradientButton>
                
                <button className="w-full border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium">
                  Share Whitepaper <i className="fas fa-share-alt ml-2"></i>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-purple-secondary/20">
                <h4 className="font-medium mb-3">Key Platform Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Daily Active Users:</span>
                    <span className="font-medium text-[#00FFFF]">47,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Transactions:</span>
                    <span className="font-medium text-[#00FFFF]">9.2M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Supported Currencies:</span>
                    <span className="font-medium text-[#00FFFF]">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Transaction Volume:</span>
                    <span className="font-medium text-[#00FFFF]">$2.8M+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
