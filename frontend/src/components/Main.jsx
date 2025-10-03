import React from 'react';

import { Route, Routes } from 'react-router-dom';
import SignUpScreen from './auth/SignUpScreen';
import SignInScreen from './auth/SignInScreen';

const Main = () => {
  return (
    <div className='flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Routes>
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/signIn' element={<SignInScreen />} />
      </Routes>
    </div>
  );
};

export default Main;
