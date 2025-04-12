import React, { useEffect, useState } from "react";
import UserService from "./data";
import "./style/Profile.css"

const ProfileScreen = () => {
    const [load, setLoad] = useState(false)
    const [red, setRed] = useState(true)
    const user = window.Telegram.WebApp.initDataUnsafe.user
    const [formData, setFormData] = useState({
        number: "",
        username: "",
        phone: ""
    });

    useEffect(
        ()=>{
            
            const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
            userService.getUser(user.id)
            .then(
                (res)=>{
                    setFormData({
                        number: res[0].number,
                        username: res[0].username,
                        phone: res[0].phone
                    })
                    setLoad(true)
                }
            ).catch(
                (err)=>{
                    alert("Ошибка: " + err)
                }
            )
            
            
        }, [user]
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(red){
            setRed(false)
        }else{
            if(formData.username === "" | formData.number === "" | formData.phone === ""){
                alert("Заполните все поля")
                return 0;
            }
            const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
            userService.redUser(
                user.id,
                formData.username,
                formData.number,
                formData.phone
            )
            
            setRed(true)

            setLoad(false)
            userService.getUser(user.id)
            .then(
                (res)=>{
                    setFormData({
                        number: res[0].number,
                        username: res[0].username,
                        phone: res[0].phone
                    })
                    setLoad(true)
                }
            ).catch(
                (err)=>{
                    alert("Ошибка: " + err)
                }
            )
            setLoad(true)
        }
    }

    const formatPhone = (value) => {
        if (!value) return '';
        
        const numbers = value.replace(/\D/g, '');
        let formatted = '';
        
        if (numbers.length > 0) {
            formatted = `+7 (${numbers.substring(1, 4)}`;
        }
        if (numbers.length >= 4) {
            formatted += `) ${numbers.substring(4, 7)}`;
        }
        if (numbers.length >= 7) {
            formatted += `-${numbers.substring(7, 9)}`;
        }
        if (numbers.length >= 9) {
            formatted += `-${numbers.substring(9, 11)}`;
        }
        
        return formatted;
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const numbers = input.replace(/\D/g, '');
        
        if (numbers.length <= 11) {
            setFormData({
                ...formData,
                phone: formatPhone(numbers)
            });
        }
    };

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
                            <input type="text" name="username" value={formData.username} readOnly={red} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="block1">
                        <div className="block-name1">Номер реестра:</div>
                        <div className="block-input1">
                            <input type="text" name="number" value={formData.number} readOnly={red} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="block1">
                        <div className="block-name1">Номер телефона:</div>
                        <div className="block-input1">
                            <input type="tel" name="phone" value={formData.phone} readOnly={red} onChange={handlePhoneChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn1">{red ? "Редактировать" : "Сохранить"}</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileScreen;