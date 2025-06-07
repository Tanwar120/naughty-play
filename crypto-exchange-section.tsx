import { useState } from "react";
import { motion } from "framer-motion";
import { CryptoCard } from "@/components/ui/crypto-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { CRYPTO_COINS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export const CryptoExchangeSection = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [buyAmount, setBuyAmount] = useState<string>("0.05");
  const [buyPrice, setBuyPrice] = useState<string>("59,342.80");
  const [sellAmount, setSellAmount] = useState<string>("0.05");
  const [sellPrice, setSellPrice] = useState<string>("59,342.80");

  const calculateTotal = (amount: string, price: string): string => {
    const cleanedPrice = price.replace(/,/g, '');
    const numAmount = parseFloat(amount) || 0;
    const numPrice = parseFloat(cleanedPrice) || 0;
    return (numAmount * numPrice).toFixed(2);
  };

  const buyTotal = calculateTotal(buyAmount, buyPrice);
  const sellTotal = calculateTotal(sellAmount, sellPrice);

  return (
    <section id="crypto" className="py-16 bg-dark-purple/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Crypto Exchange</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Trade cryptocurrencies seamlessly with real-time market updates, low fees, and instant transactions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crypto Wallet Card */}
          <motion.div 
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-space font-medium text-xl mb-4">Your Wallet</h3>
            <img 
              src="https://pixabay.com/get/gc31f3a2bbb1999b7fea4640c3f438f4b0497cafc30203a52f9349e933c87d872e795df24b7bd0a80593f276f0ab5fd8a4d3e1bc11f0e0bddf2c25cb1a4b6b862_1280.jpg" 
              alt="Crypto wallet interface" 
              className="w-full rounded-lg mb-6" 
            />
            
            <div className="space-y-4">
              <CryptoCard
                name="Bitcoin"
                symbol="BTC"
                icon="bitcoin"
                color="text-amber-400"
                amount={0.325}
                value={19245.00}
              />
              
              <CryptoCard
                name="Ethereum"
                symbol="ETH"
                icon="ethereum"
                color="text-blue-400"
                amount={4.78}
                value={9892.00}
              />
              
              <CryptoCard
                name="USD Coin"
                symbol="USDC"
                icon="fa-dollar-sign"
                color="text-green-400"
                amount={1250}
                value={1250.00}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.button 
                className="text-center bg-purple-primary hover:bg-purple-secondary transition-colors py-2 rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className="fas fa-arrow-down mr-1"></i> Deposit
              </motion.button>
              <motion.button 
                className="text-center border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className="fas fa-arrow-up mr-1"></i> Withdraw
              </motion.button>
            </div>
          </motion.div>
          
          {/* Trading Chart */}
          <motion.div 
            className="glass rounded-xl p-6 lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="token-glow text-amber-400 mr-2 text-2xl">
                  <i className="fab fa-bitcoin"></i>
                </div>
                <h3 className="font-space font-medium text-xl">BTC/USDT</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#00FFFF]">$59,342.80</div>
                <div className="text-green-400 text-sm">+5.32% <i className="fas fa-arrow-up"></i></div>
              </div>
            </div>
            
            <div className="h-64 md:h-80 bg-dark-slate/60 rounded-lg mb-6 relative overflow-hidden">
              <img 
                src="https://pixabay.com/get/g51178db6d91e071b4418928f2476b2ebd5fdd64de7e203da9fc988cd89850313f3d95491e49cadc494d65feb78ad2d0d72fcbb263cfa4ca2be5376a827cdda95_1280.jpg" 
                alt="Trading chart" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-0 right-0 m-3">
                <div className="flex space-x-2">
                  {["1H", "1D", "1W", "1M"].map((timeframe) => (
                    <button 
                      key={timeframe}
                      className={`${
                        activeTimeframe === timeframe 
                          ? "bg-purple-primary" 
                          : "bg-dark-slate"
                      } px-3 py-1 rounded text-sm`}
                      onClick={() => setActiveTimeframe(timeframe)}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trading Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-slate/60 rounded-lg p-4">
                <h4 className="font-medium text-center mb-3">Buy BTC</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Amount</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={buyAmount} 
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">BTC</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Price</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={buyPrice} 
                        onChange={(e) => setBuyPrice(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Total</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formatNumber(parseFloat(buyTotal))} 
                        readOnly
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <GradientButton className="w-full">
                    Buy BTC
                  </GradientButton>
                </div>
              </div>
              
              <div className="bg-dark-slate/60 rounded-lg p-4">
                <h4 className="font-medium text-center mb-3">Sell BTC</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Amount</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={sellAmount} 
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">BTC</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Price</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={sellPrice} 
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Total</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formatNumber(parseFloat(sellTotal))} 
                        readOnly
                        className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none" 
                      />
                      <span className="absolute right-3 top-2 text-gray-400">USDT</span>
                    </div>
                  </div>
                  <button className="w-full border border-purple-secondary hover:bg-purple-secondary/20 transition-colors py-2 rounded-lg font-medium">
                    Sell BTC
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Market Trends */}
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-space font-bold text-xl mb-6">Market Trends</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-dark-slate/60">
                  <th className="text-left p-4 rounded-tl-lg">#</th>
                  <th className="text-left p-4">Coin</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">24h Change</th>
                  <th className="text-left p-4">24h Volume</th>
                  <th className="text-left p-4 rounded-tr-lg">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {CRYPTO_COINS.map((coin, index) => (
                  <tr key={coin.symbol} className={index < CRYPTO_COINS.length - 1 ? "border-b border-dark-slate/30" : ""}>
                    <td className={`p-4 ${index === CRYPTO_COINS.length - 1 ? "rounded-bl-lg" : ""}`}>{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <i className={`${coin.icon.includes('-') ? 'fas' : 'fab'} fa-${coin.icon} ${coin.color} mr-2`}></i>
                        <span>{coin.name}</span>
                        <span className="text-gray-400 ml-2">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="p-4">${coin.price.toLocaleString()}</td>
                    <td className={`p-4 ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {coin.change >= 0 ? "+" : ""}{coin.change}%
                    </td>
                    <td className="p-4">${(Math.random() * 50).toFixed(1)}B</td>
                    <td className={`p-4 ${index === CRYPTO_COINS.length - 1 ? "rounded-br-lg" : ""}`}>
                      ${(Math.random() * 1200).toFixed(1)}B
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
