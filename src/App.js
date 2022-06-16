import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/Signup";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/resetPassword" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
