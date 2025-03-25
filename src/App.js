import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';
import UserIdComponent from './UserIdComponent';

function App() {  

  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  
  useEffect(() => {
    // Проверяем, доступен ли объект WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserData(user);
        alert(user)
      }
    }
  }, []);


  const handleSubmit = (data) => {
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.addUser(userData.id, data.number, userData.username, data.username)
    .then(() => setLog(true))
    .catch(() => setLog(false))

    
  };


  if(userData){
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.getUser(userData.id)
    .then(() => setLog(true))
    .catch(() => setLog(false))
  }
  if(log){
    alert(log)
    return(
      <div className="App">   
        <UserIdComponent />

      </div>
    )
  }else{
    alert(log)
    return (
      
      <div className="App"> 
        <LogIn onSubmit={handleSubmit}/>
      </div>
    );
  }
  
}

export default App;
