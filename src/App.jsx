import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtecteRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Users from "./pages/Users";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./pages/pagesStyle/pages.css";
import "./pages/pagesStyle/tables.css";
import "./pages/pagesStyle/crudPop.css";
import History from "./pages/History";
import { useState } from "react";
import MyHistory from "./pages/MyHistory";

function App() {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);

  const [viewLogo, setViewLogo] = useState(true);

  setTimeout(() => {
    setViewLogo(false);
  }, 1000);

  return (
    <>
      {viewLogo && (
        <div className="TimeLogo_container">
          <img src="./logo.png" alt="" />
        </div>
      )}
      <ToastContainer />
      {userData && <Header userData={userData} />}

      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/history/:id"
            element={<History userData={userData} />}
          />
          <Route
            path="/my-history"
            element={<MyHistory userData={userData} />}
          />

          <Route path="/users" element={<Users userData={userData} />} />
          <Route path="/" element={<Home userData={userData} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
