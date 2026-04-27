import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight, X, Moon, Sun } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Ember Craft',
    category: 'Culinary Brand',
    image: '/E1.png',
    secondaryImage: '/E2.png',
    description: 'A complete brand identity and packaging design for Ember Craft, an artisanal culinary brand focusing on smoked and wood-fired delicacies.',
    caseStudy: {
      overview: 'Ember Craft approached us to build a comprehensive brand identity that resonated with their core philosophy: a deep respect for traditional, wood-fired culinary techniques. The visual language blends rustic charm with modern minimalism, creating a cohesive narrative across all touchpoints.',
      services: ['Brand Strategy', 'Visual Identity', 'Packaging Design', 'Art Direction'],
      year: '2023',
    },
    gallery: [
      '/E2.png', '/E3.png', '/E4.png', '/E5.png', '/E6.png', '/E7.png', '/E8.png', '/E9.png', '/E10.jpeg', '/E11.jpeg', '/E12.jpeg', '/E13.jpeg'
    ]
  },
  {
    id: '02',
    title: 'Velora Coffee',
    category: 'Coffee Brand',
    image: '/V1.png',
    secondaryImage: '/V2.png',
    description: 'Velora Coffee required a rebranding that captured their meticulous roasting process.',
    caseStudy: {
      overview: 'Velora Coffee needed a visual refresh that aligned with their meticulous approach to sourcing and roasting. We developed a custom typographic system and a warm, earthy color palette to reflect the organic richness of their product line. The result is a sophisticated identity that stands out in a crowded market.',
      services: ['Logo Design', 'Typography', 'Print Collateral', 'Brand Guidelines'],
      year: '2022',
    },
    gallery: [
      '/V2.png', '/V3.png', '/V4.png', '/V5.png', '/V6.png', '/V7.png', '/V8.png', '/V9.png', '/V10.png', '/V11.jpeg', '/V12.jpeg', '/V13.jpeg', '/V14.jpeg', '/V15.jpeg'
    ]
  },
  {
    id: '03',
    title: 'Dermaé Clinic',
    category: 'Skincare',
    image: '/D1.jpeg',
    secondaryImage: '/D2.jpeg',
    description: 'Clinical but approachable. Dermaé Clinic\'s new visual identity focuses on purity and science.',
    caseStudy: {
      overview: 'To position Dermaé Clinic as a trusted leader in medical skincare, we designed an identity system centered around purity, science, and approachability. Utilizing generous whitespace and precise typography, we crafted a brand experience that instills confidence while feeling inviting and accessible.',
      services: ['Brand Identity', 'Environmental Graphics', 'Digital Design'],
      year: '2023',
    },
    gallery: [
      '/D2.jpeg', '/D3.png', '/D4.png', '/D5.png', '/D6.png', '/D7.png', '/D8.png', '/D9.png', '/D10.png'
    ]
  },
  {
    id: '04',
    title: 'Pulseforge',
    category: 'Fitness Brand',
    image: '/P1.png',
    secondaryImage: '/P2.png',
    description: 'An aggressive yet refined aesthetic for Pulseforge, a high-intensity interval training studio.',
    caseStudy: {
      overview: 'Pulseforge came to us with a vision to disrupt the boutique fitness space. We constructed an aggressive yet refined aesthetic, built around themes of motion, transformation, and industrial raw materials. The bold typography and striking imagery communicate strength and relentless progression.',
      services: ['Brand Identity', 'Apparel Design', 'Creative Direction'],
      year: '2024',
    },
    gallery: [
      '/P2.png', '/P3.png', '/P4.png', '/P5.png', '/P6.png', '/P7.png', '/P8.png', '/P9.png', '/P10.png', '/P11.jpeg', '/P12.jpeg', '/P13.jpeg', '/P14.jpeg', '/P15.jpeg', '/P16.jpeg'
    ]
  },
  {
    id: '05',
    title: 'Sahra Studio',
    category: 'Lifestyle Café',
    image: '/S1.png',
    secondaryImage: '/S2.png',
    description: 'A serene identity for Sahra Studio. We crafted a brand experience that transitions seamlessly from a morning coffee spot to an evening creative space.',
    caseStudy: {
      overview: 'Sahra Studio serves as a sanctuary for creatives—a space that effortlessly shifts from a vibrant morning café to a relaxed evening lounge. We translated this duality into a serene, adaptable identity system characterized by fluid typography and a calming, sun-baked color palette.',
      services: ['Brand Strategy', 'Logo Design', 'Menu & Asset Design'],
      year: '2023',
    },
    gallery: [
      '/S2.png', '/S3.png', '/S4.png', '/S5.png', '/S6.png', '/S7.png', '/S8.png', '/S9.png', '/S10.png', '/S11.png', '/S12.png', '/S13.jpeg', '/S14.jpeg', '/S15.jpeg'
    ]
  },
  {
    id: '06',
    title: 'Vegetables',
    category: 'Food & Organic',
    image: '/VT1.png',
    secondaryImage: '/VT2.png',
    description: 'A fresh and vibrant visual identity emphasizing organic quality and natural appeal.',
    caseStudy: {
      overview: 'This project required an identity that felt inherently connected to nature. We developed a fresh, vibrant visual system that heroes the organic quality of the produce. With clean lines and a lush, earthy color spectrum, the branding brings an elevated, modern touch to the farm-to-table movement.',
      services: ['Visual Identity', 'Packaging Design', 'Illustration'],
      year: '2022',
    },
    gallery: [
      '/VT2.png', '/VT3.png', '/VT4.png', '/VT5.png', '/VT6.png', '/VT7.png', '/VT8.png', '/VT9.png', '/VT10.png', '/VT11.png'
    ]
  },
  {
    id: '07',
    title: 'OTAH Coffee',
    category: 'Coffee Brand',
    image: '/OT1.png',
    secondaryImage: '/OT2.png',
    description: 'A premium visual identity for OTAH Coffee, featuring sleek typography and modern aesthetics.',
    caseStudy: {
      overview: 'OTAH Coffee aims to redefine the premium coffee experience. We crafted a sleek, sophisticated brand identity that relies on confident typography and minimalist layouts. The brand exudes modern elegance, ensuring that the packaging and digital presence match the exceptional quality of the coffee itself.',
      services: ['Visual Identity', 'Packaging', 'Social Media Templates'],
      year: '2024',
    },
    gallery: [
      '/OT2.png', '/OT3.png', '/OT4.png', '/OT5.png', '/OT6.png', '/OT7.png', '/OT8.png', '/OT9.png', '/OT10.png'
    ]
  }
];

