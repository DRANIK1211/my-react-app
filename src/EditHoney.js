import React, { useState } from 'react';
import styles from './style/EditHoney.css'; // Импорт стилей
import UserService from './data';

const EditHoney = ({ honeyData, onSaveSuccess }) => {

  const initialData = honeyData[0] || {
    address: "",
    amount: 0,
    amountMerc: 0,
    analysis: "Нет",
    date: new Date().toLocaleDateString('ru-RU'),
    id: 0,
    name: "",
    number: 0
  };

  const [formData, setFormData] = useState({
    amount: initialData.amount,
    amountMerc: initialData.amountMerc,
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
    e.preventDefault();
    const userService = new UserService("https://andreydrughinin.pythonanywhere.com")
    userService.redMed(
        initialData.number,
        initialData.name,
        formData.amount,
        formData.amountMerc,
        formData.address,
        formData.analysis ? "Да" : "Нет",
        initialData.date
    )
    onSaveSuccess()
  };

//   return (
//     <div className={styles.editHoneyContainer}>
      
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Наименование</label>
//           <input 
//             type="text" 
//             value={initialData.name} 
//             readOnly 
//           />
//         </div>
        
//         <div className={styles.formGroup}>
//           <label>Количество (в килограммах)</label>
//           <input 
//             type="number" 
//             name="amount"
//             value={formData.amount} 
//             onChange={handleInputChange}
//             required
//           />
//         </div>
        
//         <div className={styles.formGroup}>
//           <label>Количество с меркурием (в килограммах)</label>
//           <input 
//             type="number" 
//             name="amountMerc"
//             value={formData.amountMerc} 
//             onChange={handleInputChange}
//             required
//           />
//         </div>
        
//         <div className={styles.formGroup}>
//           <label>Местонахождение мёда (Область, город)</label>
//           <input 
//             type="text" 
//             name="address"
//             value={formData.address} 
//             onChange={handleInputChange}
//             required
//           />
//         </div>
        
//         <div className={`${styles.formGroup} ${styles.checkbox}`}>
//           <label>
//             <input 
//               type="checkbox" 
//               name="analysis"
//               checked={formData.analysis} 
//               onChange={handleInputChange}
//             />
//             Есть пыльцевой анализ
//           </label>
//         </div>
        
//         <button type="submit" className={styles.saveButton}>Сохранить</button>
//       </form>
//     </div>
//   );
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
                        <input type="number" name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                </div>
                
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