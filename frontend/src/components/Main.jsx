import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import SignUpPage from '../pages/auth/SignUpPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import PageLoader from './PageLoader.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { useEffect } from 'react';

const Main = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      <Routes>
        <Route
          path='/'
          element={authUser ? <ChatPage /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to={'/'} />}
        />
        <Route
          path='/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
