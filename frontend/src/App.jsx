// import { useState, useCallback } from 'react';

// Main application component
import React from 'react';
import Main from './components/Main';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col'>
      <Main />
      <Toaster />
    </div>
  );
};

export default App;
