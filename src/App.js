import React, { useEffect, useState } from 'react';
import "./style/main.css";
import "./style/index.css";
import UserService from "./data"
import LogIn from './LogIn';
import MainComponent from './MainComponent'

function App() {  
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  const [loading, setLoad] = useState(false)
  const user = window.Telegram.WebApp.initDataUnsafe.user
  useEffect(
    () => {
      const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
      userService.getUser(user.id)
      .then(
        (res) => {
          if(Array.isArray(res) && res.length > 0){
            setUserData(user)
            setLog(true)
          }
          setLoad(true)
        }
      )

    }, [user]
  )
  if(loading === false){
    return (
      <div className='App'>
        <center>Загрузка данных...</center>
      </div>
    )
    
  }

  if(log){
    return(
      <div className="App">
        <MainComponent user={userData} num={1}/>
      </div>
    )
  }else{
    return (
      <div className="App"> 
        <LogIn user={user}/>
      </div>
    );
  }
  
}

export default App;
