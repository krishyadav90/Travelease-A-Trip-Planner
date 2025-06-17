
import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, Clock, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const footerLinks = [
  { label: "Home", url: "/" },
  { label: "Destinations", url: "/#destinations" },
  { label: "Tours", url: "/holidays" },
  { label: "Hotels", url: "/hotels" },
  { label: "Privacy Policy", content: "privacy" },
  { label: "Terms & Conditions", content: "terms" }
];

const socialIcons = [
  { icon: Facebook, url: "#", label: "Facebook" },
  { icon: Twitter, url: "#", label: "Twitter" },
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Youtube, url: "#", label: "Youtube" }
];

const FooterSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleLinkClick = (link: any) => {
    if (link.content === "privacy") {
      setModalTitle("Privacy Policy");
      setModalContent(`
        At TravelEase, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.

        Information We Collect:
        - Personal information such as name, email, and phone number
        - Travel preferences and booking history
        - Website usage data and cookies

        How We Use Your Information:
        - To provide and improve our travel services
        - To process bookings and communicate with you
        - To send relevant travel offers and updates (with your consent)

        Data Protection:
        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

        Your Rights:
        You have the right to access, update, or delete your personal information at any time by contacting us.

        Contact Us:
        If you have any questions about this Privacy Policy, please contact us at krishyadav3866@gmail.com
      `);
      setShowModal(true);
    } else if (link.content === "terms") {
      setModalTitle("Terms & Conditions");
      setModalContent(`
        Welcome to TravelEase. By using our website and services, you agree to comply with these Terms and Conditions.

        Services:
        TravelEase provides travel booking services, destination information, and related travel assistance. We act as an intermediary between you and travel service providers.

        Bookings and Payments:
        - All bookings are subject to availability and confirmation
        - Prices are subject to change until booking is confirmed
        - Payment terms vary by service provider

        User Responsibilities:
        - Provide accurate information for bookings
        - Comply with travel requirements and regulations
        - Respect our website's terms of use

        Cancellations and Refunds:
        Cancellation and refund policies vary by service provider and are outlined during the booking process.

        Limitation of Liability:
        TravelEase is not liable for any disruptions, cancellations, or changes made by third-party service providers.

        Modifications:
        We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.

        Contact Information:
        For questions about these terms, contact us at krishyadav3866@gmail.com or call +91 9999223366
      `);
      setShowModal(true);
    } else if (link.url) {
      window.location.href = link.url;
    }
  };

  return (
    <>
      <footer className="bg-neutral-800 text-white pt-12 pb-4 px-2 md:px-0 mt-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-6">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex flex-col">
              About TravelEase
              <span className="w-10 h-1 bg-gradient-to-r from-orange-400 to-orange-300 mt-1 rounded-full"></span>
            </h3>
            <p className="text-gray-200 mb-5 text-sm">
              TravelEase is a modern travel agency dedicated to creating unforgettable experiences for travelers. We offer curated trips, unique destinations, and seamless booking.
            </p>
            <div className="flex gap-3 mt-4">
              {socialIcons.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="rounded-full bg-[#232323] p-2 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex flex-col">
              Quick Links
              <span className="w-10 h-1 bg-gradient-to-r from-orange-400 to-orange-300 mt-1 rounded-full"></span>
            </h3>
            <ul className="space-y-2 mt-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => handleLinkClick(link)}
                    className="flex items-center gap-2 text-gray-200 hover:text-orange-400 transition-colors text-sm text-left"
                  >
                    <ChevronRight className="text-orange-400" size={17} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex flex-col">
              Contact Us
              <span className="w-10 h-1 bg-gradient-to-r from-orange-400 to-orange-300 mt-1 rounded-full"></span>
            </h3>
            <ul className="space-y-2 mt-3 text-sm text-gray-200">
              <li className="flex items-center gap-2">
                <Phone className="text-orange-400" size={18} />
                +91 9999223366
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-orange-400" size={18} />
                krishyadav3866@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-orange-400" size={18} />
                Mon-Fri: 9AM - 6PM
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-4">
          <div className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} TravelEase. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Modal for Privacy Policy and Terms */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{modalTitle}</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <div className="whitespace-pre-line text-sm">
                {modalContent}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FooterSection;
