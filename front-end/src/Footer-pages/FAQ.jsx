import { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = {
  "General Questions": [
    {
      question:
        "How is 'Play It Back!' different from other video game platforms like MobyGames or My Abandonware?",
      answer:
        "'Play it Back' is a centralized hub focused on preserving video game history through detailed information, interrelations, and archival efforts. Unlike My Abandonware, we do not provide game downloads, and unlike MobyGames, we do not function as a database for credits or reviews. Instead, we offer a structured, research-friendly space where retro gamers and enthusiasts can explore the historical and contextual aspects of classic games.",
    },

    {
      question: "What kind of games and systems does 'Play It Back!' cover?",
      answer:
        "Our website covers a wide range of video games across various genres and platforms. Each game entry includes details about its genre (such as arcade, educational, or action) and the systems it was released on, including classic home computers like the ZX Spectrum and DOS, as well as handheld consoles like the Game Boy Advance and Nintendo 3DS.",
    },
  ],

  "Contributing & Community": [
    {
      question: "Who can contribute to the site?",
      answer:
        "Anyone can contribute once their log in credentials have been created",
    },

    {
      question: "How do I obtain log in credentials?",
      answer:
        "Just reach out to us through the contact form, letting us know you're interested in contributing, and we'll provide you with login credentials. For security reasons, we create user accounts manually.",
    },
  ],
  "Features & Functionality": [
    {
      question: "What kind of information can I find on 'Play It Back!'?",
      answer:
        "Currently, 'Play It Back!' provides game descriptions along with details such as genre, platform, release year, and release country. The tags section also includes additional relevant information about each game.",
    },
    {
      question: "Does 'Play It Back!' have a forum or discussion area?",
      answer:
        "Unfortunately we do not have a forum or discussion area on our site, but you can join the conversation on our Discord server. Just search for ‘Play It Back’ on Discord to connect with fellow game enthusiasts.",
    },
    {
      question: "Can I track my contributions or favorite games?",
      answer: "Not yet, but we plan to add this feature in the future.",
    },
  ],
  "Legal & Ethical Considerations": [
    {
      question: "Does 'Play It Back!' host copyrighted games?",
      answer:
        "Play It Back!' does not host or distribute copyrighted games. Our platform is focused on providing information about classic video games, including details about their history, genres, and platforms. We encourage users to explore legal avenues for accessing games.",
    },
    {
      question:
        "What should I do if I notice incorrect or misleading information?",
      answer:
        "Once you clog in into your account, you can edit the information yourself!",
    },
  ],
};

function FAQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const toggleFAQ = (question) => {
    setSelectedQuestion(selectedQuestion === question ? null : question);
  };
  return (
    <div className={styles.greyContainer}>
      <p className={styles.title}>Frequently Asked Questions</p>
      {Object.keys(faqData).map((category) => (
        <div key={category} className="faqCategory">
          <p className={styles.categoryTitle}>{category}</p>
          {faqData[category].map((item, index) => {
            const question = `${category}-${index}`;
            return (
              <div key={index} className="faqItem">
                <button
                  onClick={() => toggleFAQ(question)}
                  className={styles.faqQuestion}
                >
                  <span className={styles.faqToggle}>
                    {selectedQuestion === question ? "▲" : "▼"}{" "}
                  </span>
                  {item.question}
                </button>
                {selectedQuestion === question && (
                  <p className={styles.faqAnswer} id={`answer-${question}`}>
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
