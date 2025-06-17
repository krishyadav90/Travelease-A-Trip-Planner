
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plane, User, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Trains", path: "/trains" },
    { name: "Buses", path: "/buses" },
    { name: "Hotels", path: "/hotels" },
    { name: "Holidays", path: "/holidays" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={
        `fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg` +
        " " +
        (
          scrolled
            // On scroll, add a bit more opacity
            ? "bg-gradient-to-r from-cyan-500/70 via-blue-600/60 to-purple-600/70 border-b border-white/10 shadow-2xl shadow-cyan-500/10"
            : "bg-gradient-to-r from-cyan-500/55 via-blue-600/50 to-purple-600/55 border-b border-white/10"
        )
      }
      style={{
        // Enable translucent look over hero-image, but ensure nav content is readable
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)" // for safari
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TravelEase
              </span>
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(item.path)
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAuthModal(true)}
                  className="relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-6 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/10"
            >
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 px-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg">
                    <Plane className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    TravelEase
                  </span>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                        isActive(item.path)
                          ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="pt-6 border-t border-white/10 px-4 space-y-3">
                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg" 
                        onClick={signOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75"></div>
                      <Button 
                        size="sm" 
                        className="relative w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300" 
                        onClick={() => setShowAuthModal(true)}
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </nav>
  );
};

export default Navbar;
