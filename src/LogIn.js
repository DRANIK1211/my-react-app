import React, { useState } from "react";

const LogIn = () => {

    const [formData, setFormData] = useState({
        number: '',
        code: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        // Здесь вы можете отправить данные на сервер или выполнить другие действия
        
    };

    return (
        <div className='content'>
            <form onSubmit={handleSubmit}>
                <div className='text'>Номер реестра:</div>
                <div className='inputText'>
                    <input type='text' id="number" name="number" value={formData.name} onChange={handleChange} />
                </div>

                <div className='text'>Код регистрации:</div>
                <div className='inputText'>
                    <input type='text' id="code" name="code" value={formData.code} onChange={handleChange} />
                </div>

                <div className='login' type="submit" >Войти</div>
            </form>
            
            <p>
                {formData}
            </p>
        
        </div>
    )
}

export default LogIn;