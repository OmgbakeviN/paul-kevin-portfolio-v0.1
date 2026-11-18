/**
 * SELECTED WORK — V0.3.1
 *
 * Une seule source de données pour les réalisations à la une et les archives.
 * featured: true = grande carte immersive, false = galerie filtrable.
 * group: 'fullstack' | 'frontend' | 'automation' (filtres automatiques).
 * Ajoute une entrée au tableau pour afficher un nouveau projet.
 *
 * Formats visuels disponibles :
 * - { type: 'phones', images: ['/images/...', '/images/...'] }
 * - { type: 'browser', src: '/images/...' }
 * - { type: 'image', src: '/images/...' }
 * - { type: 'video', src: '/videos/...', poster: '/images/...' }
 * - { type: 'concept' } (visuel abstrait CSS, sans prétendre être une capture)
 * gallery: ['/images/...'] permet plusieurs images dans la fenêtre de détail.
 *
 * Mets les médias dans public/, puis utilise des chemins qui commencent par /.
 * Tous les champs `links` sont facultatifs ; aucune fausse URL n'est affichée.
 */
export const selectedProjects = [
  {
    id: 'mboa-flix',
    featured: true,
    group: 'frontend',
    title: 'MBOA FLIX',
    category: 'MOBILE APP / CULTURE / STREAMING',
    discipline: 'Mobile development · Digital culture',
    lead: 'Stories deserve a bigger stage.',
    description:
      'A mobile streaming and cultural discovery experience dedicated to the stories, films and traditions of Cameroon.',
    tags: ['React Native', 'Mobile UI', 'Streaming', 'Culture'],
    highlights: [
      'Film and video discovery presented in a mobile-first interface.',
      'A dedicated space for Cameroonian culture and traditions.',
      'Editorial collections, categories and detailed content cards.',
    ],
    layout: 'featured',
    theme: 'mboa',
    media: {
      type: 'phones',
      images: [
        '/images/projects/mboa-flix-home.webp',
        '/images/projects/mboa-flix-culture.webp',
      ],
      alt: 'Screens from the MBOA FLIX mobile application',
    },
    links: {},
  },
  {
    id: 'pomera',
    featured: true,
    group: 'frontend',
    title: 'POMERA',
    category: 'CREATIVE CODING / INTERACTIVE 3D',
    discipline: 'Creative development · Art direction',
    lead: 'A little more dimension.',
    description:
      'An expressive, fruit-inspired web experience combining 3D modeling, typography and interactive front-end design.',
    tags: ['React', 'Three.js', 'Blender', '3D'],
    highlights: [
      'A custom 3D apple created for a playful brand universe.',
      'Editorial typography and visual storytelling.',
      'Interactive motion and responsive React implementation.',
    ],
    layout: 'standard',
    theme: 'pomera',
    media: {
      type: 'browser',
      src: '/images/projects/pomera.webp',
      alt: 'POMERA 3D website with a red apple and editorial typography',
    },
    links: { live: 'https://pomera-neon.vercel.app/' },
  },
  {
    id: 'shorty',
    featured: true,
    group: 'fullstack',
    title: 'SHORTY',
    category: 'WEB APPLICATION / LINK ANALYTICS',
    discipline: 'Full-stack development · Productivity',
    lead: 'Short links. Useful insights.',
    description:
      'A Django-based URL shortener that creates compact links and records click statistics for clearer link performance tracking.',
    tags: ['Django', 'Python', 'Analytics', 'Web App'],
    highlights: [
      'Create short links from longer URLs.',
      'Record click activity and basic visit statistics.',
      'A simple, focused dashboard and account flow.',
    ],
    layout: 'standard',
    theme: 'shorty',
    media: {
      type: 'browser',
      src: '/images/projects/shorty.webp',
      alt: 'Shorty Django URL shortener and click analytics homepage',
    },
    gallery: [
      '/images/projects/janus-analytics.webp',
      '/images/projects/janus-dashboard.webp',
    ],
    // Le code source et le site sont référencés « Janus » dans l'ancien portfolio.
    links: {
      live: 'https://janus-oibd.onrender.com',
      source: 'https://github.com/OmgbakeviN/janus/tree/main',
    },
  },
  {
    id: 'signum-qr',
    featured: false,
    group: 'fullstack',
    title: 'SIGNUM QR',
    category: 'FULL-STACK / QR ANALYTICS',
    discipline: 'Web application · Tracking',
    lead: 'One scan. More possibilities.',
    description: 'A web platform to generate QR codes and track their usage through a connected back end.',
    tags: ['React', 'Django', 'DRF', 'PostgreSQL'],
    highlights: [
      'QR code creation through a dedicated web interface.',
      'Usage tracking and reporting for generated codes.',
      'React frontend connected to Django REST Framework and PostgreSQL.',
    ],
    theme: 'signum',
    media: {
      type: 'browser',
      src: '/images/projects/signum-cover.webp',
      alt: 'Signum QR code generator interface',
    },
    gallery: ['/images/projects/signum-screen-01.webp', '/images/projects/signum-screen-02.webp'],
    links: {
      live: 'https://qr-generator-xqfr.onrender.com',
      source: 'https://github.com/OmgbakeviN/qr-generator/tree/main',
    },
  },
  {
    id: 'feicom-monitor',
    featured: false,
    group: 'frontend',
    title: 'FEICOM MONITOR',
    category: 'FRONTEND / MONITORING DASHBOARD',
    discipline: 'Dashboard · Project monitoring',
    lead: 'Complex information, made clear.',
    description: 'A React interface for monitoring projects, reviewing progress indicators and navigating reporting dashboards.',
    tags: ['React', 'Dashboards', 'UI', 'Reporting'],
    highlights: [
      'Project lists with filters and a structured dashboard experience.',
      'Reporting and validation views in a clear user interface.',
      'Frontend built around reusable components and distinct user views.',
    ],
    theme: 'feicom',
    media: {
      type: 'browser',
      src: '/images/projects/feicom-cover.webp',
      alt: 'FEICOM Monitor dashboard with charts and project information',
    },
    gallery: ['/images/projects/feicom-screen-01.webp', '/images/projects/feicom-screen-02.webp'],
    links: {
      live: 'https://react-context-ten-mu.vercel.app/',
      source: 'https://github.com/OmgbakeviN/react-context',
    },
  },
  {
    id: 'seedflow',
    featured: false,
    group: 'fullstack',
    title: 'SEEDFLOW',
    category: 'FULL-STACK / PROJECT FUNDING',
    discipline: 'Web platform · Entrepreneurship',
    lead: 'Give good ideas room to grow.',
    description: 'A web platform where entrepreneurs can present their projects and explore opportunities for financial support.',
    tags: ['React', 'Django', 'DRF', 'PostgreSQL'],
    highlights: [
      'Public project discovery and detailed project pages.',
      'Project proposals with funding targets and information.',
      'End-to-end application built with React, Django and PostgreSQL.',
    ],
    theme: 'seedflow',
    media: {
      type: 'browser',
      src: '/images/projects/seedflow-cover.webp',
      alt: 'SeedFlow grid of entrepreneurship projects and funding goals',
    },
    gallery: ['/images/projects/seedflow-screen-02.webp'],
    links: {
      live: 'https://seedflow.onrender.com',
      source: 'https://github.com/OmgbakeviN/SeedFlow',
    },
  },
  {
    id: 'omgba-flix-web',
    featured: false,
    group: 'frontend',
    title: 'OMGBA FLIX',
    category: 'FRONTEND / FILM DISCOVERY',
    discipline: 'Web application · API integration',
    lead: 'A whole world of stories to explore.',
    description: 'A React movie-discovery website that presents film information retrieved from an external API. A separate project from the MBOA FLIX mobile app.',
    tags: ['React', 'REST API', 'Movie Discovery'],
    highlights: [
      'Movie catalog interface powered by an external films API.',
      'Browsing and discovery experience built with React.',
      'Dedicated web concept, distinct from the MBOA FLIX mobile experience.',
    ],
    theme: 'omgbaflix',
    media: {
      type: 'browser',
      src: '/images/projects/omgbaflix-cover.webp',
      alt: 'Omgba Flix movie discovery web interface',
    },
    gallery: [
      '/images/projects/omgbaflix-screen-01.webp',
      '/images/projects/omgbaflix-screen-02.webp',
      '/images/projects/omgbaflix-screen-03.webp',
    ],
    links: {
      live: 'https://omgba-flix.vercel.app',
      source: 'https://github.com/OmgbakeviN/omgba-flix',
    },
  },
  {
    id: 'cogit-business-agent',
    featured: false,
    group: 'automation',
    title: 'COGIT BUSINESS',
    category: 'AI AUTOMATION / WHATSAPP CRM',
    discipline: 'Client project · Customer communication',
    lead: 'Conversations, connected to workflows.',
    description: 'A WhatsApp CRM agent developed for Cogit Business in Côte d’Ivoire to support customer relationship management.',
    tags: ['WhatsApp', 'CRM', 'Automation', 'n8n'],
    highlights: [
      'WhatsApp-based agent focused on customer relationship workflows.',
      'Automation work across conversational tools and business processes.',
      'Private client project — an abstract visual is shown instead of a product screenshot.',
    ],
    theme: 'cogit',
    media: { type: 'concept', label: 'CONVERSATIONS / WORKFLOWS' },
    links: {},
  },
  {
    id: 'bewise-parents-agent',
    featured: false,
    group: 'automation',
    title: 'BE WISE INNOVATION',
    category: 'AI AUTOMATION / COMMUNICATION',
    discipline: 'Client project · Parent communication',
    lead: 'Better communication, less friction.',
    description: 'A WhatsApp automation agent supporting communication and management involving parents at Be Wise Innovation.',
    tags: ['WhatsApp', 'AI Agents', 'Workflows'],
    highlights: [
      'Agent to help organize parent-focused communication.',
      'Conversational workflow design for administrative exchanges.',
      'Private project — concept artwork only, with no client data shown.',
    ],
    theme: 'bewise',
    media: { type: 'concept', label: 'PEOPLE / COMMUNICATION' },
    links: {},
  },
  {
    id: 'smartsana-academy-bot',
    featured: false,
    group: 'automation',
    title: 'SMARTSANA ACADEMY',
    category: 'AI AUTOMATION / GROUP MANAGEMENT',
    discipline: 'Client project · WhatsApp automation',
    lead: 'Useful systems, quietly at work.',
    description: 'A WhatsApp group-management bot built for SMARTSANA Academy as part of software development and automation work.',
    tags: ['WhatsApp', 'Bots', 'Automation', 'React', 'Django'],
    highlights: [
      'WhatsApp bot designed around group-management tasks.',
      'Broader academy work included React and Django application features.',
      'Private project — representative artwork is intentionally abstract.',
    ],
    theme: 'smartsana',
    media: { type: 'concept', label: 'GROUPS / AUTOMATION' },
    links: {},
  },
];
