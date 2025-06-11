import { motion } from 'framer-motion';
import {
  SiFlutter, SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiFirebase, SiMongodb, SiGit, SiFigma, SiVercel, SiNextdotjs
} from 'react-icons/si';

// Data remains separate for easy maintenance
const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
        { name: 'Flutter', icon: <SiFlutter /> },
      { name: 'React', icon: <SiReact /> },
     // { name: 'Next.js', icon: <SiNextdotjs /> },
     
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
    //  { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Figma', icon: <SiFigma /> },
   //   { name: 'Vercel', icon: <SiVercel /> },
    ],
  },
];

// Animation variants for a coordinated stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// **THE FIX IS HERE**
// We provide a default value for the colorTheme prop.
const SkillsSection = ({ skillsRef, colorTheme = {} }) => {
  // We also create a complete default theme to fall back on.
  // This prevents errors if colorTheme is passed but is missing a key.
  const defaultTheme = {
    textPrimary: 'text-slate-800',
    textBody: 'text-slate-600',
    bgCard: 'bg-white',
    borderCard: 'border-slate-200',
    gradientAccentBar: 'bg-gradient-to-r from-blue-500 to-purple-600',
  };

  // Merge the passed theme with the default theme.
  const theme = { ...defaultTheme, ...colorTheme };

  return (

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-3xl font-bold mb-16 text-center ${theme.textPrimary}`}
        >
          Skills & Expertise
          <span
            className={`block w-20 h-1 ${theme.gradientAccentBar} mx-auto mt-2 rounded`}
          ></span>
        </motion.h2>

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className={`text-xl font-semibold mb-6 ${theme.textPrimary}`}>
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.07)',
                    }}
                    className={`group relative flex flex-col items-center justify-center p-4 h-28
                                rounded-lg ${theme.bgCard} border ${theme.borderCard}
                                transition-all duration-300 cursor-pointer`}
                  >
                    <div className={`text-4xl mb-3 ${theme.textPrimary} transition-colors duration-300`}>
                      {skill.icon}
                    </div>
                    <h4 className={`text-sm font-medium ${theme.textBody} text-center`}>
                      {skill.name}
                    </h4>
                    <div
                      className={`absolute bottom-0 left-0 w-0 h-0.5 ${theme.gradientAccentBar}
                                  rounded-full group-hover:w-full transition-all duration-300`}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
 
  );
};

export default SkillsSection;