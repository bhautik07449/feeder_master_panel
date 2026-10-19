import React from 'react';
import AppRouter from '@/router/router';
import ThemeInitializer from '@/components/common/ThemeInitializer';

function App() {
  return (
    <>
      <AppRouter />
      <ThemeInitializer />
    </>
  );
}

export default App;
