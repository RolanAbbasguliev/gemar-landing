import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Instagram,
  Send,
  ChevronDown,
  Award,
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Quote,
} from "lucide-react";
import { CONTACTS } from "../i18n/translations";
import { LanguageSwitch, useLang } from "../i18n/LanguageContext";

const HERO_IMG =
  "https://images.unsplash.com/photo-1693842898771-c47ec142d21a?w=1920&h=1080&fit=crop&auto=format";
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1762182741687-deec9d1b386c?w=800&h=1000&fit=crop&auto=format";
const OFFICE_IMG =
  "https://images.unsplash.com/photo-1758437053604-dc65da64c7d7?w=800&h=600&fit=crop&auto=format";

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -36 }
      : direction === "right"
        ? { opacity: 0, x: 36 }
        : { opacity: 0, y: 28 };

  const animate = inView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.85, delay, ease: [0.22, 0.1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider({ light = false }: { light?: boolean }) {
  const c = light ? "#E8D5B0" : "#C9A96E";
  return (
    <div className="flex items-center justify-center gap-3 my-1">
      <div
        className="h-px w-12"
        style={{ background: `linear-gradient(to right, transparent, ${c})` }}
      />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
      <div
        className="w-1 h-1 rounded-full opacity-50"
        style={{ background: c }}
      />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
      <div
        className="h-px w-12"
        style={{ background: `linear-gradient(to left, transparent, ${c})` }}
      />
    </div>
  );
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p
        className="font-sans text-[10px] tracking-[0.35em] uppercase mb-2"
        style={{ color: light ? "#E8D5B0" : "#C9A96E" }}
      >
        {text}
      </p>
      <GoldDivider light={light} />
    </div>
  );
}

