import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.getElementById("mobile-menu")?.classList.toggle("hidden");
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`glass fixed w-full z-50 px-6 py-3 ${isScrolled ? "backdrop-blur-md" : ""}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 font-space">
          <Link href="/">
            <a className={`nav-item ${isActive("/") ? "active" : ""} hover:text-purple-secondary transition-colors`}>
              Home
            </a>
          </Link>
          <Link href="/casino">
            <a className={`nav-item ${isActive("/casino") ? "active" : ""} hover:text-purple-secondary transition-colors`}>
              Casino
            </a>
          </Link>
          <Link href="/sports">
            <a className={`nav-item ${isActive("/sports") ? "active" : ""} hover:text-purple-secondary transition-colors`}>
              Sports
            </a>
          </Link>
          <Link href="/exchange">
            <a className={`nav-item ${isActive("/exchange") ? "active" : ""} hover:text-purple-secondary transition-colors`}>
              Exchange
            </a>
          </Link>
          <Link href="/whitepaper">
            <a className={`nav-item ${isActive("/whitepaper") ? "active" : ""} hover:text-purple-secondary transition-colors`}>
              Whitepaper
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/login">
                <a className="hidden md:block">
                  <GradientButton variant="outline">Login</GradientButton>
                </a>
              </Link>
              <Link href="/register">
                <a className="hidden md:block">
                  <GradientButton>Register</GradientButton>
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/account">
                <a className="hidden md:flex items-center space-x-2">
                  <span className="text-purple-secondary">
                    <i className="fas fa-user-circle text-xl"></i>
                  </span>
                  <span>{user.username}</span>
                </a>
              </Link>
              <button 
                onClick={logout}
                className="hidden md:block text-gray-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          )}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl"
            aria-label="Open menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
