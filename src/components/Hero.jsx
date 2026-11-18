import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, MoveDown } from 'lucide-react';
import Universe from './Universe.jsx';
import { portfolio } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const journeyRef = useRef(null);
  const progressRef = useRef(0);

  const navigate = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy-line', { y: 42, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.11, duration: 0.92, delay: 0.15, ease: 'power3.out' });
      gsap.fromTo('.hero-meta-reveal', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.11, duration: 0.68, delay: 0.65, ease: 'power3.out' });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: journeyRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate(self) {
            progressRef.current = self.progress;
            document.body.classList.toggle('in-dark-hero', self.progress > 0.49);
          },
        },
      });
      tl.to('.hero-intro', { opacity: 0, y: -88, duration: 0.33 }, 0.12)
        .to('.hero-bottom', { opacity: 0, y: 25, duration: 0.24 }, 0.15)
        .to('.hero-sticky', { backgroundColor: '#111016', duration: 0.4 }, 0.36)
        .to('.scene-wrap', { xPercent: -26, scale: 1.18, duration: 0.47 }, 0.3)
        .to('.scene-wrap', { opacity: 0.24, duration: 0.27 }, 0.66)
        .fromTo('.hero-reveal', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.27 }, 0.71)
        .fromTo('.portrait-shell', { opacity: 0, y: 75, rotate: 5 }, { opacity: 1, y: 0, rotate: -3, duration: 0.28 }, 0.72);
    }, journeyRef);

    return () => {
      ctx.revert();
      progressRef.current = 0;
      document.body.classList.remove('in-dark-hero');
    };
  }, []);

  return (
    <section ref={journeyRef} className="hero-journey" id="top" aria-label="Introduction">
      <div className="hero-sticky">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-corner-note">PORTFOLIO / 2026</div>
        <div className="hero-intro">
          <div className="eyebrow hero-meta-reveal"><span className="online-dot" /> {portfolio.position}</div>
          <h1 className="hero-heading" aria-label="I build digital experiences that think.">
            <span className="hero-copy-line">I build digital</span>
            <span className="hero-copy-line serif-accent">experiences</span>
            <span className="hero-copy-line">that <em>think.</em></span>
          </h1>
          <p className="hero-description hero-meta-reveal">I'm {portfolio.firstName}, a full-stack developer and AI automation engineer turning ambitious ideas into thoughtful digital products.</p>
          <div className="hero-actions hero-meta-reveal">
            <a href="#work" className="button-primary">Explore my work <ArrowUpRight size={17} strokeWidth={1.7}/></a>
            <a href="#about" className="button-text">More about me <ArrowDownRight size={17}/></a>
          </div>
        </div>
        <div className="scene-wrap">
          <div className="scene-ambient" aria-hidden="true" />
          <Universe progressRef={progressRef} onNavigate={navigate}/>
        </div>
        <div className="hero-bottom">
          <span><span className="mini-cross">✳</span> BASED IN YAOUNDÉ, CAMEROON</span>
          <span className="scroll-indicator"><MoveDown size={14}/> SCROLL TO EXPLORE</span>
          <span>DESIGN × ENGINEERING × INTELLIGENCE</span>
        </div>
        <div className="hero-reveal" aria-label="Personal introduction">
          <div className="reveal-copy">
            <div className="eyebrow reveal-eyebrow">THE HUMAN BEHIND THE SYSTEMS — 001</div>
            <h2>Technology is what I build.<br/><em>Curiosity</em> is how I think.</h2>
            <p>I work at the intersection of software engineering, intelligent automation and creative experimentation.</p>
            <a className="reveal-link" href="#about">Get to know me <ArrowUpRight size={18}/></a>
          </div>
          <div className={`portrait-shell ${portfolio.portrait ? 'has-portrait' : ''}`}>
            {portfolio.portrait ? (
              <img src={portfolio.portrait} alt="Artistic portrait of Paul Kevin Omgba" />
            ) : (
              <div className="portrait-placeholder">
                <div className="portrait-orb" aria-hidden="true"/>
                <span>PORTRAIT / COMING SOON</span>
                <strong>THE PERSON<br/>BEHIND THE CODE.</strong>
              </div>
            )}
            <span className="portrait-caption">PAUL KEVIN OMGBA — CREATIVE SOFTWARE ENGINEER</span>
          </div>
        </div>
        <div className="reveal-bottom-note">SCROLL TO DISCOVER SELECTED WORK ↓</div>
      </div>
    </section>
  );
}
