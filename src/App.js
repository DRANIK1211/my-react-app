import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';
import MainComponent from './MainComponent'

function App() {  
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
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
        }
      )

    }, [user]
  )

  if(log){
    return(
      <div className="App">
        <MainComponent user={user}/>
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
