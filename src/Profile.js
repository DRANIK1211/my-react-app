import React, { useEffect, useState } from "react";
import UserService from "./data";
import "./style/Profile.css"

const ProfileScreen = ({ user }) => {

    const [name, setName] = useState(null)
    const [number, setNumber] = useState(null)
    const [load, setLoad] = useState(false)
    const [red, setRed] = useState(true)
    const [formData, setFormData] = useState({
        number: '',
        username: '',
    });

    useEffect(
        ()=>{
            if(red) {
                const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
                userService.getUser(user.id)
                .then(
                    (res)=>{
                        setName(res.username)
                        setNumber(res.number)
                        setLoad(true)
                    }
                ).catch(
                    (err)=>{
                        alert("Ошибка: " + err)
                    }
                )
            }
            
        }, [red, user]
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if(red){
            setRed(false)
        }else{
            if(formData.username === "" | formData.number === ""){
                alert("Заполните все поля")
                return 0;
            }
            const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
            userService.redUser(
                user.id,
                formData.username,
                formData.number
            )
            setLoad(false)
            setRed(true)
        }
    }

    if(!load){
        return (
            <center>Загрузка данных...</center>
        )
    }
    return (
        <div className="content1">
            <div className="form1">
                <div className="name-screen1">{red ? "Профиль" : "Редактирование профиля"}</div>
                <form onSubmit={handleSubmit}>
                    <div className="block1">
                        <div className="block-name1">ФИО:</div>
                        <div className="block-input1">
                            <input type="text" name="name" value={name} readOnly={red} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="block1">
                        <div className="block-name1">Номер реестра:</div>
                        <div className="block-input1">
                            <input type="text" name="number" value={number} readOnly={red} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn1">{red ? "Редактировать" : "Сохранить"}</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileScreen;