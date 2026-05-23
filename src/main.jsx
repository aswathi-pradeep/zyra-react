import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { BrowserRouter } from 'react-router-dom'
import { NavbarProvider } from './context/NavbarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <NavbarProvider>
        <App />
        </NavbarProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
