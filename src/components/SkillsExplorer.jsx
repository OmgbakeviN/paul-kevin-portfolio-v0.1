import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { selectedProjects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import SkillSculpture from './SkillSculpture.jsx';
import './SkillsExplorer.css';

gsap.registerPlugin(ScrollTrigger);

const projectLookup = new Map(selectedProjects.map((project) => [project.id, project]));

function LetterText({ text }) {
  return <>
    <span className="sk-screen-reader">{text}</span>
    <span className="sk-split-words" aria-hidden="true">
      {text.split(' ').map((word, wordIndex) => <span className="sk-word" key={`${word}-${wordIndex}`}>
        {Array.from(word).map((character, index) => <span className="sk-char" key={`${character}-${index}`}>{character}</span>)}
      </span>)}
    </span>
  </>;
}

function TechLogo({ tech, small = false }) {
  const logoUrl = tech.icon ? `/images/skills/${tech.icon}.svg` : null;
  return <span className={`sk-tech-logo ${small ? 'sk-tech-logo-small' : ''} ${!logoUrl ? 'sk-tech-logo-text' : ''}`} aria-hidden="true" style={logoUrl ? {
    backgroundColor: tech.color || '#eee3fc',
    WebkitMaskImage: `url('${logoUrl}')`,
    maskImage: `url('${logoUrl}')`,
  } : undefined}>{!logoUrl ? tech.mark : null}</span>;
}

function ProofLink({ proof }) {
  const project = proof.projectId ? projectLookup.get(proof.projectId) : null;
  if (project) return <button className="sk-proof-link" type="button" onClick={() => window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { projectId: project.id } }))}>
    <span className="sk-proof-link-title">{project.title}</span>
    <span className="sk-proof-link-action">VIEW CASE <ArrowUpRight size={15} strokeWidth={1.7} /></span>
  </button>;

  if (proof.href) return <a className="sk-proof-link" href={proof.href}>
    <span className="sk-proof-link-title">{proof.label}</span>
    <span className="sk-proof-link-action">VIEW ROLE <ArrowUpRight size={15} strokeWidth={1.7} /></span>
  </a>;
  return null;
}

export default function SkillsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const firstEffect = useRef(true);
  const selected = skillGroups[activeIndex];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), { rootMargin: '200px 0px 200px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Letters are kept in the DOM for screen readers, with the visible copy animated by GSAP.
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      sectionRef.current.querySelectorAll('.sk-letter-reveal').forEach((element) => {
        gsap.fromTo(element.querySelectorAll('.sk-char'),
          { yPercent: 112, opacity: 0, rotate: 5 },
          { yPercent: 0, opacity: 1, rotate: 0, duration: .83, stagger: .024, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      gsap.fromTo('.sk-section-intro', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: .85, ease: 'power2.out',
        scrollTrigger: { trigger: '.sk-section-intro', start: 'top 94%', once: true },
      });
    }, sectionRef);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initial = firstEffect.current;
    firstEffect.current = false;
    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === activeIndex;
      gsap.killTweensOf(panel);
      if (reduceMotion || initial) {
        gsap.set(panel, { height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 });
      } else {
        gsap.to(panel, {
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
          duration: isActive ? .72 : .52,
          ease: 'power3.inOut',
          overwrite: true,
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    });
    if (initial) ScrollTrigger.refresh();
  }, [activeIndex]);

  return <section className="sk-section" id="expertise" ref={sectionRef} aria-labelledby="sk-heading">
    <div className="section-kicker sk-kicker"><span>002 / EXPERTISE</span><span>THE TOOLS & THINKING BEHIND MY WORK</span></div>
    <div className="sk-topline">
      <h2 id="sk-heading">
        <span className="sk-heading-line sk-letter-reveal"><LetterText text="Different skills." /></span>
        <em className="sk-heading-line sk-letter-reveal"><LetterText text="One mindset." /></em>
      </h2>
      <div className="sk-section-intro"><span className="sk-intro-star">✳</span><p>I move between engineering, artificial intelligence and creative technology. Select a domain to see the tools I use and the work behind it.</p><span>CHOOSE A DOMAIN <ArrowDownRight size={16} /></span></div>
    </div>

    <div className="sk-content">
      <div className="sk-list" aria-label="Areas of expertise">
        {skillGroups.map((skill, index) => <article className={`sk-item ${index === activeIndex ? 'sk-item-active' : ''}`} key={skill.id} style={{ '--sk-local-accent': skill.accent }}>
          <button
            className="sk-item-button"
            type="button"
            aria-expanded={index === activeIndex}
            aria-controls={`sk-panel-${skill.id}`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sk-item-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="sk-item-main">
              <span className="sk-item-eyebrow">{skill.eyebrow}</span>
              <span className="sk-item-title sk-letter-reveal"><LetterText text={skill.title} /></span>
            </span>
            <span className="sk-peek" aria-hidden="true">
              {skill.technologies.slice(0, 4).map((tech) => <span className="sk-peek-unit" key={tech.name}><TechLogo tech={tech} small /></span>)}
            </span>
            <span className="sk-expand-indicator" aria-hidden="true"><Plus size={22} strokeWidth={1.3} /></span>
          </button>
          <div id={`sk-panel-${skill.id}`} className="sk-panel" data-open={index === activeIndex} ref={(element) => { panelRefs.current[index] = element; }} inert={index !== activeIndex}>
            <div className="sk-panel-inner">
              <p className="sk-item-summary">{skill.summary}</p>
              <div className="sk-panel-label">TOOLS & DISCIPLINES</div>
              <div className="sk-technologies">
                {skill.technologies.map((tech) => <span className="sk-tech-chip" key={tech.name}><TechLogo tech={tech} />{tech.name}</span>)}
              </div>
              <div className="sk-proof-head">PROOF FROM MY WORK <MoveUpRight size={14} strokeWidth={1.8} /></div>
              <div className="sk-proof-list">{skill.proofs.map((proof) => <ProofLink proof={proof} key={proof.projectId || proof.href} />)}</div>
            </div>
          </div>
        </article>)}
        <p className="sk-bottom-note">NO INVENTED SKILL SCORES. REAL TOOLS, REAL WORK, ALWAYS LEARNING.</p>
      </div>

      <aside className="sk-stage" style={{ '--sk-stage-accent': selected.accent }} aria-live="polite" aria-atomic="true">
        <div className="sk-stage-top"><span>INTERACTIVE / SKILL OBJECT</span><span>0{activeIndex + 1} — 0{skillGroups.length}</span></div>
        <div className="sk-stage-grid" aria-hidden="true" />
        <span className="sk-stage-circle" aria-hidden="true" />
        <SkillSculpture activeIndex={activeIndex} sectionVisible={sectionVisible} />
        <div className="sk-stage-content">
          <span className="sk-stage-index">DOMAIN / {String(activeIndex + 1).padStart(2, '0')}</span>
          <h3 key={selected.id} className="sk-stage-title">{selected.title}</h3>
          <p key={`${selected.id}-focus`} className="sk-stage-caption">{selected.focus}</p>
          <div className="sk-stage-bottom"><span>EXPLORE THE CATEGORIES TO TRANSFORM THE OBJECT</span><span className="sk-stage-bullet">✳</span></div>
        </div>
      </aside>
    </div>
  </section>;
}
