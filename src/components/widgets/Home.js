import React, {forwardRef} from "react";
import { motion } from "framer-motion";


const Home = forwardRef(({ scrollToSection, colorTheme }, ref) => {
    // Animation variants for staggered animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 1,
          staggerChildren: 0.2
        }
      }
    };
    
    const itemVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };
  
    // Handle click anywhere on the section
    const handleSectionClick = (e) => {
      // Only navigate if clicking directly on the background, not on buttons or content
      if (e.target === e.currentTarget) {
        scrollToSection("about");
      }
    };
  
    return (
      <motion.div
        ref={ref} // This is where we properly attach the forwarded ref
        id="home"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 cursor-pointer"
        onClick={handleSectionClick}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-6xl font-bold mb-4 ${colorTheme.textPrimary}`}
          >
            Hello, I'm <span className={`${colorTheme.textAccent}`}>Utsav</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl ${colorTheme.textSubtle} max-w-2xl mx-auto mb-8`}
          >
            Crafting modern, responsive, and accessible web experiences...
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection("contact");
              }}
              className={`${colorTheme.buttonPrimaryBase} ${colorTheme.buttonPrimaryBg} ${colorTheme.buttonPrimaryBgHover} ${colorTheme.buttonPrimaryText}`}
            >
              Get In Touch
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection("projects");
              }}
              className={`${colorTheme.buttonSecondaryBase} ${colorTheme.buttonSecondaryBg} ${colorTheme.buttonSecondaryBgHover} ${colorTheme.buttonSecondaryText}`}
            >
              View Projects
            </motion.button>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection("about");
              }}
              className="inline-block cursor-pointer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`${colorTheme.textSubtle}`}
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Interactive background decoration */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-b from-teal-200/10 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-purple-200/10 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.6, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </motion.div>
    );
  });
  
  // Add a display name for better debugging
  Home.displayName = 'Home';
  
  export default Home;