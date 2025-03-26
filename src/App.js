import React, { useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';
import UserIdComponent from './UserIdComponent';

function App() {  

  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  const user = window.Telegram.WebApp.initDataUnsafe.user
  const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
  setUserData(user)
  userService.getUser(user.id)
    .then(
      (res) => {
        if(Array.isArray(res) && res.length > 0){
          setLog(true)
        }
      }
    )

  const handleSubmit = (data) => {
    userService.addUser(userData.id, data.number, userData.username, data.username)
    .then(
      () => {
        setLog(true)
      }
    )
  };

  /*useEffect(
    () => {
      if (window.Telegram && window.Telegram.WebApp){
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if(user){
          setUserData(user)

          const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
          userService.getUser(user.id)
          .then(
            (res) => {
              if(Array.isArray(res) && res.length > 0){
                setLog(true)
              }
            }
          )

        }
      }
    }, []
  )*/



  /*useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserData(user);
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
      userService.getUser(userData.id)
        .then((response) => {
          if (Array.isArray(response) && response.length > 0) {
            setLog(true);
          } else {
            setLog(false);
          }
        })
        .catch(() => setLog(false));
    }
  }, [userData]);*/

  /*if (window.Telegram.WebApp){
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if(user){
      setUserData(user)

      const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
      userService.getUser(user.id)
      .then(
        (res) => {
          if(Array.isArray(res) && res.length > 0){
            setLog(true)
          }
        }
      )

    }
  }*/


  if(log){
    return(
      <div className="App">   
        <UserIdComponent userData={userData}/>
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
