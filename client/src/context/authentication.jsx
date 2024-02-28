import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const getState = () => {
  // ดึงค่า token จาก local storage
  const token = localStorage.getItem("token");

  if (token) {
    try {
      //   ถอดรหัส token เพื่อให้ได้ข้อมูล
      const userDataFromToken = jwtDecode(token);
      //   console.log(userDataFromToken);
      return userDataFromToken;
    } catch (error) {
      // หากเกิดข้อผิดพลาดในการถอดรหัส token
      console.error("Error decoding token:", error);
      // ส่งคืนค่า null เพื่อบอกว่าไม่สามารถถอดรหัส token ได้
      return null;
    }
  } else {
    // หากไม่มี token ใน local storage
    return null;
  }
};

function AuthProvider(props) {
  const navigate = useNavigate();
  const [state, setState] = useState(getState());
  const [loginError, setLoginError] = useState();

  const login = async (data) => {
    try {
      if (data.email && data.password) {
        const result = await axios.post("http://localhost:3000/login", {
          email: data.email,
          password: data.password,
        });

        const token = result.data.token;
        localStorage.setItem("token", token);
        const userDataFromToken = jwtDecode(token);
        setState(getState());
        if (userDataFromToken.role === "Admin") {
          navigate("/admin/package");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setLoginError(error);
      // console.error("Login error:", error);
      // alert("An error occurred during login. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/");
    window.location.reload(false);
  };
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated,
        loginError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
