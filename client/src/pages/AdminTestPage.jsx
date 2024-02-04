import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useAuth } from "../features/auth/Auth";

function AdminPage() {
  const { handleLogout } = useAuth();
  return (
    <>
      <Navbar auth />
      <h1>This is Admin Page</h1>
      <Button primary onClick={handleLogout} className="mt-[3.75rem]">
        Log Out
      </Button>
      <Footer />
    </>
  );
}

export default AdminPage;
