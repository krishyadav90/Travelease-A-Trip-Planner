
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PopularDestinations from "@/components/PopularDestinations";
import ReviewsSection from "@/components/ReviewsSection";
// SearchBar is no longer used here.
import ChatBot from "@/components/ChatBot";
import FooterSection from "@/components/FooterSection";

interface SearchFilters {
  category?: string;
  season?: string;
  budget?: string;
  tripType?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({});

  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    console.log("Search query:", query, "Filters:", filters);
  };

  return (
    <div className="relative min-h-screen w-full animated-gradient-bg pt-0">
      {/* Hero Section */}
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      {/* Removed the overlapping Search Bar here */}

      {/* Features Section */}
      <section className="w-full pt-14 pb-8 sm:pt-20 sm:pb-12 relative animate-fade-in">
        <div className="max-w-6xl mx-auto px-3 sm:px-8">
          <div className="glassmorphism-card border border-purple-200/10 rounded-2xl shadow-2xl mb-14 bg-white/5 backdrop-blur-lg">
            {/* Removed 'Discover now' button */}
            <FeaturesSection />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="w-full pb-10 sm:pb-20 relative animate-fade-in" id="destinations">
        <div className="max-w-6xl mx-auto px-3 sm:px-8">
          <div className="glassmorphism-card border border-cyan-100/10 rounded-2xl shadow-2xl mb-14 bg-white/5 backdrop-blur-lg">
            {/* Removed 'Top Rated Places' button */}
            <PopularDestinations />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full pb-16 sm:pb-24 relative animate-fade-in" id="reviews">
        <div className="max-w-5xl mx-auto px-3 sm:px-8">
          <div
            className="p-6 rounded-2xl shadow-xl mb-10 bg-violet-50"
            style={
              {
                '--card': 'hsl(0 0% 100%)',
                '--card-foreground': 'hsl(222.2 47.4% 11.2%)',
                '--popover': 'hsl(0 0% 100%)',
                '--popover-foreground': 'hsl(222.2 47.4% 11.2%)',
                '--primary': 'hsl(222.2 47.4% 11.2%)',
                '--primary-foreground': 'hsl(210 40% 98%)',
                '--secondary': 'hsl(210 40% 96.1%)',
                '--secondary-foreground': 'hsl(222.2 47.4% 11.2%)',
                '--muted': 'hsl(210 40% 96.1%)',
                '--muted-foreground': 'hsl(215.4 16.3% 46.9%)',
                '--accent': 'hsl(210 40% 96.1%)',
                '--accent-foreground': 'hsl(222.2 47.4% 11.2%)',
                '--destructive': 'hsl(0 84.2% 60.2%)',
                '--destructive-foreground': 'hsl(210 40% 98%)',
                '--border': 'hsl(214.3 31.8% 91.4%)',
                '--input': 'hsl(214.3 31.8% 91.4%)',
                '--ring': 'hsl(222.2 47.4% 11.2%)',
              } as React.CSSProperties
            }
          >
            <ReviewsSection />
          </div>
        </div>
      </section>

      {/* Floating ChatBot */}
      <div className="fixed bottom-6 right-6 z-50 drop-shadow-xl">
        <ChatBot />
      </div>

      {/* --- Footer sections: About, Contact, Newsletter --- */}
      <FooterSection />
    </div>
  );
};

export default Index;
