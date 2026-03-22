import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserStore from './store/UserStore.ts';
import WeaponStore from './store/WeaponStore.ts';

interface ContextValue {
  user: UserStore;
  weapon: WeaponStore;
}

export const Context = createContext<ContextValue | null>(null);

createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    user: new UserStore(),
    weapon: new WeaponStore()
  }}>
    <StrictMode>
      <App />
    </StrictMode>
  </Context.Provider>
)