const FadeIn = ({ children, delay = 0, className = "", layout = false }: { children: React.ReactNode, delay?: number, className?: string, layout?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
    layout={layout}
  >
    {children}
  </motion.div>
);

function ImageWithSkeleton({ 
  src, 
  alt, 
  className, 
  layoutId, 
  loading,
  variants,
  transition
}: { 
  src: string, 
  alt: string, 
  className?: string, 
  layoutId?: string, 
  loading?: "lazy" | "eager",
  variants?: any,
  transition?: any
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative w-full rounded-[inherit] overflow-hidden bg-[var(--skel-bg)] ${isLoaded ? 'h-full' : 'h-full min-h-[300px]'}`}>
      {/* Skeleton overlay */}
      <div 
        className={`absolute inset-0 bg-[var(--skel-fg)] pointer-events-none transition-opacity duration-500 z-10 
          ${isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
      />
      {layoutId ? (
        <motion.img 
          ref={imgRef}
          layoutId={layoutId}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          variants={variants}
          transition={transition}
        />
      ) : (
        <img 
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    setTimeout(() => {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      
      const subject = encodeURIComponent(`New Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      
      window.location.href = `mailto:Mahmud.moa@outlook.com?subject=${subject}&body=${body}`;
      
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="py-16 px-10 border border-[var(--text-primary)]/10 bg-transparent flex flex-col items-start justify-center max-w-2xl rounded-xl">
        <h3 className="font-serif text-[24px] mb-3 text-[var(--text-primary)]">Thank you.</h3>
        <p className="font-sans text-[14px] leading-[1.6] opacity-70 text-[var(--text-primary)]">Your email client should open shortly. I'll get back to you as soon as possible.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors border-b border-transparent hover:border-[var(--text-primary)]/30 pb-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 max-w-2xl mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4 group">
          <label htmlFor="name" className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)]/50 group-focus-within:text-[var(--text-primary)]/80 transition-colors">Name</label>
          <input required name="name" type="text" id="name" className="pb-3 border-b border-[var(--text-primary)]/15 bg-transparent outline-none focus:border-[var(--text-primary)]/80 transition-colors font-sans text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/20" placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-4 group">
          <label htmlFor="email" className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)]/50 group-focus-within:text-[var(--text-primary)]/80 transition-colors">Email</label>
          <input required name="email" type="email" id="email" className="pb-3 border-b border-[var(--text-primary)]/15 bg-transparent outline-none focus:border-[var(--text-primary)]/80 transition-colors font-sans text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/20" placeholder="hello@example.com" />
        </div>
      </div>
      <div className="flex flex-col gap-4 group">
        <label htmlFor="message" className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)]/50 group-focus-within:text-[var(--text-primary)]/80 transition-colors">Message</label>
        <textarea required name="message" id="message" rows={4} className="pb-3 border-b border-[var(--text-primary)]/15 bg-transparent outline-none focus:border-[var(--text-primary)]/80 transition-colors font-sans text-[16px] text-[var(--text-primary)] resize-none placeholder:text-[var(--text-primary)]/20 leading-[1.6]" placeholder="Tell me about your project..."></textarea>
      </div>
      <button type="submit" disabled={status === 'submitting'} className="self-start group inline-flex items-center justify-center gap-3 bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 rounded-lg font-sans font-medium text-[14px] hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100">
        {status === 'submitting' ? 'Preparing...' : 'Send Message'} <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
      </button>
    </form>
  );
}

export default function App() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsNavHidden(true);
    } else {
      setIsNavHidden(false);
    }
  });

  useEffect(() => {
    if (expandedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [expandedProjectId]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] overflow-hidden">
      {/* Global subtle noise texture */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] mix-blend-overlay" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
      
      {/* iOS Glass Navigation */}
      <motion.nav 
        variants={{
          visible: { y: 0, x: "-50%" },
          hidden: { y: "-150%", x: "-50%" }
        }}
        initial="visible"
        animate={isNavHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 z-[100] px-6 sm:px-10 py-5 rounded-full backdrop-blur-2xl bg-[var(--bg-primary)]/80 border border-[var(--text-primary)]/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-[calc(100%-3rem)] max-w-[1600px] flex justify-between items-center text-[var(--text-primary)]">
        <div className="font-sans text-[10px] sm:text-[12px] font-bold tracking-[0.15em] uppercase">
          Mahmoud Mohammedomer <span className="opacity-50 font-medium ml-2">Graphic Designer</span>
        </div>
        <div className="flex items-center gap-6 sm:gap-8">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 -mr-2 rounded-full hover:bg-[var(--text-primary)]/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a href="#work" className="font-sans text-[10px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase hover:opacity-70 transition-opacity">Work</a>
          <a href="#contact" className="font-sans text-[10px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-[90vh] md:min-h-screen flex flex-col justify-end p-6 md:p-12 pt-40 md:pt-48 pb-24 md:pb-32">
          <div className="max-w-[1600px] mx-auto w-full">
            <FadeIn>
              <h1 className="font-serif text-[clamp(40px,8vw,160px)] leading-[0.9] tracking-[-0.02em] text-[var(--text-primary)] mb-12 md:mb-24">
                Visualizing <br /> Strong Brands.
              </h1>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 font-sans mt-auto">
              <FadeIn delay={0.2} className="md:col-span-5 lg:col-span-4">
                 <p className="text-[16px] md:text-[20px] leading-[1.6] opacity-80 text-[var(--text-primary)]">
                   I'm a Graphic Designer specializing in branding & visual identity. Designing minimal, professional, and distinctive experiences.
                 </p>
              </FadeIn>
              
              <FadeIn delay={0.3} className="md:col-start-7 md:col-span-3">
                <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-[var(--text-accent)]">Core Expertise</div>
                <ul className="text-[14px] leading-[2] opacity-80 text-[var(--text-primary)] list-none space-y-1">
                  <li>Brand Identity &amp; Visual Consistency</li>
                  <li>Social Media Content Design</li>
                  <li>Layout, Typography &amp; Hierarchy</li>
                  <li>Premium Aesthetic Execution</li>
                </ul>
              </FadeIn>

              <FadeIn delay={0.4} className="md:col-start-10 md:col-span-3">
                <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-[var(--text-accent)]">Connect</div>
                <ul className="text-[14px] leading-[2] opacity-80 text-[var(--text-primary)] list-none space-y-1">
                  <li><a href="mailto:Mahmud.moa@outlook.com" className="hover:opacity-70 transition-opacity">Mahmud.moa@outlook.com</a></li>
                  <li><a href="tel:+97433289099" className="hover:opacity-70 transition-opacity">+974-3328-9099</a></li>
                  <li>Doha, Qatar</li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Selected Works Section */}
        <section id="work" className="p-6 md:p-12 w-full max-w-[1600px] mx-auto overflow-hidden">
          <FadeIn>
            <div className="flex justify-between items-end mb-16 pb-8 border-b border-[var(--text-primary)]/10">
              <h2 className="font-serif text-[42px] leading-[1.1] text-[var(--text-primary)]">Projects</h2>
              <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)] opacity-50">01—08</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24 mt-16">
            {projects.map((project) => {
              return (
                <FadeIn key={project.id} delay={0.1}>
                  <motion.div 
                    layoutId={`card-${project.id}`}
                    onClick={() => setExpandedProjectId(project.id)}
                    className="group flex flex-col cursor-pointer"
                    initial="idle"
                    whileHover="hover"
                  >
                    <div className="relative aspect-[4/5] bg-[var(--text-primary)]/5 backdrop-blur-lg border border-[var(--text-primary)]/10 shadow-[0_12px_44px_rgba(0,0,0,0.5)] mb-6 rounded-2xl overflow-hidden p-0">
                      <ImageWithSkeleton
                        layoutId={`image-${project.id}`}
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover origin-center rounded-2xl"
                        variants={{
                          idle: { scale: 1 },
                          hover: { scale: 1.04 }
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between items-baseline group-hover:-translate-y-1 transition-transform duration-300">
                      <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-[24px] m-0 font-normal text-[var(--text-primary)] group-hover:opacity-90 transition-opacity">
                        {project.title}
                      </motion.h3>
                      <motion.span layoutId={`category-${project.id}`} className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-accent)]">
                        {project.category}
                      </motion.span>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Contact/Let's create together */}
        <section id="contact" className="mt-32 p-6 md:p-12 max-w-[1600px] mx-auto w-full">
          <div className="border-t border-[var(--text-primary)]/10 pt-16 md:pt-32 flex flex-col lg:flex-row justify-between items-start gap-16">
            <FadeIn>
              <h2 className="font-serif text-[clamp(32px,5vw,80px)] leading-[1] text-[var(--text-primary)] max-w-lg">
                Let's Create <br/>Something Great.
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2} className="w-full max-w-xl">
              <ContactForm />
            </FadeIn>
          </div>

          <div className="mt-40 pt-8 border-t border-[var(--text-primary)]/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--text-primary)]/50">
            <span>© {new Date().getFullYear()} Mahmoud Mohammedomer.</span>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Back to top</a>
          </div>
        </section>
      </main>

      {/* Project Expansion Overlay */}
      <AnimatePresence>
        {expandedProjectId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/90 backdrop-blur-3xl overflow-y-auto"
          >
            <div className="max-w-[1600px] mx-auto w-full p-6 sm:p-8 lg:p-12 min-h-screen flex flex-col items-center">
              <button 
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[101] flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-2xl bg-[var(--bg-primary)]/80 border border-[var(--text-primary)]/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-[var(--skel-bg)] transition-all text-[var(--text-primary)]"
                onClick={() => setExpandedProjectId(null)}
              >
                <span className="font-sans text-[10px] uppercase font-bold tracking-[0.1em]">Close</span>
                <X className="w-4 h-4" />
              </button>

              {(() => {
                const project = projects.find(p => p.id === expandedProjectId)!;
                // Use custom gallery or fallback to project.secondaryImage
                const galleryImages = ('gallery' in project && Array.isArray(project.gallery)) 
                  ? project.gallery 
                  : (project.secondaryImage ? [project.secondaryImage] : []);

                return (
                  <motion.div layoutId={`card-${project.id}`} className="flex flex-col mt-20 md:mt-24 w-full flex-1 max-w-[1200px]">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
                      <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-[clamp(40px,6vw,120px)] leading-[1] m-0 font-normal text-[var(--text-primary)]">
                        {project.title}
                      </motion.h3>
                      <motion.span layoutId={`category-${project.id}`} className="font-sans text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.2em] text-[var(--text-accent)] mt-4 md:mt-0">
                        {project.category}
                      </motion.span>
                    </div>

                    <div className="w-full relative aspect-[4/3] lg:aspect-[21/9] bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-3xl mb-16 md:mb-24 overflow-hidden">
                      <ImageWithSkeleton 
                        layoutId={`image-${project.id}`}
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="w-full flex flex-col gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-16 md:gap-32"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 w-full py-16 border-y border-[var(--text-primary)]/10 mt-8 mb-16">
                          <div className="md:col-span-3">
                            <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--text-accent)] mb-4">Overview</h4>
                            <p className="font-serif text-[20px] md:text-[28px] leading-[1.6] text-[var(--text-primary)] opacity-90 max-w-4xl">
                              {project.caseStudy?.overview || project.description}
                            </p>
                          </div>
                          <div className="flex flex-col gap-10 md:pt-2 border-t border-[var(--text-primary)]/10 md:border-none pt-8">
                            <div>
                               <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--text-accent)] mb-4">Services</h4>
                               <ul className="font-sans text-[14px] leading-[1.8] text-[var(--text-primary)] opacity-80 list-none space-y-1">
                                 {project.caseStudy?.services.map(s => <li key={s}>{s}</li>)}
                               </ul>
                            </div>
                            <div>
                               <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--text-accent)] mb-4">Year</h4>
                               <p className="font-sans text-[14px] leading-[1.6] text-[var(--text-primary)] opacity-80">{project.caseStudy?.year}</p>
                            </div>
                          </div>
                        </div>

                        {galleryImages.length > 0 && (
                          <div className="columns-1 md:columns-2 gap-4 md:gap-6 mb-24 space-y-4 md:space-y-6">
                            {galleryImages.map((img, idx) => (
                              <div key={idx} className="break-inside-avoid w-full bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl group overflow-hidden flex items-center justify-center p-0">
                                <ImageWithSkeleton 
                                  src={img} 
                                  alt={`${project.title} gallery detail ${idx + 1}`}
                                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
