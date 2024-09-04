import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ColorNav from './ColorNav';
import ColorList from './ColorList';
import ColorPage from './ColorPage';
import ColorForm from './ColorForm';

function App() {
  const [colorArr, setColorArr] = useState(["#FF0000", "#00FF00", "#0000FF"])
  const [colorForm, setColorForm] = useState("")

  const navigate = useNavigate()
  const handleClick = () => {
    setColorArr(oldArr => ([...oldArr, colorForm]))
    navigate("/colors")
  }

  return (
    <div className="App">
      <h1>Good luck!</h1>
      <ColorNav />
      <Routes>
        <Route path='/colors'>
          <Route index element={<ColorList colors={colorArr} />} />
          <Route path=':color' element={<ColorPage />} />
          <Route path='new' element={<ColorForm color={colorForm} change={evt => setColorForm(evt.target.value)} click={handleClick} />} />
        </Route>
        <Route path='*' element={<Navigate to="/colors" />} />
      </Routes>
    </div>
  );
}

export default App;
