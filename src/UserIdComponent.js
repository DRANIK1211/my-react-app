import React from 'react';

const UserIdComponent = (userData) => { 

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

