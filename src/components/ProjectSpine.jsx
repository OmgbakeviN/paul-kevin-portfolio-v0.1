import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import './ProjectSpine.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const pad = (value) => String(value).padStart(2, '0');

/**
 * A scroll-controlled 3D helix. Scroll remains native (no wheel hijacking).
 * Direct DOM transforms avoid rerendering every card on every animation frame.
 * With reduced-motion preferences, all projects become a simple readable list.
 */
export default function ProjectSpine({ projects, onOpen }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const activeProject = projects[activeIndex] || projects[0];
  const count = projects.length;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStaticMode(preference.matches);
    update();
    preference.addEventListener?.('change', update);
    return () => preference.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (!count || staticMode) return undefined;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;
    let stopped = false;

    const render = () => {
      const selected = currentRef.current;
      const mobile = window.innerWidth < 760;
      const radius = mobile ? Math.min(window.innerWidth * .35, 180) : Math.min(window.innerWidth * .285, 380);
      const spacing = mobile ? Math.min(window.innerHeight * .285, 175) : Math.min(window.innerHeight * .32, 260);
      stage.style.setProperty('--sw-spine-turn', `${(selected * 67).toFixed(2)}deg`);
      stage.style.setProperty('--sw-spine-progress', `${(selected / Math.max(1, count - 1) * 100).toFixed(2)}%`);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const delta = index - selected;
        const distance = Math.abs(delta);
        const phase = delta * 1.13;
        const x = Math.sin(phase) * radius;
        const y = delta * spacing;
        const z = -Math.abs(Math.sin(phase)) * (mobile ? 170 : 290) - Math.min(distance, 4) * 75;
        const rotationY = -Math.sin(phase) * (mobile ? 22 : 38);
        const scale = Math.max(.6, 1 - distance * .075);
        const opacity = clamp(1 - Math.max(0, distance - .12) * .56, 0, 1);

        card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) rotateY(${rotationY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(100 - Math.round(distance * 10));
        card.style.pointerEvents = distance < .55 ? 'auto' : 'none';
      });

      const rounded = clamp(Math.round(selected), 0, count - 1);
      if (rounded !== activeRef.current) {
        activeRef.current = rounded;
        setActiveIndex(rounded);
      }
    };

    const tick = () => {
      frameRef.current = null;
      if (stopped) return;
      const difference = targetRef.current - currentRef.current;
      currentRef.current = Math.abs(difference) < .003
        ? targetRef.current
        : currentRef.current + difference * .135;
      render();
      if (currentRef.current !== targetRef.current) frameRef.current = requestAnimationFrame(tick);
    };

    const updateTarget = () => {
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      targetRef.current = clamp(-bounds.top / travel, 0, 1) * (count - 1);
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();
    return () => {
      stopped = true;
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [count, staticMode]);

  function goTo(index) {
    const track = trackRef.current;
    if (!track) return;
    const destination = clamp(index, 0, count - 1);
    if (staticMode) {
      cardsRef.current[destination]?.scrollIntoView({ behavior: 'auto', block: 'center' });
      return;
    }
    const top = window.scrollY + track.getBoundingClientRect().top;
    const travel = Math.max(0, track.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + (destination / Math.max(1, count - 1)) * travel, behavior: 'smooth' });
  }

  function pointerTilt(event) {
    if (staticMode || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -9;
    event.currentTarget.style.setProperty('--sw-spine-tilt-y', `${x.toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--sw-spine-tilt-x', `${y.toFixed(2)}deg`);
  }

  function resetTilt(event) {
    event.currentTarget.style.removeProperty('--sw-spine-tilt-x');
    event.currentTarget.style.removeProperty('--sw-spine-tilt-y');
  }

  if (!count) return null;

  return <div
    className={`sw-spine${staticMode ? ' is-static' : ''}`}
    ref={trackRef}
    style={{ height: staticMode ? 'auto' : `${100 + (count - 1) * 75}svh` }}
    aria-label="Scroll-driven project spiral"
  >
    <div className="sw-spine-stage" ref={stageRef}>
      <div className="sw-spine-atmosphere" aria-hidden="true" />
      <div className="sw-spine-axis" aria-hidden="true"><i /><i /><i /></div>
      <div className="sw-spine-orbit sw-spine-orbit-one" aria-hidden="true" />
      <div className="sw-spine-orbit sw-spine-orbit-two" aria-hidden="true" />

      <div className="sw-spine-copy">
        <div className="sw-spine-copy-top"><span className="sw-spine-signal" /> LIVE PROJECT ORBIT <span className="sw-spine-current">{pad(activeIndex + 1)} <small>/ {pad(count)}</small></span></div>
        <div className="sw-spine-dynamic" key={activeProject.id}>
          <p className="sw-spine-category">{activeProject.category}</p>
          <h4 aria-label={activeProject.title}>{activeProject.title.split(' ').map((word, index) => <span className="sw-spine-word" key={`${word}-${index}`} style={{ '--sw-word-delay': `${index * 95}ms` }}><span>{word}</span></span>)}</h4>
          <p className="sw-spine-lead">{activeProject.lead}</p>
          <p className="sw-spine-description">{activeProject.description}</p>
          <div className="sw-spine-tags">{(activeProject.tags || []).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <button className="sw-spine-explore" type="button" onClick={() => onOpen(activeProject)}>VIEW PROJECT <ArrowUpRight size={17} /></button>
        </div>
        <p className="sw-spine-scroll-hint"><ArrowDown size={15} /> SCROLL TO ROTATE THE SPINE</p>
      </div>

      <div className="sw-spine-static-label">PROJECTS / {pad(count)} — EXPLORE EACH ONE</div>
      <div className="sw-spine-scene" aria-label="Project previews">
        {projects.map((project, index) => <div
          className={`sw-spine-card sw-theme-${project.theme || 'default'}${activeIndex === index ? ' is-current' : ''}`}
          key={project.id}
          ref={(node) => { cardsRef.current[index] = node; }}
          style={staticMode ? undefined : { opacity: index === 0 ? 1 : .05, zIndex: count - index, pointerEvents: index === 0 ? 'auto' : 'none' }}
        >
          <button type="button" className="sw-spine-card-surface" onClick={() => onOpen(project)} onPointerMove={pointerTilt} onPointerLeave={resetTilt} tabIndex={staticMode || activeIndex === index ? 0 : -1} aria-label={`Open ${project.title} project`} aria-hidden={!staticMode && activeIndex !== index ? true : undefined}>
            <span className="sw-spine-card-image">
              {project.media?.type === 'concept' ? <div className="sw-spine-art-concept" aria-hidden="true"><i /><i /><i /><span>CREATIVE AUTOMATION</span></div> : <img src={project.media?.src || project.media?.images?.[0]} alt="" loading="lazy" decoding="async" draggable="false" />}
            </span>
            <span className="sw-spine-card-top"><span>{pad(index + 1)} / {pad(count)}</span><ArrowUpRight size={17} /></span>
            <span className="sw-spine-card-bottom"><small>PROJECT FILE / {project.group?.toUpperCase()}</small><strong>{project.title}</strong></span>
          </button>
        </div>)}
      </div>

      <div className="sw-spine-navigation" aria-label="Navigate the project spiral">
        <div className="sw-spine-progress"><span /></div>
        <div className="sw-spine-steps" role="group" aria-label="Choose a project">
          {projects.map((project, index) => <button type="button" key={project.id} className={index === activeIndex ? 'is-active' : ''} onClick={() => goTo(index)} aria-current={index === activeIndex ? 'step' : undefined} aria-label={`Go to ${project.title}`} />)}
        </div>
        <div className="sw-spine-arrows"><button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous project"><ArrowLeft size={18} /></button><button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === count - 1} aria-label="Next project"><ArrowRight size={18} /></button></div>
      </div>
    </div>
  </div>;
}
