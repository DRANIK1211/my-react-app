import React, { useEffect, useState } from "react";
import UserService from "./data";

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

    const del = (number) => {
        const userService = UserService("https://andreydrughinin.pythonanywhere.com");
        userService.delMed(number)
        .then(
            ()=>{
                let new_med = med.filter(item => item.number !== number)
                setMed(new_med)
            } 
        )
    }

    let medList = <div></div>
    if (med.length > 0) {
        medList = med.map((i) => {
            return (
                <div className="med">
                    <div className="med-component">
                        <div className="component-name">{i.name}</div>
                        <div className="component-count">{i.amount}</div>
                    </div>
                    <div className="med-btn">
                        <div className="btn-red">Редактировать</div>
                        <div className="btn-del" onClick={() => del(i.number)}>Удалить</div>
                    </div>
                </div>
            )
            
        })
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