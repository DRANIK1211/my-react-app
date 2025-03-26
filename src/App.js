import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';

function App() {  
  alert("Запуск")
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  const user = window.Telegram.WebApp.initDataUnsafe.user
  alert("user: " + user.id)
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
            alert("Изменение Log и userData")
          }
        }
      )
      .catch(
        (error) => {
          alert("error: " + error.message)
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

  alert("Проверка log")
  if(log){
    alert("Отрисовка компонента")
    return(
      <div className="App">   
        <div className='text'>id: {userData.id}</div>
        <div className='text'>username: {userData.username}</div>
      </div>
    )
  }else{
    alert("Отрисовка LogIn")
    return (
      <div className="App"> 
        <LogIn onSubmit={handleSubmit}/>
      </div>
    );
  }
  
}

export default App;
