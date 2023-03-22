import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [consoleText, setConsoleText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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

  function handleLoginClick() {
    // Set the URL to redirect to
    const redirectUrl = "http://localhost/login.html";
  
    // Navigate to the new URL
    window.location.href = redirectUrl;
  }

  const handleAboutClick = () => {
    setShowAboutPopup(true);
  };

  const handlePopupClose = () => {
    setShowLoginPopup(false);
    setShowAboutPopup(false);
  };

  const handleRecommendations = (e) => {
    setText(e.target.value);
    const url = `http://localhost:80/recommendations/?query=${e.target.value}`;
    axios
      .get(url)
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRecommendationClick = (value) => {
    setText(value);
    setRecommendations([]);
  };

  return (
    <div>
      {/* Navigation bar */}
      

      {/* Main content */}
      <div className="App">
        <div className="header">
          <div style={{ textAlign: "center" }}>
            <form>
              <input
                onChange={handleAdd}
                onKeyUp={handleRecommendations}
                className="search-bar"
                type="text"
                id="search"
                placeholder="Search..."
                value={text}
              />
              <div className="search-buttons">
                <button className="search-button" type="submit" onClick={handleSubmit}>
                  Search
                </button>
              </div>
            </form>
            {recommendations.length > 0 && (
              <div className="recommendations">
                {recommendations.map((r) => (
                  <div
                    key={r}
                    className="recommendation"
                    onClick={() => handleRecommendationClick(r)}
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
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

       
          
        </div>
      </div>
    
  );
}

export default App

