import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useAuth } from "../context/authentication";

function AdminPage() {
  const { logout } = useAuth();
  return (
    <>
      <Navbar auth />
      <div className="bg-main h-[29.5rem] flex flex-col items-center">
        <h1 className="mt-20 text-headline1">This is Admin Page</h1>
        <Button primary onClick={logout} className="mt-[3.75rem]">
          Log Out
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;
