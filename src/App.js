import React, { useState } from 'react';
import "./main.css"

function App() {

  

  return (
    <div className="App">
      
      <div className="Main">
        <h1>Тестовое приложение</h1>
        <img src="{{ url_for('static', filename='bot.png') }}" alt="123" />
        <p></p>
        <button className="btn">Кнопка</button>
      </div>

    </div>
  );
}

export default App;
