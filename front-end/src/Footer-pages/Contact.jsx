import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitted(true);
  };

  return (
    <div className={styles.greyContainer}>
      <p className={styles.title}>Contact Us</p>

      <p className={styles.categoryText}>
        We are happy to hear from you, but before you send us a message, we
        encourage you to review our comprehensive
        <Link to="/faq" className={styles.categoryTitle}>
          FAQ
        </Link>
        list, as most questions can be answered there! By doing so, you may find
        that your question has already been addressed, saving both you and us
        valuable time.
      </p>

      {isSubmitted ? (
        <p className={styles.thankyouMessage}>
          Thank you for your inquiry! We will get back to you as soon as
          possible.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
