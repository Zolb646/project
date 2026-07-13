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
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function ContactSection() {
  const { personal: PERSONAL, socialLinks: SOCIAL_LINKS, ui } = useContent();
  const contactFacts = ui.contact.facts;
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

      if (!response.ok) {
        setStatusError(true);
        setStatusMessage(ui.contact.genericError);
        return;
      }

      setStatusMessage(ui.contact.successMessage);
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatusError(true);
      setStatusMessage(ui.contact.networkError);
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
            eyebrow={ui.contact.eyebrow}
            description={ui.contact.description}>
            {ui.contact.heading}
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimateOnScroll>
            <Card hover={false} className="h-full">
              <span className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                {PERSONAL.availability}
              </span>
              <h3 className="mt-5 text-3xl font-black text-navy">
                {ui.contact.readyHeading}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {ui.contact.intro}
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-accent-orange-ink transition-colors hover:text-accent-violet-ink">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
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
                    className="border-3 border-navy bg-white/70 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy shadow-brutal-sm">
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
                  label={ui.contact.formNameLabel}
                  name="name"
                  placeholder={ui.contact.formNamePlaceholder}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label={ui.contact.formEmailLabel}
                  name="email"
                  type="email"
                  placeholder={ui.contact.formEmailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                  label={ui.contact.formMessageLabel}
                  name="message"
                  placeholder={ui.contact.formMessagePlaceholder}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? ui.contact.sending : ui.contact.send}
                </Button>
                {statusMessage ? (
                  <p
                    className={`text-sm font-medium ${
                      statusError
                        ? "text-accent-orange-ink"
                        : "text-accent-teal-ink"
                    }`}>
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
