import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    if (values.email && values.password)
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) {
          console.error("Login error:", error.message);
          alert("The email address or password is incorrect.");
        } else {
          console.log("Login successful:", data);
          let { data: user_roles_view } = await supabase
            .from("user_roles_view")
            .select("roles")
            .eq("user_id", data.user.id);

          if (user_roles_view[0].roles[0] === "User") {
            navigate("/");
          }

          if (user_roles_view[0].roles[0] === "Admin") {
            navigate("/admintest");
          }
        }
      } catch (error) {
        console.error("Unexpected error during login:", error.message);
      }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  return { handleLogin, handleLogout };
};
