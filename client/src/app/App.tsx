import { BrowserRouter } from "react-router-dom"
import AppRouter from "./AppRouter"
import { useEffect, useState } from "react";
import { checkAuth } from "../features/auth/api/authAPI";
import { useStore } from "../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Spinner } from "../shared/ui/Spinner/Spinner";

const App = observer(() => {
  const { user } = useStore();

  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    checkAuth().then( data => {
        user.setUser(data.user);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false))
  }, [user]);

  if (loading) {
    return <Spinner />;
  };

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App;
