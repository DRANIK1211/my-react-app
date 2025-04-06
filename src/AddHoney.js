import React, { useState } from 'react';
import './style/AddHoney.css'; // Импорт стилей
import UserService from './data';

const AddHoney = ({ ok, user }) => {

    const med_list = ['--Не выбрано--', "Гречишный", "Темное разнотравье с гречихой", "Горный", "Дягилевый", "Рапсовый", "Светлое разнотравье с посевными"]
    const [selectedHoney, setSelectedHoney] = useState('--Не выбрано--');


    const initialData = {
        address: "",
        amount: 0,
        amountMerc: 0,
        analysis: "Нет",
        date: new Date().toLocaleDateString('ru-RU'),
        id: user.id,
        name: "",
        number: 0
    };
    
    const [formData, setFormData] = useState({
        amount: initialData.amount,
        amountMerc: initialData.amountMerc,
        address: initialData.address,
        analysis: initialData.analysis === "Да"
    });

    const handleChangeName = (event) => {
        setSelectedHoney(event.target.value);
    };
    const handleSubmit = () => {
        if(selectedHoney === '--Не выбрано--'){
            alert("Выберете тип мёда")
            return 0;
        }
        if(formData.amount === "" | formData.amountMerc === "" | formData.address === ""){
            alert("Заполните все поля")
            return 0;
        }
        const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
        let reestr = 0
        userService.getUser(user.id)
        .then(
            (r)=>{
                reestr = res[0].number
            }
        ).catch(
            (e)=>{
                alert("Ошибка: " + e)
            }
        )
        userService.addMed(
            reestr,
            selectedHoney,
            formData.amount,
            formData.amountMerc,
            formData.address,
            formData.analysis ? "Да" : "Нет",
            String(initialData.date)
        )
        ok()
    }
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="wrapper">
            <div className="name-screen">Добавить мёд</div>
            <form onSubmit={handleSubmit}>
                <div className='input-block'>
                    <select
                        value={selectedHoney}
                        onChange={handleChangeName}
                        className="select-name"
                    >
                        {
                            med_list.map(opt => <option value={opt}>{opt}</option>)
                        }
                    </select>
                </div>
                <div className="block">
                    <div className="name-block">Количество (в килограммах)</div>
                    <div className="input-block">
                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="block">
                    <div className="name-block">Количество с меркурием (в килограммах)</div>
                    <div className="input-block">
                        <input type="number" name="amountMerc" value={formData.amountMerc} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="block">
                    <div className="name-block">Местонахождение мёда (Область, город)</div>
                    <div className="input-block">
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                </div>
                
                <label className="check-block">
                    <input className="check" type="checkbox" name='analysis' checked={formData.analysis} onChange={handleInputChange} />
                    <span className="custom-check"></span>
                    <div className="check-name">Есть пыльцевой анализ</div>
                </label>

                <button type='submit' className="btn-form-red">Добавить</button>
            </form>
        </div>
    )        
};

export default AddHoney;