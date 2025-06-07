import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { 
  SOCIAL_LINKS, 
  PLATFORM_LINKS, 
  SUPPORT_LINKS, 
  LEGAL_LINKS 
} from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-dark-purple py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-300 mb-6">
              The future of crypto-powered gaming and betting.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-300">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.url}>
                    <a className="hover:text-purple-secondary transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    className="hover:text-purple-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    className="hover:text-purple-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-purple-secondary/20 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NOUGHTYPLAY. All rights reserved.</p>
          <p className="mt-2">
            Cryptocurrency and gambling involve risk. Please gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
