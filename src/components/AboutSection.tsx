
import React from "react";

const AboutSection = () => (
  <section className="max-w-4xl mx-auto my-10 px-4 py-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <img
        src="/public/photos/photo-1721322800607-8c38375eef04.png"
        alt="Our Story"
        className="w-full md:w-48 h-40 object-cover rounded-xl mb-4 md:mb-0"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">About TravelEase</h2>
        <p className="text-muted-foreground text-base">
          TravelEase is dedicated to making travel planning effortless, enjoyable, and personalized. Our team is passionate about bringing you the best trips, unique destinations, and seamless booking—all in one beautiful, simple platform.
        </p>
      </div>
    </div>
  </section>
);
export default AboutSection;
