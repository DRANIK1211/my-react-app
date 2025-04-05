import React, { useEffect, useState } from "react";
import UserService from "./data";
import EditHoney from "./EditHoney";

const MainScreen = ({user}) => {

    const [med, setMed] = useState("")
    const [red_component, setRedComponent] = useState(-1)


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




    const del = (num)=>{
        const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
        userService.delMed(num)
        .then(
            ()=>{
                let new_med = med.filter(item => item.number !== num)
                setMed(new_med)
            } 
        ).catch(
            (error)=>{
                alert(error)
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
                        <div className="btn-red" onClick={() => {setRedComponent(i.number)}}>Редактировать</div>
                         <div className="btn-del" onClick={() => {del(i.number)}}>Удалить</div>
                    </div>
                </div>
            )
            
        })
    }


    
    if(red_component === -1){
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
    }else{
        <EditHoney onSaveSuccess={()=>setRedComponent(-1)} honeyData={med.find(honey=>honey.number === red_component)}/>
    }
    
}

export default MainScreen;