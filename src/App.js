import { Route, Routes } from "react-router-dom";

import "./css/reset.css"
import "./css/base.css"
import "./css/layout.css"

import Header from "./components/generic/Header";

function App() {
  return (
    <>
      <Header />
      {/* The basic necessary routes */}
      <Routes>
        <Route path="/" exact element={"Home"} />
        <Route path="/sellers" element={"Sellers"} />
        <Route path="/appointments" element={"Appointments"} />
      </Routes>
    </>
  );
}

export default App;
