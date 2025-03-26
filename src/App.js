import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';

function App() {  
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  const user = window.Telegram.WebApp.initDataUnsafe.user
  useEffect(
    () => {
      alert("Начало useEffect")
      const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
      userService.getUser(user.id)
      .then(
        (res) => {
          alert("Пришёл ответ с пользователем" + res)
          if(Array.isArray(res) && res.length > 0){
            setUserData(user)
            setLog(true)
          }
        }
      )
      .catch(
        (error) => {
          alert("error: " + error)
        }
      )

    }, [user]
  )
  

  const handleSubmit = (data) => {
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
    userService.addUser(userData.id, data.number, userData.username, data.username)
    .then(
      () => {
        setLog(true)
      }
    )
  };

  if(log){
    return(
      <div className="App">   
        <div className='text'>id: {userData.id}</div>
        <div className='text'>username: {userData.username}</div>
      </div>
    )
  }else{
    return (
      <div className="App"> 
        <LogIn onSubmit={handleSubmit}/>
      </div>
    );
  }
  
}

export default App;
