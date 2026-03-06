"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import IconLink from "@/components/ui/IconLink";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PERSONAL, SOCIAL_LINKS } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatusError(true);
        setStatusMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatusMessage("Message sent successfully. I will get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatusError(true);
      setStatusMessage("Unable to send right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={SECTION_IDS.contact} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading color="teal">Get In Touch</SectionHeading>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-10">
          <AnimateOnScroll>
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <Input
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                  label="Message"
                  name="message"
                  placeholder="Your message..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {statusMessage && (
                  <p
                    className={`text-sm font-medium ${
                      statusError ? "text-accent-orange" : "text-accent-teal"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </Card>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Let&apos;s work together
              </h3>
              <p className="text-muted text-lg leading-relaxed mb-8">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 text-accent-orange hover:text-accent-violet font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {PERSONAL.email}
                </a>
                <div className="flex flex-wrap gap-6 pt-4">
                  {SOCIAL_LINKS.map((link) => (
                    <IconLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      icon={link.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
