import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./i18n/config.ts";

// Test fix iphone touch error
window.Telegram.WebApp?.ready();
window.Telegram.WebApp?.expand();

window.Telegram.WebApp?.disableVerticalSwipes()

createRoot(document.getElementById('root')!).render(
    <App />
)
