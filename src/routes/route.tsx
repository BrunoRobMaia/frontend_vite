import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/page";
import { Register } from "../pages/Register/page";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <Register
            onToggleForm={() => {}}
            onRegister={() => {}}
            isLoading={false}
          />
        }
      />
      {/* <Route
        path="/"
        element={
          <PrivateRoutes
            roles={["ROLE_ADMIN", "ROLE_ASSOCIATE", "ROLE_SYSTEM"]}
          />
        }
      >
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/theses" element={<ThesesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/eletronic_process" element={<EletronicProcessPage />} />
          <Route path="/capturedata" element={<CaptureDataPage />} />
          <Route path="/repeat_theses" element={<RepeatThesesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/payment" element={<CompanyPayments />} />
          <Route path="/admin" element={<AdminPayments />} />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default RoutesComponent;
