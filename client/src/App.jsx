import "./App.css";
import AuthenticatedApp from "./router/AuthenticatedApp";
import UnauthenticatedApp from "./router/UnauthenticatedApp";
import { useAuth } from "./context/authentication";
import { SocketProvider } from "./context/socketContext";
import { MerryLimitProvider } from "./context/merryLimitContext";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <MerryLimitProvider>
      <SocketProvider>
        <AuthenticatedApp />
      </SocketProvider>
    </MerryLimitProvider>
  ) : (
    <UnauthenticatedApp />
  );
}

export default App;
