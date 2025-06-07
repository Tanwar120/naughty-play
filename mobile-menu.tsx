import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";

const MobileMenu = () => {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const closeMenu = () => {
    document.getElementById("mobile-menu")?.classList.add("hidden");
    document.body.style.overflow = "auto";
  };

  // Close the menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <div id="mobile-menu" className="fixed inset-0 bg-black/95 z-50 hidden">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-10">
          <Logo />
          <button 
            id="close-menu" 
            className="text-2xl"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="text-center">
          <ul className="space-y-6 text-xl">
            <li>
              <Link href="/">
                <a className="block py-2 hover:text-purple-secondary transition-colors">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/casino">
                <a className="block py-2 hover:text-purple-secondary transition-colors">Casino</a>
              </Link>
            </li>
            <li>
              <Link href="/sports">
                <a className="block py-2 hover:text-purple-secondary transition-colors">Sports</a>
              </Link>
            </li>
            <li>
              <Link href="/exchange">
                <a className="block py-2 hover:text-purple-secondary transition-colors">Exchange</a>
              </Link>
            </li>
            <li>
              <Link href="/whitepaper">
                <a className="block py-2 hover:text-purple-secondary transition-colors">Whitepaper</a>
              </Link>
            </li>
          </ul>
        </nav>
        
        {!user ? (
          <div className="mt-10 grid grid-cols-2 gap-4">
            <Link href="/login">
              <a className="block text-center py-2 rounded-full border border-purple-secondary hover:bg-purple-secondary/20 transition-colors">
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className="block text-center py-2 rounded-full gradient-button">
                Register
              </a>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4">
            <Link href="/account">
              <a className="flex items-center justify-center space-x-2 py-2">
                <span className="text-purple-secondary">
                  <i className="fas fa-user-circle text-xl"></i>
                </span>
                <span>{user.username}</span>
              </a>
            </Link>
            <button 
              onClick={logout}
              className="block text-center py-2 rounded-full border border-purple-secondary hover:bg-purple-secondary/20 transition-colors w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
