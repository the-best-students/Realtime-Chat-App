import React from 'react';

import { Route, Routes } from 'react-router-dom';
import SignUpScreen from '../pages/auth/SignUpScreen.jsx';
import SignInScreen from '../pages/auth/SignInScreen.jsx';
import ChatContainer from './ChatContainer.jsx';
const Main = () => {
  return (
    <div className='flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Routes>
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/signIn' element={<SignInScreen />} />
        <Route path='/chat' element={<ChatContainer />} />
      </Routes>
    </div>
  );
};

export default Main;
