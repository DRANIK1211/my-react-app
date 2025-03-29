import React, { useEffect, useState } from "react";
import UserService from "./data";
import medComponent from "./med-component";

const MainScreen = ({user}) => {

    const [med, setMed] = useState("")

    useEffect(
        () => {
          const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
          userService.getMed(user.id)
          .then(
            (res) => {
              setMed(res)
            }
          )
    
        }, [user]
    )

    const clickDel = (number) => {
        alert(number)
        // const userService = UserService("https://andreydrughinin.pythonanywhere.com");
        // userService.delMed(med.number)
        //   .then(
        //     (res) => {
        //       setMed(res)
        //     }
        // )
    }

    let medList = <div></div>
    if (med.length > 0) {
        medList = med.map((i) =>  medComponent(med={i}, clearComponent={clickDel}))
    }


    

    return(
        <div className="content main">
            <div className="main-text">Ваши меда</div>
            <div className="znak">
                <div className="naim">Наименование</div>
                <div className="count">Кол-во, в кг</div>
            </div>

            <div className="wrap">
                {medList}
            </div>
            
            <div className="add-med">
                <div className="add-text">+</div>
            </div>
        </div>
    );
}

export default MainScreen;