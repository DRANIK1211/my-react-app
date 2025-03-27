import React, { useState } from 'react';
import MainScreen from './MainScreen';

const MainComponent = ({user, num}) => { 
  console.log(user)
  const [menu_state, setMenuState] = useState(num)

  const but_menu = document.querySelectorAll(".menu-button");
  const activator = (e) => {
    if(menu_state == 1){
      setMenuState(2)
    }else{
      setMenuState(1)
    }
  }

  if(menu_state == 1){
    return (
      <div className='main-screen'>
        <div className='tap-menu'>
          <div className='menu-button' id="MainBut" onClick={activator}>Главная</div>
          <div className='menu-button desactive' id="ProfileBut" onClick={activator}>Профиль</div>
        </div>
        <MainScreen user={user} />
      </div>
    );
  }else{
    return (
      <div className='main-screen'>
        <div className='tap-menu'>
          <div className='menu-button desactive' id="MainBut" onClick={activator}>Главная</div>
          <div className='menu-button' id="ProfileBut" onClick={activator}>Профиль</div>
        </div>
      </div>
    );
  }
  
};

export default MainComponent;

