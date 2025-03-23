import React, { useState } from 'react';
import "./main.css"

function App() {

  let [info, setData] = useState("")

  const getUserId = async () => {
    const response = await fetch('https://api.telegram.org/bot8010495012:AAHLKehTCGEHCvxwFLkSW6U8uphsEttL1qo/getUpdates');
    const data = await response.json();
    
    if (data.ok && data.result.length > 0) {
      // const userId = data.result[0].message.from.id;
      // console.log('User ID:', userId);
      setData(info = data)
    }
  };
  

  return (
    <div className="App">
      
      <div className='content'>
        <div className='text'>Номер реестра</div>
        <div className='inputText'>
          <input type='text' id="inputText" />
        </div>

        <div className='text'>Пароль</div>
        <div className='inputText'>
          <input type='text' id="inputPass" />
        </div>
        <div className='login' onClick={getUserId}>Войти</div>
        <p>
          {info}
        </p>
        
      </div>

    </div>
  );
}

export default App;
