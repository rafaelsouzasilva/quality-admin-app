import React from 'react';
import Routes from './routes';
import './assets/css/reset.css';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </>
);

export default App;
