import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Scam Spotter</h1>
      </header>
      <div className="App-body">
        <input 
          type="text" 
          placeholder="Type your text here..." 
          value={text} 
          onChange={handleTextChange} 
        />
        <input 
          type="file" 
          accept="image/*,audio/*" 
          onChange={handleFileChange} 
        />
        {file && (
          <div className="App-media">
            {file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') ? (
              <img src={file} alt="Uploaded" className="App-image" />
            ) : file.endsWith('.mp3') || file.endsWith('.wav') ? (
              <audio controls>
                <source src={file} type="audio/*" />
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </div>
        )}
        {text && <p>{text}</p>}
      </div>
      <footer className="App-footer">
        <p>Footer Content</p>
      </footer>
    </div>
  );
}

export default App;
