import "./App.css";
import AuthenticatedApp from "./router/AuthenticatedApp";
import UnauthenticatedApp from "./router/UnauthenticatedApp";
import { useAuth } from "./context/authentication";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
