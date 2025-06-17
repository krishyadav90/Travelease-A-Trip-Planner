
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2000);
    setEmail("");
  }

  return (
    <section className="max-w-2xl mx-auto my-10 px-4 py-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">Newsletter Subscribe</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Get travel tips, destination highlights & exclusive offers—straight to your inbox.
      </p>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-fit">
          {subscribed ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
    </section>
  );
};
export default NewsletterSubscribe;
