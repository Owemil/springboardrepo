import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import VendingMachine from "./VendingMachine";
import CheezIt from "./CheezIt";
import Cosmic from "./Cosmic";
import Milk from "./Milk";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<VendingMachine />} />
          <Route exact path="/cheezit" element={<CheezIt />} />
          <Route exact path="/cosmic" element={<Cosmic />} />
          <Route exact path="/milk" element={<Milk />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
