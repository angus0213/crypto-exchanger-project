import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { CurrentUserProvider } from './components/CurrentUserContext';
import { CurrentPriceProvider } from './components/CurrentPricesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentPriceProvider>
    <App />
    </CurrentPriceProvider>
    </CurrentUserProvider>
  </React.StrictMode>
);