export default function App() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email) setSubmitted(true);
  };

  const navLinks = [
    [t.nav.about, "#about"],
    [t.nav.certs, "#certs"],
    [t.nav.cases, "#cases"],
    [t.nav.booking, "#booking"],
    [t.nav.contacts, "#contacts"],
  ];

  return (
    <div className="bg-background text-foreground overflow-x-hidden font-sans">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(247,240,227,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(139,107,61,0.12)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-xl text-[#2C1A0E] leading-tight truncate">
              {t.name}
            </p>
            <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#C9A96E]">
              {t.role}
            </p>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm text-[#7A6040]">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="relative group hover:text-[#8B6B3D] transition-colors duration-300"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <LanguageSwitch />
            <a
              href="#booking"
              className="hidden md:inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase px-6 py-3 bg-[#8B6B3D] text-[#FAF4E8] hover:bg-[#C9A96E] transition-colors duration-300"
            >
              {t.bookCta}
            </a>
            <button
              className="lg:hidden text-[#2C1A0E] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span
                  className="block w-6 h-px bg-[#8B6B3D] transition-transform duration-300"
                  style={{
                    transform: menuOpen ? "rotate(45deg) translateY(4px)" : "",
                  }}
                />
                <span
                  className="block w-4 h-px bg-[#8B6B3D] transition-opacity duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block w-6 h-px bg-[#8B6B3D] transition-transform duration-300"
                  style={{
                    transform: menuOpen
                      ? "rotate(-45deg) translateY(-4px)"
                      : "",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden bg-[#FAF4E8] border-t border-[#C9A96E]/20 px-6 py-6 space-y-4"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block font-sans text-sm text-[#7A6040] hover:text-[#8B6B3D]"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>

      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#F7F0E3" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt={t.heroBgAlt}
            className="w-full h-full object-cover"
            style={{ opacity: 0.18, filter: "sepia(20%) saturate(80%)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, #F7F0E3 50%, rgba(247,240,227,0.6) 80%, rgba(247,240,227,0.1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <SectionLabel text={t.hero.label} />
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-[4.5rem] text-[#2C1A0E] leading-[1.15] mt-8 mb-6"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
            >
              {t.hero.title1}
              <br />
              <em className="text-[#8B6B3D] italic font-normal">{t.hero.title2}</em>
              <br />
              {t.hero.title3}
            </motion.h1>

            <motion.p
              className="font-sans text-[#7A6040] leading-relaxed max-w-md mb-10 text-base font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.hero.text}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72 }}
            >
              <a
                href="#booking"
                className="font-sans text-xs tracking-widest uppercase px-8 py-4 bg-[#8B6B3D] text-[#FAF4E8] hover:bg-[#C9A96E] transition-colors duration-300"
              >
                {t.hero.cta}
              </a>
              <a
                href="#about"
                className="font-sans text-xs tracking-widest uppercase px-8 py-4 border border-[#C9A96E]/50 text-[#8B6B3D] hover:bg-[#C9A96E]/12 transition-colors duration-300"
              >
                {t.hero.more}
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 0.1, 0.36, 1] }}
          >
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full border border-[#C9A96E]/25"
                style={{ zIndex: 0 }}
              />
              <img
                src={ABOUT_IMG}
                alt={t.hero.photoAlt}
                className="relative w-full h-[580px] object-cover z-10"
                style={{ filter: "sepia(10%) saturate(90%)" }}
              />
              <div className="absolute -bottom-5 -right-5 z-20 bg-[#FAF4E8] border border-[#C9A96E]/30 px-6 py-5 shadow-sm">
                <p className="font-display text-3xl text-[#8B6B3D] italic">
                  {t.hero.badgeValue}
                </p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#7A6040]">
                  {t.hero.badgeLabel}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ChevronDown className="text-[#C9A96E] w-5 h-5" />
          </motion.div>
        </div>
      </section>

      <section style={{ background: "#2C1A0E" }} className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <p className="font-display text-4xl md:text-5xl text-[#C9A96E] mb-1 italic">
                {stat.value}
              </p>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#E8D5B0]/50">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="about" className="py-28" style={{ background: "#FAF4E8" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <img
                src={OFFICE_IMG}
                alt={t.about.officeAlt}
                className="w-full h-[480px] object-cover"
                style={{ filter: "sepia(12%) saturate(85%)" }}
              />
              <div className="absolute top-6 -right-5 w-full h-full border border-[#C9A96E]/25 pointer-events-none" />
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <SectionLabel text={t.about.label} />
            </FadeIn>
            <FadeIn delay={0.18}>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C1A0E] mt-5 leading-tight">
                {t.name}
              </h2>
            </FadeIn>
            <FadeIn delay={0.26}>
              <p className="font-sans text-[#7A6040] leading-relaxed font-light">
                {t.about.p1}
              </p>
            </FadeIn>
            <FadeIn delay={0.33}>
              <p className="font-sans text-[#7A6040] leading-relaxed font-light">
                {t.about.p2}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-sans text-[#7A6040] leading-relaxed font-light">
                {t.about.p3}
              </p>
            </FadeIn>
            <FadeIn delay={0.48}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {t.about.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[11px] tracking-wide px-3 py-1.5 border border-[#C9A96E]/35 text-[#8B6B3D]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="certs" className="py-28" style={{ background: "#F7F0E3" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel text={t.certs.label} />
              <h2 className="font-display text-4xl md:text-5xl text-[#2C1A0E] mt-6 mb-4">
                {t.certs.title}
              </h2>
              <p className="font-sans text-[#7A6040] max-w-lg mx-auto leading-relaxed font-light">
                {t.certs.text}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.certs.items.map((cert, i) => (
              <FadeIn key={cert.title} delay={i * 0.07}>
                <div className="group relative bg-[#FAF4E8] border border-[#C9A96E]/20 p-7 hover:border-[#C9A96E]/55 hover:shadow-md transition-all duration-500 overflow-hidden">
                  <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-[#C9A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between mb-5">
                    <Award className="w-5 h-5 text-[#C9A96E]" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] tracking-widest uppercase text-[#C9A96E]">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-[#2C1A0E] mb-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-sans text-sm text-[#7A6040] mb-4 leading-relaxed font-light">
                    {cert.org}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#C9A96E]/25" />
                    <span className="font-sans text-[11px] text-[#C9A96E]">
                      {cert.hours}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-28" style={{ background: "#2C1A0E" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel text={t.cases.label} light />
              <h2 className="font-display text-4xl md:text-5xl text-[#FAF4E8] mt-6 mb-4">
                {t.cases.title}
              </h2>
              <p className="font-sans text-[#E8D5B0]/55 max-w-sm mx-auto leading-relaxed text-sm font-light">
                {t.cases.note}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {t.cases.items.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.12}>
                <div className="group border border-[#C9A96E]/20 p-8 hover:border-[#C9A96E]/50 transition-all duration-500 h-full flex flex-col">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-2.5 py-1 self-start mb-6">
                    {c.tag}
                  </span>

                  <Quote
                    className="w-5 h-5 text-[#C9A96E]/40 mb-4"
                    strokeWidth={1}
                  />

                  <h3 className="font-display text-xl text-[#FAF4E8] mb-4 group-hover:text-[#C9A96E] transition-colors duration-400 leading-snug">
                    {c.title}
                  </h3>

                  <p className="font-sans text-sm text-[#E8D5B0]/65 leading-relaxed flex-1 mb-6 font-light">
                    {c.text}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-[#C9A96E]/15">
                    <p className="font-display text-sm text-[#C9A96E]/70 italic">
                      {c.author}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className="w-3 h-3"
                          fill="#C9A96E"
                          color="#C9A96E"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-28" style={{ background: "#FAF4E8" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
          <div>
            <FadeIn>
              <SectionLabel text={t.booking.label} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C1A0E] mt-6 mb-6 leading-tight">
                {t.booking.title1}
                <br />
                <em className="italic font-normal text-[#8B6B3D]">
                  {t.booking.title2}
                </em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="font-sans text-[#7A6040] leading-relaxed mb-10 font-light">
                {t.booking.text}
              </p>
            </FadeIn>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <Clock
                      strokeWidth={1.5}
                      className="w-4 h-4 text-[#C9A96E]"
                    />
                  ),
                  text: t.booking.facts[0],
                },
                {
                  icon: (
                    <MapPin
                      strokeWidth={1.5}
                      className="w-4 h-4 text-[#C9A96E]"
                    />
                  ),
                  text: t.booking.facts[1],
                },
                {
                  icon: (
                    <MessageCircle
                      strokeWidth={1.5}
                      className="w-4 h-4 text-[#C9A96E]"
                    />
                  ),
                  text: t.booking.facts[2],
                },
              ].map(({ icon, text }, i) => (
                <FadeIn key={text} delay={0.26 + i * 0.08}>
                  <div className="flex items-center gap-3 font-sans text-sm text-[#7A6040]">
                    {icon}
                    {text}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div
                className="mt-12 p-6 border-l-2 border-[#C9A96E]"
                style={{ background: "rgba(201,169,110,0.07)" }}
              >
                <p className="font-display text-lg text-[#2C1A0E] italic leading-relaxed whitespace-pre-line">
                  {t.booking.quote}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} direction="right">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20 px-8 border border-[#C9A96E]/35"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(201,169,110,0.15)" }}
                >
                  <Award className="w-6 h-6 text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-[#2C1A0E] mb-3">
                  {t.booking.successTitle}
                </h3>
                <p className="font-sans text-sm text-[#7A6040] leading-relaxed whitespace-pre-line font-light">
                  {t.booking.successText}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  {
                    label: t.booking.name,
                    key: "name" as const,
                    type: "text",
                    placeholder: t.booking.namePlaceholder,
                    required: false,
                  },
                  {
                    label: t.booking.email,
                    key: "email" as const,
                    type: "email",
                    placeholder: t.booking.emailPlaceholder,
                    required: true,
                  },
                ].map(({ label, key, type, placeholder, required }) => (
                  <div key={key}>
                    <label className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#7A6040] block mb-3">
                      {label}
                      {required && (
                        <span className="text-[#C9A96E] ml-1">*</span>
                      )}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={form[key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-[#C9A96E]/35 py-3 font-sans text-sm text-[#2C1A0E] placeholder-[#7A6040]/35 focus:outline-none focus:border-[#C9A96E] transition-colors duration-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#7A6040] block mb-3">
                    {t.booking.message}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder={t.booking.messagePlaceholder}
                    className="w-full bg-transparent border-b border-[#C9A96E]/35 py-3 font-sans text-sm text-[#2C1A0E] placeholder-[#7A6040]/35 focus:outline-none focus:border-[#C9A96E] transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#8B6B3D] text-[#FAF4E8] font-sans text-xs tracking-widest uppercase hover:bg-[#C9A96E] transition-colors duration-400 flex items-center justify-center gap-2.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t.booking.submit}
                </button>

                <p className="font-sans text-[10px] text-[#7A6040]/50 text-center leading-relaxed whitespace-pre-line">
                  {t.booking.consent}
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <section id="contacts" className="py-28" style={{ background: "#F7F0E3" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel text={t.contacts.label} />
              <h2 className="font-display text-4xl md:text-5xl text-[#2C1A0E] mt-6 mb-4">
                {t.contacts.title}
              </h2>
              <p className="font-sans text-[#7A6040] max-w-sm mx-auto leading-relaxed font-light">
                {t.contacts.text}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Instagram strokeWidth={1.5} className="w-5 h-5" />,
                label: "Instagram",
                handle: CONTACTS.instagram,
                desc: t.contacts.instagramDesc,
                href: CONTACTS.instagramUrl,
              },
              {
                icon: <MessageCircle strokeWidth={1.5} className="w-5 h-5" />,
                label: "WhatsApp",
                handle: CONTACTS.whatsapp,
                desc: t.contacts.whatsappDesc,
                href: CONTACTS.whatsappUrl,
              },
              {
                icon: <Send strokeWidth={1.5} className="w-5 h-5" />,
                label: "Telegram",
                handle: CONTACTS.telegram,
                desc: t.contacts.telegramDesc,
                href: CONTACTS.telegramUrl,
              },
            ].map((contact, i) => (
              <FadeIn key={contact.label} delay={i * 0.1}>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#FAF4E8] border border-[#C9A96E]/20 p-8 hover:border-[#C9A96E]/55 hover:shadow-md transition-all duration-500"
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-[#C9A96E]/30 text-[#C9A96E] mb-6 group-hover:bg-[#8B6B3D] group-hover:border-[#8B6B3D] group-hover:text-[#FAF4E8] transition-all duration-400">
                    {contact.icon}
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-2">
                    {contact.label}
                  </p>
                  <p className="font-display text-xl text-[#2C1A0E] mb-2 leading-snug">
                    {contact.handle}
                  </p>
                  <p className="font-sans text-sm text-[#7A6040] font-light">
                    {contact.desc}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-6 border border-[#C9A96E]/20 bg-[#FAF4E8] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-1">
                  {t.contacts.emailLabel}
                </p>
                <p className="font-display text-2xl text-[#2C1A0E]">
                  {CONTACTS.email}
                </p>
              </div>
              <a
                href={`mailto:${CONTACTS.email}`}
                className="font-sans text-xs tracking-widest uppercase px-8 py-3.5 bg-[#8B6B3D] text-[#FAF4E8] hover:bg-[#C9A96E] transition-colors duration-300 whitespace-nowrap"
              >
                {t.contacts.write}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer style={{ background: "#2C1A0E" }} className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#C9A96E]/15">
            <div>
              <p className="font-display text-2xl text-[#FAF4E8]">{t.name}</p>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] mt-1">
                {t.role}
              </p>
            </div>

            <GoldDivider light />

            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="font-sans text-xs text-[#E8D5B0]/50 hover:text-[#C9A96E] transition-colors duration-300 tracking-wide"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-[#E8D5B0]/35">{t.footer.rights}</p>
            <LanguageSwitch light />
            <p className="font-sans text-xs text-[#E8D5B0]/35">{t.footer.line}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
