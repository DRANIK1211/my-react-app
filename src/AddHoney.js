import React, { useState } from 'react';
import './style/AddHoney.css'; // Импорт стилей
import UserService from './data';

const AddHoney = ({ ok, user }) => {

    const med_list = ['--Не выбрано--', "Гречишный", "Тёмное разнотравье с гречкой", "Тёмное разнотравье", "Рапсовый", "Разнотравье с рапсом", "Светлое разнотравье", "Дягилевый", "Таёжное разнотравье с дягилем", "Таёжное разнотравье", "Васильковый", "Горный", "Предгорное разнотравье", "Притаёжное разнотравье", "Подсолнечниковый", "Степное разнотравье", "Донниковый", "Донник с разнотравьем", "Акациевый", "Мёд сотовый", "Пыльца", "Перга", "Прополис", "Эспарцетовый", "Эспарцетовый с разнотравьем"]
    const [selectedHoney, setSelectedHoney] = useState('--Не выбрано--');

    const container_list = ['--Не выбрано--', "Куботейнер", "Полукуб", "Ведро 11.3л", "Ведро 10л", "Бочка 200л", "Иное"]
    const [selectedContainer, setSelectedContainer] = useState('--Не выбрано--');

    const collectionDate_list = [2025, 2024, 2023, 2022]
    const [collectionDate, setCollectionDate] = useState(2025)


    const initialData = {
        address: "",
        amount: 0,
        merc: "Нет",
        analysis: "Нет",
        date: new Date().toLocaleDateString('ru-RU'),
        id: user.id,
        name: "",
        number: 0
    };
    
    const [formData, setFormData] = useState({
        amount: initialData.amount,
        amountMerc: initialData.merc === "Да",
        address: initialData.address,
        analysis: initialData.analysis === "Да"
    });

    const handleChangeName = (event) => {
        setSelectedHoney(event.target.value);
    };
    const handleChangeContainer = (event) => {
        setSelectedContainer(event.target.value);
    };
    const handleChangeCollectionDate = (event) => {
        setCollectionDate(event.target.value)
    }
    const handleSubmit = () => {
        window.Telegram?.WebApp?.hideKeyboard?.();
        if(selectedHoney === '--Не выбрано--'){
            alert("Выберете тип мёда")
            return 0;
        }
        if(selectedContainer === '--Не выбрано--'){
            alert("Выберете тип тары")
            return 0;
        }
        if(formData.amount === "" | formData.address === ""){
            alert("Заполните все поля")
            return 0;
        }
        const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
        userService.getUser(user.id)
        .then(
            (r)=>{
                userService.addMed(
                    r[0].number,
                    selectedHoney,
                    selectedContainer,
                    formData.amount,
                    formData.address,
                    formData.merc ? "Да" : "Нет",
                    formData.analysis ? "Да" : "Нет",
                    String(initialData.date),
                    collectionDate
                )
            }
        ).catch(
            (e)=>{
                alert("Ошибка: " + e)
            }
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

                <div className='block'>
                    <div className="name-block">Наименование</div>
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
                </div>
                
                
                <div className="block">
                    <div className="name-block">Тара</div>
                    <div className='input-block'>
                        <select
                            value={selectedContainer}
                            onChange={handleChangeContainer}
                            className="select-name"
                        >
                            {
                                container_list.map(opt => <option value={opt}>{opt}</option>)
                            }
                        </select>
                    </div>

                </div>
                
                <div className="block">
                    <div className="name-block">Год сбора</div>
                    <div className='input-block'>
                        <select
                            value={collectionDate}
                            onChange={handleChangeCollectionDate}
                            className="select-name"
                        >
                            {
                                collectionDate_list.map(opt => <option value={opt}>{opt}</option>)
                            }
                        </select>
                    </div>

                </div>


                <div className="block">
                    <div className="name-block">Количество (в килограммах)</div>
                    <div className="input-block">
                        <input
                            type="number" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>

                {/* <div className="block">
                    <div className="name-block">Количество с меркурием (в килограммах)</div>
                    <div className="input-block">
                        <input type="number" name="amountMerc" value={formData.amountMerc} onChange={handleInputChange} required />
                    </div>
                </div> */}

                <div className="block">
                    <div className="name-block">Местонахождение мёда (Область, город)</div>
                    <div className="input-block">
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                </div>

                <label className="check-block">
                    <input className="check" type="checkbox" name='merc' checked={formData.merc} onChange={handleInputChange} />
                    <span className="custom-check"></span>
                    <div className="check-name">Есть меркурий</div>
                </label>
                
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
