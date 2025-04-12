import React, { useState } from "react";
import MainComponent from "./MainComponent";
import UserService from "./data";

const LogIn = ({user}) => {

    const [formData, setFormData] = useState({
        number: '',
        code: '',
        username: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const [log, setLog] = useState(false)


    const handleSubmit = (e) => {
        if(formData.number ==="" | formData.username==="" | formData.code !== "1111"){
            alert("Корректно заполните все поля")
            return 0;
        }
        e.preventDefault()
        const userService = new UserService("https://andreydrughinin.pythonanywhere.com");
        userService.addUser(user.id, formData.number, user.username, formData.username)
        .then(
            () => {
                setLog(true)
            }
        )
        setFormData({number:"", code:"", username:""})
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