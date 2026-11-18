import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, ExternalLink, LayoutGrid, Orbit, X } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import { selectedProjects } from '../data/projects.js';
import ProjectSpine from './ProjectSpine.jsx';
import './SelectedWork.css';

const twoDigits = (value) => String(value).padStart(2, '0');
const archiveFilters = [
  { id: 'all', label: 'All projects' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'automation', label: 'AI Automation' },
];

/** Un seul composant d'image pour toutes les futures entrées de projects.js. */
function ProjectArt({ project }) {
  const { media = {} } = project;

  if (media.type === 'phones') {
    return <div className="sw-art sw-art-phones">
      <span className="sw-art-watermark" aria-hidden="true">{project.title}</span>
      <div className="sw-orbit sw-orbit-one" aria-hidden="true" />
      <div className="sw-orbit sw-orbit-two" aria-hidden="true" />
      {(media.images || []).map((src, index) => <div
        className={`sw-phone sw-phone-${index % 2 === 0 ? 'front' : 'back'}`}
        key={`${src}-${index}`}
      >
        <div className="sw-phone-screen">
          <img src={src} alt={`${media.alt || project.title} — screen ${index + 1}`} loading="lazy" decoding="async" draggable="false" />
        </div>
      </div>)}
      <span className="sw-art-bottomline" aria-hidden="true">DESIGNED TO BE DISCOVERED / BUILT TO BE EXPERIENCED</span>
    </div>;
  }

  if (media.type === 'browser') {
    return <div className="sw-art sw-art-browser">
      <div className="sw-art-halo" aria-hidden="true" />
      <div className="sw-browser-window">
        <div className="sw-browser-top" aria-hidden="true">
          <span className="sw-browser-dots"><i /><i /><i /></span>
          <span className="sw-browser-address">{project.title.toLowerCase()} / LIVE PREVIEW</span>
          <span className="sw-browser-plus">+</span>
        </div>
        <img src={media.src} alt={media.alt || `${project.title} project screenshot`} loading="lazy" decoding="async" draggable="false" />
      </div>
      <span className="sw-art-vertical" aria-hidden="true">DIGITAL EXPERIENCE — {project.title}</span>
    </div>;
  }

  if (media.type === 'video') {
    return <div className="sw-art sw-art-single">
      <video src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="metadata" aria-label={media.alt || `${project.title} preview`} />
    </div>;
  }

  if (media.type === 'image' && media.src) {
    return <div className="sw-art sw-art-single">
      <img src={media.src} alt={media.alt || `${project.title} preview`} loading="lazy" decoding="async" draggable="false" />
    </div>;
  }

  if (media.type === 'concept') {
    return <div className="sw-art sw-art-concept" aria-label={`Abstract illustration for ${project.title}; not a product screenshot`}>
      <div className="sw-concept-ring sw-concept-ring-one" aria-hidden="true" />
      <div className="sw-concept-ring sw-concept-ring-two" aria-hidden="true" />
      <div className="sw-concept-core" aria-hidden="true"><span /><span /><span /></div>
      <span className="sw-concept-kicker">SYSTEM / 0{project.group === 'automation' ? '3' : '1'}</span>
      <span className="sw-concept-caption">{media.label || 'CONNECTED INTELLIGENCE'}</span>
      <span className="sw-concept-disclaimer">CONCEPT ART · NOT A SCREENSHOT</span>
    </div>;
  }

  return <div className="sw-art sw-art-placeholder" aria-hidden="true">
    <span>{project.title}</span>
    <div className="sw-placeholder-disc" />
  </div>;
}

