import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ContactForm from "./widgets/ContactForm";
import SocialLinks from "./widgets/SocialLink";
import utsav from "../assets/images/utsav.jpeg";
import { colorTheme } from '../theme.js';
import Home from "./widgets/Home.js";

const MainForm = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Projects data
  const data = [
    { name: "Quick Samachar", tags: ["Flutter", "Provider", "Firebase", "REST API"] },
    { name: "Medha App", tags: ["Flutter", "BLoC", "Firebase", "Cloud Firestore"] },
    { name: "QuickXtract", tags: ["React", "Django"] },
  ];

  // Get scroll position
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Update navbar background on scroll
    setIsScrolled(latest > 50);
    
    // Find the active section based on scroll position
    const sections = [
      { id: "home", ref: homeRef },
      { id: "about", ref: aboutRef },
      { id: "skills", ref: skillsRef },
      { id: "projects", ref: projectsRef },
      { id: "contact", ref: contactRef }
    ];
    
    // Get the positions of all sections and determine which one is in view
    const currentSection = sections.reduce((active, section) => {
      if (!section.ref.current) return active;
      
      const rect = section.ref.current.getBoundingClientRect();
      // Section is considered active if its top is within viewport or if it's the first section and we're at the top
      const isInView = (rect.top <= 150 && rect.bottom >= 150) || 
                        (section.id === "home" && rect.top > -rect.height/2);
      
      return isInView ? section.id : active;
    }, activeSection);
    
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
      setActiveTab(currentSection);
    }
  });

  // Scroll to section function
  const scrollToSection = (section) => {
    setActiveTab(section);
    setIsMobileMenuOpen(false);
    
    let ref;
    switch (section) {
        case "home": ref = homeRef; break;
        case "about": ref = aboutRef; break;
        case "skills": ref = skillsRef; break;
        case "projects": ref = projectsRef; break;
        case "contact": ref = contactRef; break;
        default: ref = homeRef;
    }
    
    if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`min-h-screen ${colorTheme.bgGradient} ${colorTheme.textBody} font-sans`}>
      {/* Enhanced Navigation Bar with scroll-aware styling */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? `backdrop-blur-lg shadow-md ${colorTheme.bgNavbar} border-b ${colorTheme.borderStandard}` 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6 }}
                className={`text-xl font-bold text-transparent bg-clip-text ${colorTheme.gradientAccentText} cursor-pointer`}
                onClick={() => scrollToSection("home")}
              >
                DevPortfolio
              </motion.div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                  className={`capitalize transition-colors text-sm font-medium px-1 py-2 ${
                    activeTab === item
                      ? `${colorTheme.textAccent} border-b-2 ${colorTheme.borderNavActive}` 
                      : `${colorTheme.textSubtle} hover:${colorTheme.textAccentHover}`
                  }`}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled ? colorTheme.textPrimary : colorTheme.textAccent}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${colorTheme.bgNavbar} border-b ${colorTheme.borderStandard}`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium capitalize ${
                    activeTab === item
                    ? `${colorTheme.bgAccentLight} ${colorTheme.textAccent}`
                    : `${colorTheme.textSubtle} hover:${colorTheme.bgAccentLight} hover:${colorTheme.textAccentHover}`
                  }`}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <Home 
        scrollToSection={scrollToSection} 
        colorTheme={colorTheme} 
        ref={homeRef}
      />
      {/* About Section - Enhanced with intersection animations */}
      <motion.section
        ref={aboutRef} id="about"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`py-20 md:py-28 ${colorTheme.bgSectionAlt}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <motion.h2
                initial={{ x: -50, opacity: 0 }} 
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-3xl font-bold mb-6 ${colorTheme.textPrimary} inline-block border-b-4 ${colorTheme.borderAccent} pb-2`}
              >
                About Me
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${colorTheme.textSecondary} space-y-4`}
              >
                <p>Hi, I'm Utsav Bhattarai, a Flutter and Web Developer passionate about crafting high-quality mobile and web applications. I have extensive experience in Flutter, working with state management solutions like Provider and GetX, database handling with Drift and Shared Preferences, and API integrations using Dio and GetIt. My work includes building and maintaining QuickSamachar, a feature-rich news app integrating polls, horoscopes, short videos, and bookmarking.</p>
                <p>In addition to mobile development, I'm expanding my expertise in web development, focusing on React and JavaScript to create fast, responsive, and user-friendly web applications. I enjoy working with modern front-end technologies and continuously improving my skills to stay up-to-date with industry trends.</p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center">
                    <span className={`mr-2 ${colorTheme.textAccent} text-xl`}>▹</span>
                    <span>Full-stack Development Capabilities</span>
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${colorTheme.textAccent} text-xl`}>▹</span>
                    <span>Responsive & Adaptive Design</span>
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${colorTheme.textAccent} text-xl`}>▹</span>
                    <span>Intuitive UI/UX Implementation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 lg:mt-0 lg:w-5/12 flex justify-center order-1 lg:order-2"
            >
              {/* Enhanced image container with floating animation */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className={`relative mx-auto w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 ${colorTheme.borderAccentLight}/50 ${colorTheme.shadowImage}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100/10 via-transparent to-purple-100/10"></div>
                <img src={utsav} alt="Utsav Bhattarai" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section - Improved layout and responsiveness */}
      <motion.section
        ref={skillsRef} id="skills"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 md:py-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl font-bold mb-12 text-center ${colorTheme.textPrimary}`}
          >
            Skills & Expertise
            <span className={`block w-20 h-1 ${colorTheme.gradientAccentBar} mx-auto mt-2 rounded`}></span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 text-center">
            {[
              { name: "Flutter", level: 95 }, { name: "React", level: 80 },
              { name: "JavaScript", level: 85 }, { name: "TypeScript", level: 70 },
              { name: "Tailwind CSS", level: 65 },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ y: 20, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 15px 30px -10px rgba(100, 116, 139, 0.2)" }}
                className={`${colorTheme.bgCard} rounded-lg p-6 shadow-md border ${colorTheme.borderCard}/80 transition-all duration-300`}
              >
                <h3 className={`font-semibold mb-3 text-lg ${colorTheme.textBody}`}>{skill.name}</h3>
                <div className={`w-full ${colorTheme.bgSkillBarTrack} rounded-full h-2.5`}>
                  <motion.div
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`${colorTheme.gradientAccentBar} h-2.5 rounded-full`}
                  ></motion.div>
                </div>
                <div className={`mt-2 text-right text-sm ${colorTheme.textSubtle}`}>{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section - Enhanced with staggered animations */}
      <motion.section
        ref={projectsRef} id="projects"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`py-20 md:py-28 ${colorTheme.bgSectionAlt}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl font-bold mb-12 text-center ${colorTheme.textPrimary}`}
          >
            Featured Projects
            <span className={`block w-20 h-1 ${colorTheme.gradientAccentBar} mx-auto mt-2 rounded`}></span>
          </motion.h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ y: 50, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(100, 116, 139, 0.25)" }}
                className={`${colorTheme.bgCard} rounded-lg overflow-hidden ${colorTheme.shadowCard} border ${colorTheme.borderCard} flex flex-col transition-all duration-300 ${colorTheme.shadowCardHover}`}
              >
                {/* Improved project card with hover effect */}
                <div className={`h-48 ${colorTheme.bgPlaceholder} flex items-center justify-center relative group overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.span 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-6xl filter grayscale opacity-30 group-hover:opacity-70 transition-all duration-300"
                  >
                    {index === 0 ? '📱' : index === 1 ? '🏫' : '📄'}
                  </motion.span>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className={`text-xl font-semibold mb-2 ${colorTheme.textPrimary}`}>{project.name}</h3>
                  <p className={`${colorTheme.textSubtle} mb-4 text-sm flex-grow`}>
                    {project.name === "Quick Samachar" 
                      ? "A feature-rich Flutter news application with personalized content, interactive polls, and media integration." 
                      : project.name === "Medha App" 
                      ? "An educational platform built with Flutter, providing students with course materials, assessments, and progress tracking."
                      : "A document data extraction tool using React and TensorFlow.js for automated information processing."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto pt-4 border-t border-gray-100">
                    {project.tags.map((tag) => (
                      <span key={tag}
                        className={`px-3 py-1 ${colorTheme.bgTag} ${colorTheme.textTag} rounded-full text-xs font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section - Improved layout */}
      <motion.section
        ref={contactRef} id="contact"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 md:py-28"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl font-bold mb-10 text-center ${colorTheme.textPrimary}`}
          >
            Get In Touch
            <span className={`block w-20 h-1 ${colorTheme.gradientAccentBar} mx-auto mt-2 rounded`}></span>
          </motion.h2>

          <motion.div
            initial={{ y: 30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2}}
            className={`${colorTheme.bgCard} p-6 sm:p-8 rounded-lg ${colorTheme.shadowCard} border ${colorTheme.borderCard}/80 mb-10`}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4}}
          >
            <SocialLinks />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Improved spacing */}
      <footer className={`py-8 ${colorTheme.bgFooter} border-t ${colorTheme.borderStandard}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`${colorTheme.textSubtle} mb-4 md:mb-0 text-sm`}>
              Designed & Built by Utsav Bhattarai ✨
            </div>
            <div className="flex space-x-6">
              {["home","about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  className={`${colorTheme.textSubtle} hover:${colorTheme.textAccentHover} transition-colors text-sm capitalize`}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
       
        </div>
      </footer>
    </div>
  );
};

export default MainForm;
