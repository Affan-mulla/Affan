"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { FaqSection } from "@/app/components/sections/FaqSection";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { MarqueeSection } from "@/app/components/sections/MarqueeSection";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { ServicesSection } from "@/app/components/sections/ServicesSection";
import { StatsSection } from "@/app/components/sections/StatsSection";
import { TestimonialsSection } from "@/app/components/sections/TestimonialsSection";
import { WorkSection } from "@/app/components/sections/WorkSection";
import {
  caseStudies,
  experienceList,
  type NavSection,
  navSections,
  skillPills,
  testimonials,
} from "@/app/components/portfolio-data";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isPastHeroThreshold, setIsPastHeroThreshold] = useState({navHidden: false, navCollapsed: false});
  const [isTouch, setIsTouch] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeInitialized, setThemeInitialized] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    visible: false,
    label: "Explore",
  });

  const personStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Affan Mulla",
      jobTitle: "Web Designer & Developer",
      description:
        "Building websites and landing pages for local businesses internationally.",
      email: "mailto:affanmulla077@gmail.com",
      url: "https://affan-mulla.vercel.app",
      sameAs: [
        "https://instagram.com/aff4n_7",
        "https://x.com/_aff4n_",
        "https://www.linkedin.com/in/affan-mulla-544341321/",
        "https://github.com/Affan-mulla",
      ],
      knowsAbout: [
        "Website Design",
        "Local SEO",
        "Landing Pages",
        "Next.js",
        "Small Business Websites",
        "E-commerce",
      ],
      areaServed: ["IN", "GB", "US", "CA", "AE", "AU"],
    }),
    [],
  );

  const websiteStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Affan Mulla Portfolio",
      description:
        "Portfolio website for Affan Mulla, freelance designer and front-end developer.",
      url: "https://yourdomain.com",
      author: {
        "@type": "Person",
        name: "Affan Mulla",
      },
    }),
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const onMediaChange = () => setIsTouch(mediaQuery.matches);

    onMediaChange();
    mediaQuery.addEventListener("change", onMediaChange);

    return () => mediaQuery.removeEventListener("change", onMediaChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", !isTouch);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouch]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("affan-theme");
    setTheme(storedTheme === "dark" ? "dark" : "light");
    setThemeInitialized(true);
  }, []);

  useEffect(() => {
    if (!themeInitialized) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("affan-theme", theme);
  }, [theme, themeInitialized]);

  // ADD THIS
  const scrollStateRef = useRef(0);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const HIDE_AFTER_MS = 2500; // hide after 2.5s of inactivity past hero
    const SCROLL_THRESHOLD = 150; // ignore tiny scroll jitter near top

    const clearInactivity = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };

    const handleScroll = () => {
      const hero = document.getElementById("home");
      const pastHero = hero ? hero.getBoundingClientRect().top <= -900 : false;
      if (hero) setIsPastHeroThreshold({ navCollapsed: hero.getBoundingClientRect().top <= -52, navHidden: pastHero });

      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > scrollStateRef.current;
      const pastThreshold = currentScroll > SCROLL_THRESHOLD;
      console.log({ isScrollingDown, pastThreshold, currentScroll, scrollState: scrollStateRef.current    });

      if (!isScrollingDown) {
        // Scroll up → always reveal
        setNavHidden(false);
        clearInactivity();
      } else if (pastHero && pastThreshold) {
        // Scroll down past hero → hide immediately
        setNavHidden(true);
        clearInactivity();
      }

      // Restart inactivity timer on every event past hero
      if (pastHero && pastThreshold) {
        clearInactivity();
        inactivityTimerRef.current = setTimeout(() => {
          setNavHidden(true);
        }, HIDE_AFTER_MS);
      }

      scrollStateRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInactivity();
    };
  }, []);

  useEffect(() => {
    const sections = navSections
      .map((section: NavSection) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section: HTMLElement) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isTouch) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setCursor((previous) => ({
        ...previous,
        x: event.clientX,
        y: event.clientY,
        visible: true,
      }));
    };

    const onLeave = () => {
      setCursor((previous) => ({ ...previous, visible: false }));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [isTouch]);


  const navCollapsed = isPastHeroThreshold.navCollapsed || activeSection !== "home";
  const isDark = theme === "dark";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <main className="relative  flex w-full flex-col gap-16 px-4 pb-16 sm:px-8 sm:pb-20 md:gap-24">
        <HeroSection

          activeSection={activeSection}
          isTouch={isTouch}
          navCollapsed={navCollapsed}
          navHidden={navHidden}
          navSections={navSections}
          
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
          theme={theme}
        />
        <MarqueeSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />

        <WorkSection
          caseStudies={caseStudies}
            
        />
        <TestimonialsSection testimonials={testimonials} />
        <FaqSection />

        <AboutSection
          experienceList={experienceList}
            
          skillPills={skillPills}
        />

        <ContactSection />
      </main>
    </>
  );
}
