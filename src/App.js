import React, { useState } from 'react';

function App() {

  const [count, setCount] = useState(0)
  
  function setInc(){
    setCount(count+1)
  }
  function setDec(){
    if(count > 0){
      setCount(count-1)
    }
    
  }

  return (
    <div className="App">
      
      <h1>
        {count}
      </h1>
      <br/>
      <div>
        <button onClick={setInc}>++</button>
        <button onClick={setDec}>--</button>
      </div>

    </div>
  );
}

export default App;
