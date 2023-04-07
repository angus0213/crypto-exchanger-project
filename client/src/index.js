import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { CurrentUserProvider } from './components/CurrentUserContext';
import { CurrentPriceProvider } from './components/CurrentPricesContext';
import { CurrentNewsProvider } from './components/CurrentNewsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentPriceProvider>
        <CurrentNewsProvider>
    <App />
    </CurrentNewsProvider>
    </CurrentPriceProvider>
    </CurrentUserProvider>
  </React.StrictMode>
);