function ProjectCard({ project, index, count, onOpen }) {
  const cardRef = useRef(null);
  const number = twoDigits(index + 1);

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = cardRef.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    element.style.setProperty('--sw-tilt-x', `${(-y * 3.3).toFixed(2)}deg`);
    element.style.setProperty('--sw-tilt-y', `${(x * 3.3).toFixed(2)}deg`);
    element.style.setProperty('--sw-shift-x', `${(x * 17).toFixed(1)}px`);
    element.style.setProperty('--sw-shift-y', `${(y * 17).toFixed(1)}px`);
    element.style.setProperty('--sw-shift-x-reverse', `${(-x * 11).toFixed(1)}px`);
    element.style.setProperty('--sw-shift-y-reverse', `${(-y * 11).toFixed(1)}px`);
    element.style.setProperty('--sw-cursor-x', `${event.clientX - box.left}px`);
    element.style.setProperty('--sw-cursor-y', `${event.clientY - box.top}px`);
  }

  function resetPointer() {
    const element = cardRef.current;
    if (!element) return;
    element.style.setProperty('--sw-tilt-x', '0deg');
    element.style.setProperty('--sw-tilt-y', '0deg');
    element.style.setProperty('--sw-shift-x', '0px');
    element.style.setProperty('--sw-shift-y', '0px');
    element.style.setProperty('--sw-shift-x-reverse', '0px');
    element.style.setProperty('--sw-shift-y-reverse', '0px');
  }

  return <article className={`sw-card sw-card-${project.layout || 'standard'} sw-theme-${project.theme || 'default'} sw-reveal`}>
    <div
      className="sw-visual"
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="sw-visual-inner">
        <ProjectArt project={project} />
      </div>
      <div className="sw-visual-topline" aria-hidden="true">
        <span>PROJECT / {number}</span>
        <span>{project.category}</span>
      </div>
      <span className="sw-cursor-bubble" aria-hidden="true">EXPLORE <ArrowUpRight size={16} /></span>
      <span className="sw-visual-count" aria-hidden="true">{number} <span>/ {twoDigits(count)}</span></span>
      <button type="button" className="sw-visual-hit" onClick={() => onOpen(project)} aria-label={`Discover ${project.title} project details`} />
    </div>

    <div className="sw-card-meta">
      <span className="sw-card-index">{number} / {twoDigits(count)}</span>
      <div className="sw-card-info">
        <h3 aria-label={project.title}>{project.title.split(' ').map((word, wordIndex) => <span className="sw-project-word" aria-hidden="true" key={`${word}-${wordIndex}`} style={{ '--sw-title-delay': `${wordIndex * 110}ms` }}><span>{word}</span></span>)}</h3>
        <p>{project.discipline}</p>
        <div className="sw-tags" aria-label="Technologies and disciplines">
          {(project.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <button type="button" className="sw-card-action" onClick={() => onOpen(project)} aria-label={`Read about ${project.title}`}>
        <ArrowUpRight size={23} strokeWidth={1.35} />
      </button>
    </div>
  </article>;
}

function ArchiveCard({ project, index, onOpen }) {
  const isConcept = project.media?.type === 'concept';
  return <article className={`sw-archive-card sw-theme-${project.theme || 'default'}`}>
    <button type="button" className="sw-archive-preview" onClick={() => onOpen(project)} aria-label={`Explore ${project.title}`}>
      <span className="sw-archive-grain" aria-hidden="true" />
      {isConcept ? <ProjectArt project={project} /> : <div className="sw-archive-window">
        <div className="sw-archive-window-bar" aria-hidden="true"><span><i /><i /><i /></span><span>PROJECT PREVIEW / {project.title}</span></div>
        <img src={project.media?.src} alt={project.media?.alt || `${project.title} interface`} loading="lazy" decoding="async" draggable="false" />
      </div>}
      <span className="sw-archive-card-number" aria-hidden="true">{twoDigits(index + 4)}</span>
      <span className="sw-archive-view" aria-hidden="true">EXPLORE <ArrowUpRight size={15} /></span>
    </button>
    <div className="sw-archive-card-footer">
      <div className="sw-archive-card-label"><span>{project.category}</span><h4>{project.title}</h4><p>{project.discipline}</p></div>
      <button type="button" className="sw-archive-arrow" onClick={() => onOpen(project)} aria-label={`Open details for ${project.title}`}><ArrowUpRight size={22} /></button>
    </div>
  </article>;
}

function ProjectDetails({ project, dialogRef, onClose }) {
  return <dialog className={`sw-dialog sw-theme-${project?.theme || 'default'}`} ref={dialogRef} onClose={onClose} onClick={(event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }} aria-label={project ? `${project.title} project details` : 'Project details'}>
    {project && <div className="sw-dialog-content">
      <div className="sw-dialog-head">
        <span>PAUL KEVIN OMGBA / PROJECT FILE</span>
        <button type="button" className="sw-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close project details"><X size={23} /></button>
      </div>
      <div className="sw-dialog-visual"><ProjectArt project={project} /></div>
      <div className="sw-dialog-body">
        <div>
          <p className="sw-dialog-kicker">{project.category}</p>
          <h2>{project.title}<span>.</span></h2>
          <p className="sw-dialog-lead">{project.lead}</p>
        </div>
        <div className="sw-dialog-description">
          <p>{project.description}</p>
          {project.highlights?.length > 0 && <>
            <h3>What it explores</h3>
            <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </>}
          <div className="sw-tags">{(project.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="sw-dialog-links">
            {project.links?.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Visit live project <ExternalLink size={16} /></a>}
            {project.links?.source && <a href={project.links.source} target="_blank" rel="noopener noreferrer">View source <ExternalLink size={16} /></a>}
            {!project.links?.live && !project.links?.source && <span className="sw-dialog-nolink">More project details available on request.</span>}
          </div>
        </div>
      </div>
      {project.gallery?.length > 0 && <div className="sw-dialog-gallery" aria-label={`Additional images for ${project.title}`}>
        <div className="sw-dialog-gallery-head"><span>MORE FROM THIS PROJECT</span><span>{twoDigits(project.gallery.length)} / IMAGES</span></div>
        <div className="sw-dialog-gallery-grid">{project.gallery.map((src, index) => <figure key={src}><img src={src} loading="lazy" decoding="async" alt={`${project.title} — additional project screen ${index + 1}`} /><figcaption>SCREEN / {twoDigits(index + 1)}</figcaption></figure>)}</div>
      </div>}
    </div>}
  </dialog>;
}

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [archiveView, setArchiveView] = useState('spiral');
  const featuredProjects = selectedProjects.filter((project) => project.featured !== false);
  const archiveProjects = selectedProjects.filter((project) => project.featured === false);
  const filteredArchive = activeFilter === 'all' ? archiveProjects : archiveProjects.filter((project) => project.group === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const elements = [...section.querySelectorAll('.sw-reveal')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('sw-visible'));
      return;
    }
    section.classList.add('sw-motion-on');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('sw-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.11, rootMargin: '0px 0px -7% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeProject && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [activeProject]);

  return <section className="sw-section" id="work" ref={sectionRef} aria-labelledby="sw-title">
    <div className="sw-background-glow" aria-hidden="true" />
    <div className="sw-shell">
      <div className="sw-topline sw-reveal"><span>001 / SELECTED WORK</span><span>AN EXPLORATION OF WHAT I BUILD</span></div>
      <div className="sw-intro sw-reveal">
        <div><p className="sw-overline"><span className="sw-overline-dot" /> DIGITAL EXPERIENCES / SELECTED {twoDigits(featuredProjects.length)}</p><h2 id="sw-title">Selected <em>work.</em></h2></div>
        <p className="sw-intro-copy">Projects shaped by code, curiosity and the belief that digital experiences should <em>feel</em> as good as they work.</p>
      </div>
      <div className="sw-scroll-note sw-reveal"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} strokeWidth={1.4} /></div>
      <div className="sw-grid">
        {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} count={featuredProjects.length} onOpen={setActiveProject} />)}
      </div>
      {archiveProjects.length > 0 && <div className="sw-archive" aria-labelledby="sw-archive-title">
        <div className="sw-archive-separator" aria-hidden="true"><span>ARCHIVE / {twoDigits(archiveProjects.length)}</span><span>MORE TO EXPLORE</span></div>
        <div className="sw-archive-heading sw-reveal">
          <div><p className="sw-archive-eyebrow">THE WORK CONTINUES / 002</p><h3 id="sw-archive-title">Beyond the<br /><em>spotlight.</em></h3></div>
          <p>Experiments, useful tools and real-world automations. Follow the spiral to discover the stories behind each one.</p>
        </div>
        <div className="sw-archive-viewbar">
          <div className="sw-archive-viewbar-note"><span className="sw-archive-viewbar-dot" /> INTERACTIVE WORK INDEX / SCROLL TO ROTATE</div>
          <div className="sw-archive-view-toggle" role="group" aria-label="Choose project display mode">
            <button type="button" className={archiveView === 'spiral' ? 'is-active' : ''} aria-pressed={archiveView === 'spiral'} onClick={() => setArchiveView('spiral')}><Orbit size={15} /> SPIRAL</button>
            <button type="button" className={archiveView === 'grid' ? 'is-active' : ''} aria-pressed={archiveView === 'grid'} onClick={() => setArchiveView('grid')}><LayoutGrid size={15} /> GRID</button>
          </div>
        </div>
        {archiveView === 'spiral' ? <ProjectSpine projects={archiveProjects} onOpen={setActiveProject} /> : <div className="sw-archive-grid-mode">
          <div className="sw-archive-toolbar">
            <div className="sw-archive-filters" role="group" aria-label="Filter projects by discipline">
              {archiveFilters.map((filter) => <button key={filter.id} type="button" className={activeFilter === filter.id ? 'sw-archive-filter is-active' : 'sw-archive-filter'} aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>{filter.label}<span>{twoDigits(filter.id === 'all' ? archiveProjects.length : archiveProjects.filter((project) => project.group === filter.id).length)}</span></button>)}
            </div>
            <span className="sw-archive-showing" role="status">SHOWING {twoDigits(filteredArchive.length)} / {twoDigits(archiveProjects.length)}</span>
          </div>
          <div className="sw-archive-grid">
            {filteredArchive.map((project) => <ArchiveCard key={project.id} project={project} index={archiveProjects.indexOf(project)} onOpen={setActiveProject} />)}
          </div>
        </div>}
      </div>}
      <div className="sw-outro sw-reveal"><div><span className="sw-outro-index">{twoDigits(selectedProjects.length)} PROJECTS AND COUNTING</span><h3>Always something<br /><em>in the making.</em></h3></div><a href={`mailto:${portfolio.email}?subject=${encodeURIComponent('Let’s build something together')}`}>LET'S MAKE SOMETHING <ArrowRight size={19} /></a></div>
    </div>
    <ProjectDetails project={activeProject} dialogRef={dialogRef} onClose={() => setActiveProject(null)} />
  </section>;
}
