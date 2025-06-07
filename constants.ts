// Game types
export const GAME_TYPES = {
  SLOTS: "slots",
  POKER: "poker",
  ROULETTE: "roulette",
  BLACKJACK: "blackjack",
};

// Sports categories
export const SPORTS_CATEGORIES = {
  FOOTBALL: "football",
  BASKETBALL: "basketball",
  TENNIS: "tennis",
  HOCKEY: "hockey",
  ESPORTS: "esports",
};

// Transaction types
export const TRANSACTION_TYPES = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
  BET: "bet",
  WIN: "win",
};

// Crypto coins
export const CRYPTO_COINS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "bitcoin",
    color: "text-amber-400",
    price: 59342.80,
    change: 5.32,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "ethereum",
    color: "text-blue-400",
    price: 2082.45,
    change: 3.12,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    icon: "dollar-sign",
    color: "text-green-400",
    price: 1.00,
    change: 0.00,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    icon: "coins",
    color: "text-yellow-500",
    price: 302.15,
    change: -1.25,
  },
];

// Wallet providers
export const WALLET_PROVIDERS = [
  {
    name: "NOUGHTYPLAY Wallet",
    description: "Create a new secure wallet",
    icon: "wallet",
    color: "bg-amber-500",
  },
  {
    name: "MetaMask",
    description: "Connect your MetaMask wallet",
    icon: "firefox-browser",
    color: "bg-orange-400",
  },
  {
    name: "TrustWallet",
    description: "Connect your TrustWallet",
    icon: "shield-alt",
    color: "bg-blue-500",
  },
  {
    name: "WalletConnect",
    description: "Connect via WalletConnect",
    icon: "cube",
    color: "bg-blue-400",
  },
];

// Whitepaper sections
export const WHITEPAPER_SECTIONS = [
  {
    title: "Tokenomics",
    icon: "coins",
    description: "Detailed explanation of our utility token, distribution mechanism, and economic model.",
  },
  {
    title: "Security Architecture",
    icon: "shield-alt",
    description: "Multi-layered security protocols, wallet security, and transaction encryption.",
  },
  {
    title: "KYC/AML Compliance",
    icon: "file-contract",
    description: "Our comprehensive approach to regulatory compliance and user verification.",
  },
  {
    title: "Roadmap",
    icon: "road",
    description: "Future development plans, feature releases, and expansion strategies.",
  },
];

// Casino game details
export const CASINO_GAMES = [
  {
    id: 1,
    title: "Crypto Slots",
    description: "Over 500 slot games with massive jackpots and crypto prizes.",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    type: GAME_TYPES.SLOTS,
  },
  {
    id: 2,
    title: "Crypto Poker",
    description: "Live and tournament poker with players from around the world.",
    image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    type: GAME_TYPES.POKER,
  },
  {
    id: 3,
    title: "Crypto Roulette",
    description: "American, European, and Multi-wheel roulette variations.",
    image: "https://pixabay.com/get/g0c9e6d432652f1ad65b218e72ef59d124839c84f45d0e59bc5ac720651f76a29aa61f832f0776e7702fff51228834241e4522552d15fc50289e986b8eb71b838_1280.jpg",
    type: GAME_TYPES.ROULETTE,
  },
  {
    id: 4,
    title: "Crypto Blackjack",
    description: "Multiple blackjack variants with VIP tables and live dealers.",
    image: "https://pixabay.com/get/g2293ac73f2ce86aeec58208baed1283325cfc02e929d532ff9a545d78428a43fc5c3c9fbe4bc289bfa0fa8f43e79af49c57eba4ab2d5e02c7f40b19b99e046be_1280.jpg",
    type: GAME_TYPES.BLACKJACK,
  },
];

// Live sports events
export const LIVE_SPORTS_EVENTS = [
  {
    id: 1,
    league: "Premier League",
    teamA: "Arsenal",
    teamB: "Chelsea",
    scoreA: 2,
    scoreB: 1,
    time: "65:22",
    odds: {
      home: 2.50,
      draw: 3.25,
      away: 2.80,
    },
    liveViewers: 8500,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
  },
];

// Upcoming sports events
export const UPCOMING_SPORTS_EVENTS = [
  {
    id: 1,
    league: "NBA",
    teamA: "Lakers",
    teamB: "Nets",
    time: "Tomorrow 21:30",
    odds: {
      home: 1.95,
      away: 1.85,
    },
  },
  {
    id: 2,
    league: "UFC",
    teamA: "McGregor",
    teamB: "Poirier",
    time: "Saturday 23:00",
    odds: {
      home: 2.10,
      away: 1.75,
    },
  },
];

// Popular leagues
export const POPULAR_LEAGUES = [
  {
    id: 1,
    name: "Football",
    icon: "futbol",
    count: 248,
  },
  {
    id: 2,
    name: "Basketball",
    icon: "basketball-ball",
    count: 142,
  },
  {
    id: 3,
    name: "Tennis",
    icon: "tennis-ball",
    count: 89,
  },
  {
    id: 4,
    name: "Ice Hockey",
    icon: "hockey-puck",
    count: 65,
  },
  {
    id: 5,
    name: "Esports",
    icon: "gamepad",
    count: 112,
  },
];

// Social media links
export const SOCIAL_LINKS = [
  {
    name: "Twitter",
    url: "#twitter",
    icon: "twitter",
  },
  {
    name: "Telegram",
    url: "#telegram",
    icon: "telegram",
  },
  {
    name: "Discord",
    url: "#discord",
    icon: "discord",
  },
  {
    name: "Reddit",
    url: "#reddit",
    icon: "reddit-alien",
  },
];

// Platform links for footer
export const PLATFORM_LINKS = [
  { name: "Casino Games", url: "/casino" },
  { name: "Sports Betting", url: "/sports" },
  { name: "Crypto Exchange", url: "/exchange" },
  { name: "Whitepaper", url: "/whitepaper" },
  { name: "Roadmap", url: "#roadmap" },
];

// Support links for footer
export const SUPPORT_LINKS = [
  { name: "FAQ", url: "#faq" },
  { name: "Help Center", url: "#help" },
  { name: "Contact Us", url: "#contact" },
  { name: "Terms of Service", url: "#terms" },
  { name: "Privacy Policy", url: "#privacy" },
];

// Legal links for footer
export const LEGAL_LINKS = [
  { name: "Licensing", url: "#license" },
  { name: "KYC/AML Policy", url: "#kyc" },
  { name: "Responsible Gaming", url: "#responsible" },
  { name: "Smart Contract Audits", url: "#audit" },
  { name: "Compliance", url: "#compliance" },
];
