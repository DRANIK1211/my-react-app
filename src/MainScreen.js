import React, { useEffect, useState } from "react";
import UserService from "./data";

const MainScreen = ({user}) => {

    const [med, setMed] = useState("")
    const [red_component, setRedComponent] = useState(-1)
    let med_redact = []
    

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

    useEffect(
        () => {
            med_redact = med.filter(
                item => item.number === red_component
            )
        }, [red_component]
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
                         <div className="btn-del" onClick={() => {del(i.number)}}>Удалить</div>{/* () => del(i.number) */}
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
        let analysis = ""
        if(med_redact.analysis === "Да") {
            analysis = <input class="check" type="checkbox" checked="true" />
        }else{
            analysis = <input class="check" type="checkbox" />
        }

        let now_date = new Date()
        const [formMed, setFormMed] = useState({
                name: `${med_redact.name}`,
                amount: `${med_redact.amount}`,
                amountMerc: `${med_redact.amountMerc}`,
                address: `${med_redact.address}`,
                analysis: `${med_redact.analysis}`,
                date: formatDate(now_date),
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormMed({
                ...formData,
                [name]: value,
            });
        };

        return (
            <div className="wrapper">
                <div className="name-screen">Редактировать</div>
                
                <div className="block">
                    <div className="name-block">Наименование</div>
                    <div className="input-block">
                        <input type="text" value={formMed.name} onChange={handleChange} />
                    </div>
                </div>
                <div className="block">
                    <div className="name-block">Количество (в килограммах)</div>
                    <div className="input-block">
                        <input type="text" value={formMed.amount} onChange={handleChange} />
                    </div>
                </div>
                <div className="block">
                    <div className="name-block">Количество с меркурием (в килограммах)</div>
                    <div className="input-block">
                        <input type="text" value={formMed.amountMerc} onChange={handleChange} />
                    </div>
                </div>
                <div className="block">
                    <div className="name-block">Местонахождение мёда (Область, город)</div>
                    <div className="input-block">
                        <input type="text" value={formMed.address} onChange={handleChange} />
                    </div>
                </div>
                <label class="check-block" onClick={ () => { if(formMed.analysis === "Да") {setFormMed(name="analysis", "Нет")} else {setFormMed(name="analysis", "Да")}}}>
                    {analysis}
                    <span class="custom-check"></span>
                    <div class="check-name">Есть пыльцевой анализ</div> 
                </label>

                <div className="btn-form-red">Сохранить</div>
            </div>
        )
    }
    
}

export default MainScreen;