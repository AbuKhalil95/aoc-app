import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./css/reset.css"
import "./css/base.css"
import "./css/layout.css"

import Header from "./components/generic/Header";
import Home from "components/pages/Home";
import { getToken } from 'utils';

function App() {
  const [loggedIn, setLoggedIn] = useState(getToken() !== null);

  return (
    <>
      <Header className="h-1/6 flex flex-row justify-between place-items-center px-10 bg-slate-300" {...{ loggedIn, setLoggedIn }} />
      {/* The basic necessary routes */}
      <main className="p-20 h-5/6">
        <Routes>
          <Route path="/" exact element={<Home {...{ loggedIn, setLoggedIn }} />} />
          <Route path="/sellers" element={"Sellers"} />
          <Route path="/appointments" element={"Appointments"} />
        </Routes>
      </main>
    </>
  );
}

export default App;
