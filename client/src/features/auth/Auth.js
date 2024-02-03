import { supabase } from "../../supabaseClient";

export const handleLogin = async (values) => {
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
      }
    } catch (error) {
      console.error("Unexpected error during login:", error.message);
    }
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
};
