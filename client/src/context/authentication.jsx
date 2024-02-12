import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const getState = () => {
  const token = localStorage.getItem("Token");
  if (token) {
    const userDataFromToken = jwtDecode(token);
    return userDataFromToken;
  } else {
    return null;
  }
};

function AuthProvider(props) {
  const navigate = useNavigate();
  const [state, setState] = useState(getState());
  //   console.log(state);

  //   const login = async (data) => {
  //     const result = await axios.post("http://localhost:3000/login", data);

  const login = async (data) => {
    if (data.email && data.password) {
      const result = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });

      const token = result.data.token;
      localStorage.setItem("token", token);
      setState(getState());
      navigate("/");
    }
  };

  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log("Login successful:", data);
  //     } else {
  //       console.error("Login error:", response.data.error);
  //       alert("The email address or password is incorrect.");
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error during login:", error.message);
  //   }
  // }
  //   };

  //   };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/");
    window.location.reload(false);
  };
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
