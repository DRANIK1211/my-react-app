import React, { useEffect, useState } from 'react';

const UserIdComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Проверяем, доступен ли объект WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserData(user);
      }
    }
  }, []);

  if (!userData) {
    return <div>Загрузка данных о пользователе...</div>;
  }

  return (
    <div>
      <h1>Данные о пользователе:</h1>
      <p><strong>User ID:</strong> {userData.id}</p>
      <p><strong>Имя:</strong> {userData.first_name}</p>
      <p><strong>Фамилия:</strong> {userData.last_name}</p>
      <p><strong>Имя пользователя:</strong> {userData.username || 'Не указано'}</p>
    </div>
  );
};

export default UserIdComponent;

