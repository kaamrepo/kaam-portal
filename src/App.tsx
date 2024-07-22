import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useLoginStore from "./store/login.store";
import AppRouter from "./routes/AppRouter";
function App() {
  const { getAuthDetails, isAuthenticated, feScopes } = useLoginStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !feScopes?.length) {
      getAuthDetails();
      navigate("/");
    }
  }, [getAuthDetails]);
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  );
}

export default App;
