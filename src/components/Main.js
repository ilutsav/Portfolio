import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ContactForm from "./widgets/ContactForm";
import SocialLinks from "./widgets/SocialLink";



const MainForm = () => {

      const [activeTab, setActiveTab] = useState("about");
    
      // Create refs for each section
      const aboutRef = useRef(null);
      const skillsRef = useRef(null);
      const projectsRef = useRef(null);
      const contactRef = useRef(null);
      const home = useRef(null);
    
      // Function to scroll to section
      const scrollToSection = (section) => {
        setActiveTab(section);
    
        let ref;
        switch (section) {
          case "home":
            ref = home;
            break;
          case "about":
            ref = aboutRef;
            break;
          case "skills":
            ref = skillsRef;
            break;
          case "projects":
            ref = projectsRef;
            break;
          case "contact":
            ref = contactRef;
            break;
          default:
            ref = aboutRef;
        }
    
        // Smooth scroll to the section
        ref.current.scrollIntoView({ behavior: "smooth" });
      };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
          {/* Navigation Bar */}
          <nav className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                  >
                    DevPortfolio
                  </motion.div>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  {["about", "skills", "projects", "contact"].map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ y: -2 }}
                      className={`capitalize transition-colors ${
                        activeTab === item
                          ? "text-blue-400 border-b-2 border-blue-400"
                          : "text-gray-300 hover:text-blue-300"
                      }`}
                      onClick={() => scrollToSection(item)}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
    
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden py-24"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Utsav Bhattarai
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Crafting modern, responsive, and accessible web experiences with
                  cutting-edge technologies.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                </motion.button>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDB2Nmg2di02aC02em0wLTEydjZoNnYtNmgtNnptLTEyIDB2Nmg2di02aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
          </motion.div>
    
          {/* About Section */}
          <motion.section
            ref={aboutRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16 bg-gray-800/30"
            id="about"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2">
                  <motion.h2
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-6 inline-block border-b-2 border-blue-400 pb-1"
                  >
                    About Me
                  </motion.h2>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-gray-300 mb-4">
                      Hi, I’m Utsav Bhattarai, a Flutter and Web Developer
                      passionate about crafting high-quality mobile and web
                      applications. I have extensive experience in Flutter, working
                      with state management solutions like Provider and GetX,
                      database handling with Drift and Shared Preferences, and API
                      integrations using Dio and GetIt. My work includes building
                      and maintaining QuickSamachar, a feature-rich news app
                      integrating polls, horoscopes, short videos, and bookmarking.
                    </p>
                    <p className="text-gray-300 mb-6">
                      In addition to mobile development, I’m expanding my expertise
                      in web development, focusing on React and JavaScript to create
                      fast, responsive, and user-friendly web applications. I enjoy
                      working with modern front-end technologies and continuously
                      improving my skills to stay up-to-date with industry trends.
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="mr-2 text-blue-400">▹</span>
                        <span>Full-stack Development</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-blue-400">▹</span>
                        <span>Responsive Design</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-blue-400">▹</span>
                        <span>UI/UX Implementation</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-10 lg:mt-0 lg:w-5/12"
                >
                  <div className="relative mx-auto w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-xl shadow-blue-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
                    <div className="flex items-center justify-center h-full">
                      <img
                        src="/utsav.jpeg" // Replace with your actual image path
                        alt="Utsav Bhattarai"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
    
          {/* Skills Section */}
          <motion.section
            ref={skillsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16"
            id="skills"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-12 text-center inline-block border-b-2 border-blue-400 pb-1"
              >
                Skills & Expertise
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: "Flutter", level: 95 },
                  { name: "React", level: 80 },
                  { name: "JavaScript", level: 85 },
                  { name: "TypeScript", level: 70 },
                  { name: "Tailwind CSS", level: 65 },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.3)",
                    }}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
                  >
                    <h3 className="font-semibold mb-3 text-lg">{skill.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                    <div className="mt-2 text-right text-sm text-gray-400">
                      {skill.level}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
    
          {/* Projects Section */}
          <motion.section
            ref={projectsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16 bg-gray-800/30"
            id="projects"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-12 text-center inline-block border-b-2 border-blue-400 pb-1"
              >
                Featured Projects
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Quick Samachar",
                    description:
                      "Quick Samachar is a feature-rich news app that delivers the latest updates with a seamless user experience. It includes polls, horoscopes, short videos, and a bookmarking feature, making it an all-in-one platform for staying informed.",
                  },
                  { name: "Medha App", description: "Medha is a comprehensive school management system designed to streamline academic and administrative operations. It provides features like student enrollment, attendance tracking, fee management, exam scheduling, and communication tools, making school management more efficient and organized." },
                  { name: "QuickXtract", description: "Quick Xtract is a smart data extraction tool designed to efficiently retrieve and process information from various sources. It helps automate data collection, analysis, and organization, making workflows faster and more accurate." },
                ].map((project) => (
                  <motion.div
                    key={project}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: project * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                      <div className="text-5xl">🚀</div>
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-gray-400 mb-4">
                       {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          React
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          Node.js
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          Tailwind
                        </span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-700 flex justify-between">
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        View Live
                      </a>
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Source Code
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-800 text-blue-400 font-semibold rounded-lg border border-blue-400/30 hover:bg-blue-400/10 transition-all duration-300"
                >
                  View All Projects
                </motion.button>
              </div>
            </div>
          </motion.section>
    
          {/* Contact Section */}
          <motion.section
            ref={contactRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16"
            id="contact"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 text-center inline-block border-b-2 border-blue-400 pb-1"
              >
                Get In Touch
              </motion.h2>
            
              <ContactForm />
    <SocialLinks />
    
            </div>
          </motion.section>
    
          {/* Footer */}
          <footer className="py-8 bg-gray-900 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 mb-4 md:mb-0">
                  © {new Date().getFullYear()} DevPortfolio. All rights reserved.
                </div>
                <div className="flex space-x-6">
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("projects");
                    }}
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                  >
                    Contact
                  </a>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Made with React & Tailwind CSS
              </div>
            </div>
          </footer>
        </div>
      );

    
}

export default MainForm;