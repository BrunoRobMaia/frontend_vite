import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/page";
import { Register } from "../pages/Register/page";
import { AdminPage } from "../pages/Home/page";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
};

export default RoutesComponent;
