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

const contactFacts = [
  "Based in Mongolia",
  "Seeking internship and junior roles",
  "Interested in frontend and full-stack teams",
];

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
        setStatusMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
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
          <SectionHeading
            color="teal"
            eyebrow="Contact"
            description="If you have an internship or junior software engineering opening, I would be glad to talk."
          >
            Get In Touch
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimateOnScroll>
            <Card hover={false} className="h-full">
              <span className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                {PERSONAL.availability}
              </span>
              <h3 className="mt-5 text-3xl font-black text-navy">
                Open to the right role.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                I am looking for a team where I can contribute to real product work, keep improving across frontend and backend, and grow as a software engineer.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-accent-orange transition-colors hover:text-accent-violet"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {PERSONAL.email}
                </a>

                <div className="flex flex-wrap gap-6 pt-2">
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

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {contactFacts.map((fact) => (
                  <div
                    key={fact}
                    className="border-3 border-navy bg-white/70 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy shadow-brutal-sm"
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </Card>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <Card hover={false} className="h-full">
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
                  placeholder="Tell me about the role, project, or opportunity"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {statusMessage ? (
                  <p
                    className={`text-sm font-medium ${
                      statusError ? "text-accent-orange" : "text-accent-teal"
                    }`}
                  >
                    {statusMessage}
                  </p>
                ) : null}
              </form>
            </Card>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
