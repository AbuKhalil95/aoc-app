import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./css/reset.css"
import "./css/base.css"
import "./css/layout.css"

import Header from "components/generic/Header";
import Home from "components/pages/Home";
import Sellers from "components/pages/Sellers";
import { decodeToken, getToken, getType } from 'utils';
import Appointments from "components/pages/Appointments";

function App() {
  const [loggedIn, setLoggedIn] = useState(getToken() !== null);
  const [type, setType] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // TODO: refactor setLoggedIn and setType to be here instead, allowing for ease of change and centralization.
  useEffect(() => {
    if (getToken() !== null) {
      setLoggedIn(true);
    }
  }, [getToken()]);

  useEffect(() => {
    setTimeout(async () => {
      const { type, id } = await decodeToken();
      setType(type);
      setUserId(id)
      await type === 'buyers' ? navigate('/sellers') : navigate('/appointments');
    }, 1000);
  }, []);

  return (
    <>
      <script src="https://kit.fontawesome.com/46e61ad928.js" crossOrigin="anonymous"></script>
      <Header className="h-fit flex flex-row justify-between place-items-center p-10 bg-slate-300 shadow-slate-500 shadow" {...{ loggedIn, setLoggedIn, setType }} />
      {/* The basic necessary routes */}
      <main className="p-20 h-5/6">
        <Routes>
          <Route path="/" exact element={<Home {...{ loggedIn }} />} />
          <Route path="/sellers" element={<Sellers {...{ loggedIn, type, userId }} />} />
          <Route path="/appointments" element={<Appointments {...{ loggedIn, type, userId }} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
