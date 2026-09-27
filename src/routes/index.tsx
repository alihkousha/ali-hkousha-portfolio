import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { ProjectDiagram } from "@/components/portfolio/ProjectDiagram";
import { SystemDiagram } from "@/components/portfolio/SystemDiagram";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ali Hatefikousha — Mechatronics, Control & FPGA Engineering" },
      { name: "description", content: "Engineering systems where physical behavior meets computation: control, FPGA, robotics, and real-time implementation." },
      { property: "og:title", content: "Ali Hatefikousha — Engineering Physical Computation" },
      { property: "og:description", content: "An interactive engineering portfolio spanning mechatronics, control systems, FPGA, robotics, and real-time systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const thinking = ["Constraints.", "Architecture.", "Timing.", "Computation.", "Physical behavior.", "Trade-offs.", "Implementation."];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);
  const [reduce, setReduce] = useState(false);
  const project = projects[0];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduce(preference.matches);
      const hero = heroRef.current;
      const story = projectRef.current;
      if (hero) setHeroProgress(Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight)));
      if (story) {
        const start = story.offsetTop;
        const distance = Math.max(1, story.offsetHeight - window.innerHeight);
        setProjectProgress(Math.min(1, Math.max(0, (window.scrollY - start) / distance)));
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    preference.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", update);
    };
  }, []);

  if (!project) return null;

  return (
    <div className="portfolio-shell" id="top">
      <Navigation />

      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-visual" style={{ opacity: Math.max(0, 1 - heroProgress / 0.75) }}><SystemDiagram /></div>
        <div className="hero-copy" style={{ transform: `translateY(${reduce ? 0 : heroProgress * 140}px)`, opacity: Math.max(0, 1 - heroProgress / 0.75) }}>
          <p className="section-code">01 / THE SYSTEM</p>
          <h1 id="hero-title">I build systems where <span>physical behavior</span> meets computation.</h1>
          <div className="hero-footer">
            <p>Mechatronics · Control · FPGA · Robotics · Real-Time Systems</p>
            <a href="#thinking">Enter the system <ArrowDownRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="thinking" id="thinking" aria-labelledby="thinking-title">
        <div className="thinking-intro">
          <p className="section-code">02 / HOW I THINK</p>
          <h2 id="thinking-title">Every system has a limit.<br /><span>The interesting work starts there.</span></h2>
        </div>
        <div className="thinking-sequence" aria-label="Engineering principles">
          {thinking.map((word, index) => (
            <p key={word}>
              <span>{String(index + 1).padStart(2, "0")}</span>{word}
            </p>
          ))}
        </div>
        <p className="thinking-note">Not a list of disciplines. A method for deciding what the system needs—and what it can afford.</p>
      </section>

      <section className="work-intro" id="work" aria-labelledby="work-title">
        <p className="section-code">03 / SELECTED WORK</p>
        <h2 id="work-title">The architecture<br />is the argument.</h2>
        <p>One problem, traced from physical constraint to measured implementation.</p>
      </section>

      <section className="project-story" ref={projectRef} aria-labelledby="project-title">
        <div className="project-sticky">
          <div className="project-heading">
            <span className="project-number">PROJECT / {project.number}</span>
            <div><p>{project.category} · {project.year}</p><h2 id="project-title">{project.title}</h2></div>
          </div>
          <div className="project-stage">
            <ProjectDiagram progress={projectProgress} />
            <div className="chapter-stack">
              {project.chapters.map((chapter, index) => {
                const start = index / project.chapters.length;
                const end = (index + 1) / project.chapters.length;
                return <ProjectChapter key={chapter.label} chapter={chapter} index={index} progress={projectProgress} range={[start, end]} reduce={Boolean(reduce)} />;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="project-summary" id="project-summary" aria-label="FPGA project summary">
        <div className="summary-primary"><p className="section-code">RESOLUTION</p><h2>{project.result}</h2></div>
        <dl>
          <div><dt>Constraint</dt><dd>{project.constraints.join(" / ")}</dd></div>
          <div><dt>Implementation</dt><dd>{project.technologies.join(" / ")}</dd></div>
          <div id="project-notes"><dt>Method</dt><dd>{project.approach}</dd></div>
        </dl>
        <a className="case-link" href="mailto:ali.hatefikousha@gmail.com?subject=FPGA%20case%20study">Request full case study <ArrowUpRight aria-hidden="true" /></a>
      </section>

      <footer id="contact">
        <p>ALI HATEFIKOUSHA / ENGINEERING PHYSICAL COMPUTATION</p>
        <p>FOUNDATION / 01</p>
      </footer>
    </div>
  );
}

function ProjectChapter({ chapter, index, progress, range, reduce }: { chapter: (typeof projects)[number]["chapters"][number]; index: number; progress: number; range: [number, number]; reduce: boolean }) {
  const fadeIn = range[0] === 0 ? 0 : range[0] - 0.025;
  const holdIn = range[0] + 0.035;
  const holdOut = range[1] - 0.035;
  const fadeOut = range[1] === 1 ? 1 : range[1] + 0.025;
  const entering = progress <= holdIn ? (progress - fadeIn) / Math.max(0.001, holdIn - fadeIn) : 1;
  const leaving = progress >= holdOut ? 1 - (progress - holdOut) / Math.max(0.001, fadeOut - holdOut) : 1;
  const opacity = Math.min(1, Math.max(0, Math.min(entering, leaving)));
  const y = reduce ? 0 : progress < holdIn ? (1 - opacity) * 22 : -(1 - opacity) * 22;
  return <article className="project-chapter" style={{ opacity, transform: `translateY(${y}px)` }}>
    <p><span>{String(index + 1).padStart(2, "0")}</span>{chapter.label}</p>
    <h3>{chapter.title}</h3>
    <div>{chapter.detail}</div>
  </article>;
}
