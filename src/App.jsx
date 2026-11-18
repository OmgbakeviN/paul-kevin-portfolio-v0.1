import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Hero from './components/Hero.jsx';
import SelectedWork from './components/SelectedWork.jsx';
import { portfolio } from './data/portfolio.js';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Paul Kevin Omgba, back to top">PK<span>.</span></a>
    <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
      <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
      <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a>
      <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
    </nav>
    <a className="header-cta" href={`mailto:${portfolio.email}`}>LET'S TALK <ArrowUpRight size={16}/></a>
    <button className="mobile-menu-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(o=>!o)}>
      {menuOpen?<X size={22}/>:<Menu size={22}/>}
    </button>
  </header>;
}

function Expertise() {
  const items=[['01','FULL-STACK DEVELOPMENT','React, Django, APIs and well-structured products.'],['02','AI & AUTOMATION','Intelligent agents, n8n workflows and business integrations.'],['03','MOBILE EXPERIENCES','Cross-platform experiences with React Native.'],['04','CREATIVE TECHNOLOGY','Interactive 3D experiences, motion and experimentation.']];
  return <section className="expertise-section" id="expertise"><div className="section-kicker"><span>002 / EXPERTISE</span><span>WHAT I BRING TO THE TABLE</span></div><h2>Different skills.<br/><em>One mindset.</em></h2><div className="expertise-list">{items.map(([n,t,d])=><div className="expertise-item" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={20}/></div>)}</div></section>;
}

function AboutContact() {
  return <>
    <section id="about" className="about-section"><div className="section-kicker"><span>003 / ABOUT</span><span>MORE THAN A JOB TITLE</span></div><div className="about-layout"><h2>Always <em>building.</em><br/>Always learning.</h2><div className="about-detail"><p>I'm {portfolio.name}, a software developer based in {portfolio.location}. My work connects full-stack development, practical AI automation and creative technology.</p><p>I enjoy building products, exploring new tools, and teaching others how to turn ideas into working software.</p><a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={16}/></a></div></div></section>
    <footer id="contact" className="footer"><div className="footer-meta"><span>004 / NEXT CHAPTER</span><span>HAVE SOMETHING IN MIND?</span></div><a className="footer-headline" href={`mailto:${portfolio.email}`}>Let's build <em>something.</em> <ArrowUpRight size={50} strokeWidth={1}/></a><div className="footer-bottom"><span>© {new Date().getFullYear()} PAUL KEVIN OMGBA</span><div><a href={portfolio.github} target="_blank" rel="noopener noreferrer"><Github size={17}/> GITHUB</a><a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/> LINKEDIN</a><a href={`mailto:${portfolio.email}`}><Mail size={17}/> EMAIL</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
  </>;
}

export default function App() {
  return <><Navigation/><main><Hero/><SelectedWork/><Expertise/><AboutContact/></main></>;
}
