
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Banknote, Globe, Badge, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments and personal data are protected with bank-level security"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you anytime, anywhere"
  },
  {
    icon: Banknote,
    title: "Easy Payment",
    description: "Multiple payment options with easy EMI and instant refunds"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Book flights and hotels in over 190+ countries worldwide"
  },
  {
    icon: Badge,
    title: "Best Prices",
    description: "Guaranteed best prices with exclusive deals and offers"
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    description: "Get personalized travel recommendations from our experts"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose TravelEase?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Experience hassle-free travel planning with our trusted platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
