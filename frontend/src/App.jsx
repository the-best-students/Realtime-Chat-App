// import { useState, useCallback } from 'react';

// Main application component
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  return (
    <div className='min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col'>
      <Header />
      <Main />
    </div>
  );
};

export default App;
