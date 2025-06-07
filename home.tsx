import { useEffect } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { CasinoGamesSection } from "@/components/sections/casino-games-section";
import { SportsBettingSection } from "@/components/sections/sports-betting-section";
import { CryptoExchangeSection } from "@/components/sections/crypto-exchange-section";
import { WhitepaperSection } from "@/components/sections/whitepaper-section";
import { WalletIntegrationSection } from "@/components/sections/wallet-integration-section";
import { JoinCommunitySection } from "@/components/sections/join-community-section";

const Home = () => {
  useEffect(() => {
    document.title = "NOUGHTYPLAY - Play. Trade. Win – All in One Place.";
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CasinoGamesSection />
      <SportsBettingSection />
      <CryptoExchangeSection />
      <WhitepaperSection />
      <WalletIntegrationSection />
      <JoinCommunitySection />
    </div>
  );
};

export default Home;
