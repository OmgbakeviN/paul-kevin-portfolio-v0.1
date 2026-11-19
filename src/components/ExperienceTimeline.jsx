import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { experience } from '../data/experience.js';
import './ExperienceTimeline.css';

const indexLabel = (index) => String(index + 1).padStart(2, '0');

function EmployerLogo({ role }) {
  return <div className={`ex-employer-logo ex-logo-${role.logoStyle || 'default'}`}>
    {role.logo
      ? <img src={role.logo} alt={`${role.company} logo`} loading="lazy" decoding="async" />
      : <span aria-label={`${role.company} text mark`}>{role.monogram || role.company.slice(0, 2)}</span>}
  </div>;
}

function CareerEntry({ role, index, active, revealed }) {
  return <article className={`ex-entry ex-reveal ${active ? 'ex-active' : ''} ${revealed ? 'ex-visible' : ''}`} data-ex-index={index}>
    <div className="ex-entry-axis" aria-hidden="true"><span className="ex-axis-node" /></div>
    <div className="ex-entry-body">
      <div className="ex-entry-top">
        <EmployerLogo role={role} />
        <div className="ex-org-meta">
          {role.url
            ? <a href={role.url} target="_blank" rel="noopener noreferrer" className="ex-org-name">{role.company}<ArrowUpRight size={13} /></a>
            : <span className="ex-org-name">{role.company}</span>}
          <span>{role.type} <span className="ex-mid-dot">·</span> {role.mode}</span>
        </div>
        <span className="ex-entry-index" aria-hidden="true">/{indexLabel(index)}</span>
      </div>

      <p className="ex-entry-period">{role.period}</p>
      <h3>{role.role}</h3>
      <p className="ex-entry-description">{role.description}</p>

      <ul className="ex-entry-highlights">
        {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>

      <div className="ex-entry-end">
        <div className="ex-entry-tags">{role.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <span className="ex-entry-place"><MapPin size={13} strokeWidth={1.5} />{role.place}</span>
      </div>
    </div>
  </article>;
}

/** A data-driven animated career timeline, with scroll progress and accessible motion fallback. */
export default function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(false);
  const [revealedEntries, setRevealedEntries] = useState(() => new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const revealItems = section.querySelectorAll('.ex-reveal');

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroVisible(true);
      setRevealedEntries(new Set(experience.map((_, index) => index)));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = entry.target.dataset.exIndex;
            if (cardIndex !== undefined) {
              setRevealedEntries((previous) => {
                const index = Number(cardIndex);
                if (previous.has(index)) return previous;
                const next = new Set(previous);
                next.add(index);
                return next;
              });
            } else {
              setIntroVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
      revealItems.forEach((element) => revealObserver.observe(element));

      const cards = section.querySelectorAll('[data-ex-index]');
      const activeObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const closest = visible.reduce((best, entry) =>
            Math.abs(entry.boundingClientRect.top - window.innerHeight * 0.32) < Math.abs(best.boundingClientRect.top - window.innerHeight * 0.32) ? entry : best,
          );
          setActiveIndex(Number(closest.target.dataset.exIndex));
        }
      }, { rootMargin: '-18% 0px -35% 0px', threshold: 0 });
      cards.forEach((card) => activeObserver.observe(card));
      section._exCleanup = () => { revealObserver.disconnect(); activeObserver.disconnect(); };
    }

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const timeline = section.querySelector('.ex-timeline');
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const distance = rect.height || 1;
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.56 - rect.top) / distance));
      timeline.style.setProperty('--ex-progress', `${(progress * 100).toFixed(2)}%`);
    };
    const scheduleProgress = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    scheduleProgress();

    return () => {
      section._exCleanup?.();
      delete section._exCleanup;
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <section id="experience" className="ex-section" ref={sectionRef} aria-labelledby="ex-title">
    <div className="section-kicker ex-kicker"><span>003 / EXPERIENCE</span><span>MY JOURNEY SO FAR</span></div>

    <div className="ex-layout">
      <div className={`ex-intro ex-reveal ${introVisible ? 'ex-visible' : ''}`}>
        <p className="ex-intro-eyebrow"><span className="ex-spark" />ENGINEERING / EDUCATION / AI</p>
        <h2 id="ex-title"><span className="ex-title-line">Experience</span><span className="ex-title-line ex-title-serif">in motion<span className="ex-title-period">.</span></span></h2>
        <p className="ex-intro-copy">From building products to teaching the next generation of developers — each role adds a new perspective to my work.</p>
        <div className="ex-intro-bottom">
          <span className="ex-roles-count"><strong>{String(experience.length).padStart(2, '0')}</strong> ROLES / ONGOING JOURNEY</span>
          <span className="ex-scroll-hint">SCROLL TO EXPLORE <ArrowDownRight size={18} /></span>
        </div>
        <div className="ex-progress-readout" aria-live="off"><span>{indexLabel(activeIndex)}</span> <span>/</span> <span>{String(experience.length).padStart(2, '0')}</span></div>
      </div>

      <div className="ex-timeline" aria-label="Professional experience timeline">
        {experience.map((role, index) => <CareerEntry key={role.id} role={role} index={index} active={index === activeIndex} revealed={revealedEntries.has(index)} />)}
        <div className="ex-timeline-end"><span className="ex-end-dot" aria-hidden="true" /><span>THE JOURNEY CONTINUES</span><span>↗</span></div>
      </div>
    </div>
  </section>;
}
