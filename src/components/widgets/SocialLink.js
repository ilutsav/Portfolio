import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const socialLinks = [
    { platform: "github", url: "https://github.com/ilutsav", icon: <FaGithub /> },
    { platform: "linkedin", url: "https://www.linkedin.com/in/utsav-bhattarai-843713227/", icon: <FaLinkedin /> },
    { platform: "email", url: "mailto:ilutsav@gmail.com", icon: <FaEnvelope /> },
  ];

  return (
    <div className="mt-10 text-center">
      <p className="text-gray-300 mb-4">Alternatively, reach out via:</p>
      <div className="flex justify-center space-x-6">
        {socialLinks.map(({ platform, url, icon }) => (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, color: "#60a5fa" }}
            className="text-gray-400 hover:text-white text-2xl"
          >
            {icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
