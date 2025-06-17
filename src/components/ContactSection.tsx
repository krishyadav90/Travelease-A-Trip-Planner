
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    // For demo: reset after 2s
    setTimeout(() => setSent(false), 2000);
  }

  return (
    <section className="max-w-3xl mx-auto my-10 px-4 py-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <Textarea
          name="message"
          placeholder="Type your message..."
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-fit">
          {sent ? "Thank you!" : "Send Message"}
        </Button>
      </form>
    </section>
  );
};
export default ContactSection;
