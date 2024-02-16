import "./App.css";
import AuthenticatedApp from "./router/AuthenticatedApp";
import UnauthenticatedApp from "./router/UnauthenticatedApp";
import { useAuth } from "./context/authentication";
import { SocketProvider } from "./context/socketContext";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <SocketProvider>
      <AuthenticatedApp />
    </SocketProvider>
  ) : (
    <UnauthenticatedApp />
  );
}

export default App;
