# MERN Quiz App with Emoji Feedback 🎯📊

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to register, take a 10-question MCQ quiz, and submit emoji-based feedback. The application also includes score calculation, progress tracking, and feedback storage.

---

## 📌 Features

- 🔐 **User Authentication**
 - Login via mobile number & password
  - JWT-based secure sessions

- 🧠 **Quiz Functionality**
  - 10 pre-defined questions (fetched dynamically from MongoDB)
  - Radio button MCQ selection
  - Timer with auto-submit on timeout
  - Score calculation and result display

- 💬 **Emoji-Based Feedback**
  - Emoji picker integrated with comment box
  - Stores user feedback in MongoDB
  - Feedback timestamped and linked with `userId`

- 📈 **Responsive UI**
  - Mobile-first responsive design with Tailwind CSS
  - Live progress bar with timer
  - Result summary with score & feedback form


