
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Holidays from "./pages/Holidays";
import Attractions from "./pages/Attractions";
import Profile from "./pages/Profile";
import DestinationDetail from "./pages/DestinationDetail";
import HiddenGemsPage from "./pages/HiddenGemsPage";
import NotFound from "./pages/NotFound";
import Trains from "./pages/Trains";
import Buses from "./pages/Buses";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
