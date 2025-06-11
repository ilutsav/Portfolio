// src/components/widgets/ChatBot.js
import React, { useState, useEffect,useRef } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";


// --- IMPORTANT: Replace with your actual Gemini API key ---

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! Ask me anything about Utsav!" },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);


  const yourDetails = `
You are a chatbot named UtsavBot. You have information about Utsav Bhattarai, a Mobile Application Developer (Flutter). He is also open to part-time or contract web projects. Here are his details:

--- Utsav Bhattarai's Information ---
Name: Utsav Bhattarai
Title: Mobile Application Developer (Flutter)
Email: ilutsav@gmail.com
Github: github.com/ilutsav

Summary:
Motivated and enthusiastic Flutter developer with about 1.5 years of experience in mobile app development using the Flutter framework. Eager to apply and expand his skills in a professional environment and contribute to innovative mobile app development. Also open to part-time or contract web projects.

Technical Skills:
Languages and Scripts: Dart, (HTML, CSS, JavaScript) basics.
Designing Tools: Figma
Frameworks and Libraries: Flutter, React (basics).
Database: Firebase, SQL (basics)

Work Experience:
Mobile Application Developer, QuickFox Consulting (August 2024 – Present)
- Led development and feature updates for a news app on both iOS and Android, enhancing user experience and app functionality.
- Experienced IOS development, deployment of app on both ios and android.
- Developed and Integrated key features: Nepali Calender, Horoscope, Gold/Forex/Vegetable Rates, Text-to-Speech, User Management, Interactive Polls, UI features.
- Contributed to a React-based web platform (QuickXtract) for user management, dynamic forms, and integrating extracted data.

Flutter Developer, Trion Tech Solutions (January 2024 – August 2024)
- Started as an intern and quickly transitioned to a full-time Flutter Developer role.
- Contributed to various projects, developing and maintaining cross-platform mobile applications.
- Collaborated with the design team to implement responsive and visually appealing user interfaces.
- Integrated RESTful APIs and handled state management using Getx and Bloc.

Professional Projects:
Mental Health Support Application: Flutter, Getx, Razorpay, Firebase.
News and Home Rental App: Flutter, Getx, http package.

Education:
Bachelor of Science in Computer Science and Information Technology (BSc.CSIT), Madan Bhandari Memorial College, Tribhuvan University.

Additional Information:
- Strong problem-solving and analytical skills.
- Excellent communication and teamwork abilities.
- Open to part-time or contract web projects.

If asked if he can do hard things, respond with a lighthearted joke like: "With the combined power of AI assistants like myself, ChatGPT, and Gemini, Utsav believes he can tackle pretty much anything!"
If asked about his girlfriend, respond with a cheeky line like:
"Shhh... it's classified! But rumor has it, her name starts with an 'A' "

--- End of Utsav's Information ---

Now, answer the user's question based on this information. If the question is not related to Utsav's skills or experience, you can politely say you can only answer questions about him.
`;


useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isGenerating]);

  const handleSend = async (maxRetries = 3, initialDelay = 4000) => {
    if (!input.trim()) return;

    const promptWithDetails = `${yourDetails}\n\nUser's Question: ${input}`;
    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsGenerating(true);

    let retries = 0;
    let delay = initialDelay;

    while (retries <= maxRetries) {
      try {
        if (!process.env.REACT_APP_GEMINI_API_KEY) {
          console.error(
            "Gemini API key is missing. Please update the API_KEY variable."
          );
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Oops! I'm having trouble connecting right now. Please try again later.",
            },
          ]);
          setIsGenerating(false);
          return;
        }

        const result = await model.generateContent({
          contents: [{ parts: [{ text: promptWithDetails }] }],
        });
        const responseText =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: responseText },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "Sorry, I couldn't generate a response." },
          ]);
        }
        setIsGenerating(false);
        return; // Successful response, exit the retry loop
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error.message.includes("overloaded") && retries < maxRetries) {
          retries++;
          console.log(
            `Model overloaded, retrying in ${delay}ms (attempt ${retries}/${maxRetries})`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "There was an error communicating with the AI. Please try again later.",
            },
          ]);
          setIsGenerating(false);
          return; // Exit on non-overload error or max retries
        }
      } finally {
        if (isGenerating && retries > maxRetries) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "The AI is currently overloaded. Please try again later.",
            },
          ]);
          setIsGenerating(false);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 w-120 bg-white rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <header className="bg-indigo-600 text-white px-5 py-4 font-semibold text-lg flex justify-between items-center shadow-md">
        <span>UtsavBot</span>
        <button
          onClick={onClose}
          className="hover:text-indigo-200 transition-colors"
          title="Close"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </header>
  
      {/* Messages */}
      <section className="flex-1 p-5 space-y-3 overflow-y-auto max-h-64 bg-gray-50 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm px-4 py-3 rounded-2xl max-w-[80%] break-words w-fit ${
              msg.sender === "bot"
                ? "bg-gray-200 text-gray-800 self-start"
                : "bg-indigo-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isGenerating && (
       <div className="text-sm px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 self-start w-fit animate-pulse">
       Typing<span className="typing-dots" />
     </div>
     
        )}
        <div ref={messagesEndRef} />

      </section>
  
      {/* Input */}
      <footer className="flex items-center border-t border-gray-200 p-3 bg-white">
        <input
          type="text"
          className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isGenerating}
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          className={`p-3 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isGenerating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white`}
          disabled={isGenerating}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </footer>
    </motion.div>
  );
  
  
};

export default ChatBot;

