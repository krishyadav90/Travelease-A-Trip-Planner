import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { supabase } from '@/env/supabase';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const quickQuestions = [
  "What destinations do you offer?",
  "What are your popular packages?",
  "How do I make a booking?",
  "Tell me about your services",
  "Can I customize a package?",
  "What is your cancellation policy?",
  "Do you offer group discounts?",
  "What payment methods do you accept?",
];

const predefinedQA = {
  "What destinations do you offer?": "We offer travel packages to over 20 destinations across India! You can explore beautiful beaches in Goa and the Andaman Islands, majestic mountains in Kashmir and Ladakh, rich heritage sites in Rajasthan and Tamil Nadu, and much more. For a full list, please check out the 'Destinations' section on our website! 🗺️",
  "What are your popular packages?": "Some of our best-selling packages include the Golden Triangle Tour (Delhi, Agra, Jaipur), Kerala Backwaters Bliss, and the Goa Beach Paradise. We have over 22 curated packages for all kinds of travelers! You can find all the details in the 'Holidays' section. ✨",
  "How do I make a booking?": "Booking with us is easy! Simply navigate to the Flights, Hotels, or Holidays section, find what you're looking for, and follow the steps to confirm your booking. If you need any help, I'm here to assist! ✈️🏨",
  "Tell me about your services": "Beyond our amazing holiday packages, we also offer flight bookings, hotel reservations, and train & bus tickets to make your travel seamless. Our website also has cool features like an itinerary builder and a 'Hidden Gems' section for unique spots! Happy exploring! 🚀",
  "Can I customize a package?": "Absolutely! We love creating personalized experiences. While we have many curated packages, you can work with our travel experts to customize an itinerary that perfectly suits your interests and budget. Just reach out to us through the 'Contact Us' page to get started! 🎨",
  "What is your cancellation policy?": "Our cancellation policies vary depending on the package, flight, or hotel booking. Generally, you can find the specific cancellation details on the booking page before you confirm your payment. For more general information, please visit our 'Terms & Conditions' page. 📄",
  "Do you offer group discounts?": "Yes, we do! We offer special rates for group bookings of 10 or more people. It's perfect for family trips, corporate outings, or a vacation with friends. Please get in touch via our 'Contact Us' page with your group size and travel details for a custom quote. 👨‍👩‍👧‍👦",
  "What payment methods do you accept?": "We accept a wide range of payment methods, including all major credit and debit cards (Visa, MasterCard, American Express), net banking, UPI, and popular digital wallets. All transactions are secure and encrypted. 💳",
  "How can I contact customer support?": "Our support team is here to help! You can reach us via email at support@travelcompany.com, call us at +91-123-456-7890, or use the live chat feature on our website during business hours. We're always happy to assist with your travel plans! 📞",
  "Are your packages travel-insured?": "Travel insurance is not automatically included in our packages, but we highly recommend it! We have partnerships with leading insurance providers and can help you add a comprehensive travel insurance plan to your booking for a worry-free trip. 🛡️",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! 👋 I'm Maya, your AI travel assistant. Ask me anything about our destinations, packages, or services!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check Supabase auth state on mount
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email || 'Traveler');
        setMessages(prev => [
          {
            id: '1',
            content: `Hello ${user.user_metadata?.full_name || user.email || 'Traveler'}! 👋 I'm Maya, your AI travel assistant. Ask me anything about our destinations, packages, or services!`,
            isUser: false,
            timestamp: new Date()
          }
        ]);
      }
    };
    getUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUserName(session.user.user_metadata?.full_name || session.user.email || 'Traveler');
      } else if (event === 'SIGNED_OUT') {
        setUserName(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (message: string) => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'maya:latest',
        stream: false,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chat API error response:', errorText);
      throw new Error(`Chat API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content:
        data.message?.content?.trim() ||
        "Sorry, I couldn't generate a response. Please try again!",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error calling Chat API:', error);

    const predefinedAnswer = predefinedQA[message as keyof typeof predefinedQA];

    const fallbackMessage: Message = {
      id: (Date.now() + 1).toString(),
      content:
        predefinedAnswer ||
        `Oops, I couldn't connect to the AI server. ${
          error instanceof Error ? error.message : 'Please try again or check our website for more info!'
        }`,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, fallbackMessage]);
  } finally {
    setIsLoading(false);
  }
};


  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    getAIResponse(question);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;

    const currentMessage = inputMessage;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    getAIResponse(currentMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full gradient-button shadow-lg z-50 flex items-center justify-center"
        size="icon"
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[34rem] flex flex-col shadow-2xl z-50 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6" />
          <CardTitle className="text-lg font-semibold">Maya - AI Travel Assistant</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl p-3 text-sm break-words shadow-md ${
                  message.isUser
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-gray-500 text-center mb-2">Or ask one of these:</p>
              {quickQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2 text-sm bg-white/80 border-gray-200 hover:bg-white hover:border-purple-400 transition"
                  onClick={() => handleQuickQuestion(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 text-sm shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t border-white/20 bg-white/50 flex-shrink-0">
          <div className="relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your next trip..."
              disabled={isLoading}
              className="flex-1 text-sm rounded-full pr-12 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;