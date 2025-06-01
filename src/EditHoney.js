import React, { useState } from 'react';
import './style/EditHoney.css'; // Импорт стилей
import UserService from './data';

const EditHoney = ({ honeyData, onSaveSuccess }) => {
    alert(honeyData.container)
  const initialData = honeyData[0] || {
    address: "",
    amount: 0,
    merc: "Нет",
    analysis: "Нет",
    date: new Date().toLocaleDateString('ru-RU'),
    id: 0,
    name: "",
    number: 0
  };

  const container_list = ['--Не выбрано--', "Куб", "Полукуб", "Ведро 20л"]
  const [selectedContainer, setSelectedContainer] = useState("");
  const handleChangeContainer = (event) => {
    setSelectedContainer(event.target.value);
};

  const [formData, setFormData] = useState({
    amount: initialData.amount,
    merc: initialData.merc === "Да",
    address: initialData.address,
    analysis: initialData.analysis === "Да"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    if(initialData.name === "" | formData.amount === "" | formData.address === "" | selectedContainer === "--Не выбрано--"){
        alert("Заполните все поля")
        return 0;
    }
    e.preventDefault();
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.redMed(
        initialData.number,
        initialData.name,
        formData.amount,
        formData.address,
        formData.merc ? "Да" : "Нет",
        formData.analysis ? "Да" : "Нет",
        String(initialData.date),
        selectedContainer
    )
    onSaveSuccess()
  };
    return (
        <div className="wrapper">
            <div className="name-screen">Редактировать</div>
            <form onSubmit={handleSubmit}>
                <div className="block">
                    <div className="name-block">Наименование</div>
                    <div className="input-block">
                        <input type="text" value={initialData.name} readOnly />
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
                    <div className="name-block">Количество (в килограммах)</div>
                    <div className="input-block">
                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
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

                <button type='submit' className="btn-form-red">Сохранить</button>
            </form>
            

            
        </div>
    )        
};

export default EditHoney;