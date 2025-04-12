import React, { useState } from "react";
import MainComponent from "./MainComponent";
import UserService from "./data";

const LogIn = ({user}) => {

    const [formData, setFormData] = useState({
        number: '',
        code: '',
        username: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    
    const [log, setLog] = useState(false)


    const handleSubmit = (e) => {
        if(formData.number ==="" | formData.username==="" | formData.code !== "1111" | formData.phone === ""){
            alert("Корректно заполните все поля")
            return 0;
        }
        e.preventDefault()
        const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
        userService.addUser(user.id, formData.number, user.username, formData.username, formData.phone)
        .then(
            () => {
                setLog(true)
            }
        )
        setFormData({number:"", code:"", username:"", phone:""})
    }

    if(log){
        return(
            <MainComponent user={user} num={1}/>
        )
    }
    return (
        <div className='content'>
            <form onSubmit={handleSubmit}>

                <div className='text'>ФИО:</div>
                <div className='inputText'>
                    <input type='text' id="usename" name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div className='text'>Номер телефона:</div>
                <div className='inputText'>
                    <input type='tel' id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} />
                </div>

                <div className='text'>Номер реестра:</div>
                <div className='inputText'>
                    <input type='text' id="number" name="number" value={formData.number} onChange={handleChange} />
                </div>


                <div className='text'>Код регистрации:</div>
                <div className='inputText'>
                    <input type='text' id="code" name="code" value={formData.code} onChange={handleChange} />
                </div>

                <button className='login' type="submit" >Войти</button>

            </form>        
        </div>
    )
}

export default LogIn;