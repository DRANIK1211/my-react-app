import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';
import UserIdComponent from './UserIdComponent';

function App() {  

  const [userData, setUserData] = useState(null);
  let log = false
  
  useEffect(() => {
    // Проверяем, доступен ли объект WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserData(user);
      }
    }
  }, []);

  if(!userData){
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.getUser(userData.id)
    .then(data => {log = data})
    .catch(error => {log = error})
  }
  if(log === false){
    return(
      <div className="App">   
        <LogIn />
      </div>
    )
  }else{
    return (
      <div className="App"> 
        <UserIdComponent />
      </div>
    );
  }
  
}

export default App;
