import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Expanded categories of motivational messages
const categories = {
  general: [
    "がんばって！", 
    "すべてうまくいくよ！", 
    "きみはさいこうだよ！", 
    "いつもおうえんしているよ！", 
    "しんぱいしないで！", 
  ],
  study: [
    "おつかれさま！", 
    "つづけて！", 
    "リラックスして、もうすこしだけ！", 
    "きみならできるよ！", 
  ],
  relax: [
    "ゆっくりやすんで！", 
    "リラックスして！", 
    "深呼吸して！", 
    "ぜんぶうまくいくよ！", 
  ]
};

function App() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [hearts, setHearts] = useState([]);
  const [journal, setJournal] = useState(localStorage.getItem('journal') || ''); // Store journal locally
  const [selectedCategoryMessage, setSelectedCategoryMessage] = useState(""); // Feedback when category selected

  const getRandomMessage = () => {
    const randomMessage = categories[category][Math.floor(Math.random() * categories[category].length)];
    setMessage(randomMessage);
  };

  // Save journal content to localStorage
  const handleJournalChange = (e) => {
    setJournal(e.target.value);
    localStorage.setItem('journal', e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory, categoryName) => {
    setCategory(selectedCategory);
    setSelectedCategoryMessage(`${categoryName} がせんたくされました`); // Feedback message
  };

  // Create random floating hearts and stars
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { id: Math.random(), left: Math.random() * 100, type: Math.random() > 0.5 ? '❤️' : '⭐' },
      ]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 5000); // Remove hearts/stars after 5 seconds
    }, 1000); // Create a new heart/star every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="floating-container">
                {hearts.map((heart) => (
                  <motion.div
                    className="heart"
                    key={heart.id}
                    style={{ left: `${heart.left}%` }}
                    initial={{ bottom: "-10%" }}
                    animate={{ bottom: "110%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  >
                    {heart.type}
                  </motion.div>
                ))}
              </div>
              
              {/* Heartfelt blurb */}
              <motion.div className="blurb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>
                きみはとてもあいされているよ。<br />
                しんぱいしないで。<br />
                ふかくいきをして、すべてうまくいくよ。
              </motion.div>

              {/* Category Buttons */}
              <div className="category-buttons">
                <button onClick={() => handleCategoryChange("general", "いっぱんてき")}>いっぱんてき</button>
                <button onClick={() => handleCategoryChange("study", "べんきょう")}>べんきょう</button>
                <button onClick={() => handleCategoryChange("relax", "りらっくす")}>りらっくす</button>
              </div>

              {/* Display the selected category feedback */}
              <motion.div className="category-feedback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {selectedCategoryMessage}
              </motion.div>

              {/* Message Box */}
              <motion.div
                className="message-box"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={getRandomMessage}
              >
                クリックしてね！
              </motion.div>

              {/* Display Random Motivational Message */}
              {message && (
                <motion.div
                  className="message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {message}
                </motion.div>
              )}

              {/* Journal Section */}
              <div className="journal-section">
                <h2>おもいをかいてね (きょうゆうのほん)</h2>
                <textarea
                  value={journal}
                  onChange={handleJournalChange}
                  placeholder="ここにじゆうにおもいをかいてください..."
                />
              </div>

              {/* Button to navigate to the heartfelt message */}
              <Link to="/message">
                <motion.button
                  className="heartfelt-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  わたしのメッセージ
                </motion.button>
              </Link>
            </div>
          }
        />

        {/* Heartfelt Message Page */}
        <Route
          path="/message"
          element={
            <div className="heartfelt-page">
              <h1>わたしはとてもほこりにおもっているよ。</h1>
              <p>
                こんにちは、わたしはきみにいいたいことがある。<br/>
                きみはほんとうにすごいひとだよ。<br/>
                どんなにむずかしいじょうきょうでも、きみはつよくたちむかっている。<br/>
                わたしはきみをしんじているし、いつもおうえんしているよ。<br/>
                どんなにたいへんなときでも、わたしはきみのそばにいるからね。<br/>
                ぜんぶうまくいくから、あんしんしてね。<br/>
                いっしょにのりこえられるよ！<br/>
                わたしはきみのつよさをほこりにおもっているよ。<br/>
                わたしはいつも、きみのことをしんじている。<br/>
                たいへんなことがあっても、いつでもきみのそばにいるからね。<br/>
                きっと、すべてがうまくいくよ。<br/>
              </p>
              {/* Link to go back to main page */}
              <Link to="/">
                <motion.button
                  className="back-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  もどる
                </motion.button>
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
