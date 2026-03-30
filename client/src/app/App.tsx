import { BrowserRouter } from "react-router-dom"
import AppRouter from "./AppRouter"
import { useEffect, useState } from "react";
import { checkAuth } from "../features/auth/api/authAPI";
import { useStore } from "../shared/hooks/useStore";

function App() {
  const { user } = useStore();

  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    checkAuth().then( data => {
        user.setUser(data.user);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return null;
  };

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
