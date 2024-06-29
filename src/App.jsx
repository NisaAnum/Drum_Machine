import { useState } from 'react';
import './App.css';
import Drumpad from './components/Drumpad'


function App() {
  

  const getButtonStyle = (id) => {
    return {
      backgroundColor: activeButton === id ? 'blue' : 'grey',
      marginTop: '10px',
      boxShadow: 'black 3px 3px 5px',
      cursor: 'pointer', // Add cursor pointer for better UX
    };
  };

  return (
    <>
<Drumpad />
    </>
  );
}

export default App;
