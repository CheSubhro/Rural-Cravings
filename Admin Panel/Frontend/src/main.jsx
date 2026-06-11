import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'; 
import '@mantine/notifications/styles.css'; 
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'; 
import { Provider } from 'react-redux'; 
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <Notifications position="top-right" zIndex={1000} />
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
)

