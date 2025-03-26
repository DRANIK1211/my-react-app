import React, { useState } from "react";

const LogIn = ({onSubmit}) => {

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


    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        setFormData({number:"", code:"", username:""})
    }
    return (
        <div className='content'>
            <form>

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

                <button className='login' onClick={handleSubmit} >Войти</button>

            </form>        
        </div>
    )
}

export default LogIn;