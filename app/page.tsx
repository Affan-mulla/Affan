"use client";

import { useEffect, useMemo, useState } from "react";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { WorkSection } from "@/app/components/sections/WorkSection";
import {
  caseStudies,
  experienceList,
  type NavSection,
  navSections,
  skillPills,
} from "@/app/components/portfolio-data";
import { CustomCursor } from "@/app/components/CustomCursor";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isPastHeroThreshold, setIsPastHeroThreshold] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = window.localStorage.getItem("affan-theme");
    return storedTheme === "dark" ? "dark" : "light";
  });
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
      jobTitle: "Freelance Product Designer & Front-End Developer",
      description:
        "Freelancer helping clients get more leads and better opportunities through SEO-ready portfolio websites and interactive product experiences.",
      email: "mailto:affanmulla077@gmail.com",
      sameAs: [
        "https://instagram.com/aff4n_7",
        "https://x.com/_aff4n_",
        "https://www.linkedin.com/in/affan-mulla-544341321/",
        "https://github.com/Affan-mulla",
      ],
      knowsAbout: [
        "Portfolio UX",
        "Web Design",
        "Front-End Development",
        "SEO Architecture",
        "Interaction Design",
      ],
    }),
    [],
  );

  const websiteStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Affan Mulla Portfolio",
      description: "Portfolio website for Affan Mulla, freelance designer and front-end developer.",
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
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("affan-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");

      if (!hero) {
        return;
      }

      // Collapse nav shortly after user starts scrolling through hero.
      setIsPastHeroThreshold(hero.getBoundingClientRect().top <= -96);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
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

  const handleCursorLabel = (label: string) => {
    if (isTouch) {
      return;
    }

    setCursor((previous) => ({ ...previous, label }));
  };

  const navCollapsed = isPastHeroThreshold || activeSection !== "home";
  const isDark = theme === "dark";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />

      <CustomCursor cursor={cursor} isTouch={isTouch} />


        <main className="relative  flex w-full flex-col gap-16 px-4 pb-16 sm:px-8 sm:pb-20 md:gap-24">
        
        <HeroSection
          activeSection={activeSection}
          navCollapsed={navCollapsed}
          navSections={navSections}
          onCursorLabel={handleCursorLabel}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
          theme={theme}
        />

        <WorkSection caseStudies={caseStudies} onCursorLabel={handleCursorLabel} />

        <AboutSection
          experienceList={experienceList}
          onCursorLabel={handleCursorLabel}
          skillPills={skillPills}
        />

        <ContactSection onCursorLabel={handleCursorLabel} />
      </main>
    </>
  );
}
