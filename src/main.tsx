import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'uno.css';

import SwitchLang from '@comps/SwitchLang';
import '@locales/config';
import '@styles/index.scss';

import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SwitchLang />
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
