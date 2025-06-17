
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    review: "The Rajasthan Royal Heritage tour was absolutely magnificent! The palace hotels, desert safari, and cultural experiences exceeded all expectations. Our family had an incredible time exploring the rich history.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    trip: "Rajasthan Royal Heritage - 9 Days"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review: "Kerala backwaters were a dream come true! The houseboat experience was so peaceful and the Ayurveda spa treatments were rejuvenating. Perfect for a romantic getaway with my husband.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    trip: "Kerala Backwaters - 6 Days"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Ahmedabad, India",
    rating: 5,
    review: "The Golden Triangle tour was perfectly organized! Seeing the Taj Mahal at sunrise was breathtaking. The guide was knowledgeable and the heritage sites were well-maintained. Highly recommended!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    trip: "Golden Triangle Tour - 8 Days"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad, India",
    rating: 5,
    review: "Goa was the perfect blend of relaxation and adventure! Beautiful beaches, amazing seafood, and vibrant nightlife. The Portuguese heritage sites added a cultural touch to our beach vacation.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
    trip: "Goa Beach Paradise - 5 Days"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Jaipur, India",
    rating: 5,
    review: "Himachal hill stations were absolutely stunning! The mountain views, adventure activities, and cool weather provided the perfect escape from city life. The apple orchards were a delightful surprise.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    trip: "Himachal Hill Stations - 7 Days"
  },
  {
    id: 6,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    review: "The Maldives package was absolutely incredible! The water villa was a dream come true and the service was impeccable. TravelEase made our honeymoon unforgettable.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    trip: "Maldives Paradise - 7 Days"
  }
];

const HolidayTestimonials = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Traveler Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real experiences from our happy travelers around the world
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="text-cyan-400">
                    <Quote className="h-8 w-8" />
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 leading-relaxed text-lg">
                    "{testimonial.review}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                      <p className="text-xs text-cyan-300 mt-1">{testimonial.trip}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
              15K+
            </div>
            <div className="text-gray-400">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
              75+
            </div>
            <div className="text-gray-400">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent mb-2">
              4.8
            </div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent mb-2">
              150+
            </div>
            <div className="text-gray-400">Holiday Packages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayTestimonials;
