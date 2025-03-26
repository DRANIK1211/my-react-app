import React from 'react';

const MainComponent = ({user}) => { 

  return (
    <div className='content'>
      <div className='text'>id: {user.id}</div>
      <div className='text'>username: {user.username}</div>
    </div>
  );
};

export default MainComponent;

