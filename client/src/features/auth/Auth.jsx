// import axios from "axios";

// export const useAuth = () => {
//   const handleLogin = async (values) => {
//     if (values.email && values.password) {
//       try {
//         const response = await axios.post("/login", {
//           email: values.email,
//           password: values.password,
//         });

//         if (response.status === 200) {
//           const data = response.data;
//           console.log("Login successful:", data);
//         } else {
//           console.error("Login error:", response.data.error);
//           alert("The email address or password is incorrect.");
//         }
//       } catch (error) {
//         console.error("Unexpected error during login:", error.message);
//       }
//     }
//   };

// const handleLogout = async () => {
//   const { error } = await supabase.auth.signOut();
//   navigate("/");
//   window.location.reload();
// };

//   return { handleLogin, handleLogout };
// };
