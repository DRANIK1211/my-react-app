import React, { useState } from 'react';
import './style/AddHoney.css'; // Импорт стилей

const AddHoney = ({ ok }) => {

    const med_list = ["Гречишный", "Темное разнотравье с гречихой", "Горный", "Дягилевый", "Рапсовый", "Светлое разнотравье с посевными"]
    const [selectedHoney, setSelectedHoney] = useState('--Не выбрано--');
    const handleChange = (event) => {
        setSelectedHoney(event.target.value);
    };
    const handleSubmit = () => {
        ok()
    }

    return (
        <div className="wrapper">
            <div className="name-screen">Добавить мёд</div>
            <form onSubmit={handleSubmit}>
                <div className='input-block'>
                    <select
                        value={selectedHoney}
                        onChange={handleChange}
                        className="select-name"
                    >
                        {
                            med_list.map(opt => <option value={opt}>{opt}</option>)
                        }
                    </select>
                </div>
            </form>
        </div>
    )        
};

export default AddHoney;