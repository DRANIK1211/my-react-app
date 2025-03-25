import React, { useEffect, useState } from 'react';
import "./main.css";
import UserService from "./data"
import LogIn from './LogIn';
import UserIdComponent from './UserIdComponent';

function App() {  

  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState(false);
  


  const handleSubmit = (data) => {
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.addUser(userData.id, data.number, userData.username, data.username)
    .then(() => setLog(true))
    .catch(() => setLog(false))

    
  };


  useEffect(() => {
    if (userData) {
      const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
      userService.getUser(userData.id)
        .then((response) => {
          // Проверяем, если response - это массив и содержит хотя бы один объект
          if (Array.isArray(response) && response.length > 0) {
            setLog(true);
          } else {
            setLog(false);
          }
        })
        .catch(() => setLog(false));
    }
  }, [userData]); // Зависимость от userData

  
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
