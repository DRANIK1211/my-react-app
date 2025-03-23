import React, { useState } from 'react';

function App() {

  

  return (
    <div className="App">
      
      <div class="Main">
        <h1>Тестовое приложение</h1>
        <img src="{{ url_for('static', filename='bot.png') }}" alt="123"/>
        <p></p>
        <button class="btn">Кнопка</button>
      </div>

    </div>
  );
}

export default App;
