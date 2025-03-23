import React from 'react';
import "./main.css";
import UserIdComponent from './UserIdComponent'; 

function App() {  

  return (

    <div className="App">
      
      <div className='content'>
        <div className='text'>Номер реестра:</div>
        <div className='inputText'>
          <input type='text' id="inputText" />
        </div>

        <div className='text'>Пароль:</div>
        <div className='inputText'>
          <input type='text' id="inputPass" />
        </div>
        <div className='login' >Войти</div>
        <UserIdComponent />
        
      </div>

    </div>
  );
}

export default App;
