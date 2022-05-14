import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'uno.css';

import '@locales/config';
import GoBack from '@comps/GoBack';
import '@styles/index.scss';

import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoBack />
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
