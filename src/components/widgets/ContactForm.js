import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { colorTheme } from '../../theme.js'; // Adjust path if necessary


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_koshf5c", // Replace with your service ID from EmailJS
        "template_88l8jk8", // Replace with your template ID from EmailJS
        e.target, // form element

        'w2UvnLfFejXubB2ao',

      )
      .then(
        (result) => {
          console.log("Email successfully sent:", result.text);
          alert("Your message has been sent!");
        },
        (error) => {
          console.log("Error sending email:", error.text);
          alert("There was an error sending your message.");
        }
      );
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${colorTheme.bgCard} rounded-lg p-8 ${colorTheme.shadowCard} ${colorTheme.borderCard}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium ${colorTheme.textSubtle} mb-2`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full ${colorTheme.bgInput} ${colorTheme.borderInput} rounded-lg px-4 py-2 focus:outline-none ${colorTheme.ringAccent} ${colorTheme.borderInputFocus}`}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorTheme.textSubtle} mb-2`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full ${colorTheme.bgInput} ${colorTheme.borderInput} rounded-lg px-4 py-2 focus:outline-none ${colorTheme.ringAccent} ${colorTheme.borderInputFocus} ${colorTheme.textPlaceholder}`}
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className={`block text-sm font-medium ${colorTheme.textSubtle} mb-2`}>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full ${colorTheme.bgInput} ${colorTheme.borderInput} rounded-lg px-4 py-2 focus:outline-none ${colorTheme.ringAccent} ${colorTheme.borderInputFocus} h-32 ${colorTheme.textPlaceholder}`}
            placeholder="Your message here..."
          ></textarea>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-3 ${colorTheme.gradientButton} ${colorTheme.textInverse} ${colorTheme.buttonBase} ${colorTheme.shadowCardHover} ${colorTheme.ringAccent}`}
          type="submit"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
