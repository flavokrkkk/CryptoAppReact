import React from 'react';
import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import { CryptoContextProvider } from './context/cryptoContext';
import AppLayout from './components/layout/AppLayout';



const App = () => {
  return (
    <CryptoContextProvider>
        <AppLayout/>
    </CryptoContextProvider>
    
  );
};

export default App;
