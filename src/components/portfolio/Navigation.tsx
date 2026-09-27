import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["Work", "#work"],
  ["Research", "#thinking"],
  ["About", "#thinking"],
  ["Notes", "#project-notes"],
  ["CV", "#project-summary"],
  ["Contact", "#contact"],
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 56);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? window.scrollY / range : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="nav-name" href="#top" aria-label="Ali Hatefikousha, back to top">Ali Hatefikousha</a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
      <div className="scroll-track" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </header>
  );
}
