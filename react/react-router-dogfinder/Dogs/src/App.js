import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import DogList from './DogList';
import DogDetails from './DogDetails';
import DogNav from './DogNav';

function App() {
  const [dogList, setDogList] = useState([
    {
      name: "Whiskey",
      age: 5,
      src: "whiskey",
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: "duke",
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: "perry",
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: "tubby",
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ])
  const [dog, setDog] = useState("")
  const getDog = evt => {

    const name = evt.target.innerText
    const dogObj = dogList.filter(d => name == d.name)

    setDog(oldDog => dogObj[0])

  }


  return (
    <div className="App">
      <DogNav names={dogList.map(dog => dog.name)} getDog={getDog} />
      <Routes>
        <Route path="/:name" element={<DogDetails dogObj={dog} />} />
        <Route path="/" element={<DogList dogList={dogList} getDog={getDog} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
