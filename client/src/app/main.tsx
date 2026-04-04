import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import UserStore from '../entities/user/model/UserStore.ts';
import WeaponStore from '../entities/weapon/model/WeaponStore.ts';
import '../shared/styles/index.scss'
import BasketStore from '../entities/basket/model/BasketStore.ts';

interface ContextValue {
  user: UserStore;
  weapon: WeaponStore;
  basket: BasketStore;
}

export const Context = createContext<ContextValue | null>(null);

console.log("API URL:", import.meta.env.VITE_REACT_APP_API_URL);

createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    user: new UserStore(),
    weapon: new WeaponStore(),
    basket: new BasketStore()
  }}>
    <StrictMode>
      <App />
    </StrictMode>
  </Context.Provider>
)
