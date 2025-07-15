import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './components/ui/provider.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider>
      <CartProvider>
        <AuthProvider>
       <App /> 
      </AuthProvider>
      </CartProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
