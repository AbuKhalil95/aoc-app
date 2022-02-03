import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./css/reset.css"
import "./css/base.css"
import "./css/layout.css"

import Header from "components/generic/Header";
import Home from "components/pages/Home";
import Sellers from "components/pages/Sellers";
import { decodeToken, getToken } from 'utils';

function App() {
  const [loggedIn, setLoggedIn] = useState(getToken() !== null);
  const [type, setType] = useState(decodeToken()?.type || null);

  // TODO: refactor setLoggedIn and setType to be here instead, allowing for ease of change and centralization.
  useEffect(() => {
  }, [getToken()])

  return (
    <>
      <script src="https://kit.fontawesome.com/46e61ad928.js" crossOrigin="anonymous"></script>
      <Header className="h-fit flex flex-row justify-between place-items-center p-10 bg-slate-300 shadow-slate-500 shadow" {...{ loggedIn, setLoggedIn, setType }} />
      {/* The basic necessary routes */}
      <main className="p-20 h-5/6">
        <Routes>
          <Route path="/" exact element={<Home {...{ loggedIn, setLoggedIn, setType }} />} />
          <Route path="/sellers" element={<Sellers {...{ loggedIn, type }} />} />
          <Route path="/appointments" element={"Appointments"} />
        </Routes>
      </main>
    </>
  );
}

export default App;
