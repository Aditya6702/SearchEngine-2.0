import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [consoleText, setConsoleText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  const handleAdd = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    formData.append('text', text);
    const url = 'http://localhost:80/search/';
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        setConsoleText(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleAboutClick = () => {
    setShowAboutPopup(true);
  };

  const handlePopupClose = () => {
    setShowLoginPopup(false);
    setShowAboutPopup(false);
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav class="navbar">
  <div class="navbar-container">
    <div class="logo-container">
      <h3 class="logo">My App</h3>
    </div>
  
    <div class="nav-buttons">
      <button class="btn-nav" onClick={handleLoginClick}>Login</button>
      <button class="btn-nav" onClick={handleAboutClick}>About</button>
    </div>
  </div>
</nav>

      {/* Main content */}
      <div className="App">
  <div className="header">
    <div style={{ textAlign: "center" }}>
      <form>
        <input
          onChange={handleAdd}
          className="search-bar"
          type="text"
          id="search"
          placeholder="Search..."
        />
        <div className="search-buttons">
          <button className="search-button" type="submit" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </form>
    </div>
    <div className="header-right">
      <a className="nav-button" onClick={handleLoginClick}>
        Sign in
      </a>
      <a className="nav-button" onClick={handleAboutClick}>
        About
      </a>
    </div>
  </div>

        {/* Render console text on page */}
        <div dangerouslySetInnerHTML={{ __html: consoleText }}></div>

        {/* Add some hooks-based styling */}
        <div className="popup-container">
          {showLoginPopup && (
            <div className="popup">
              <h2>Login Popup</h2>
              <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Submit</button>
              </form>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          )}
          {showAboutPopup && (
            <div className="popup">
              <h2>About Popup</h2>
              <p>This is a demo app created using React.</p>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App

