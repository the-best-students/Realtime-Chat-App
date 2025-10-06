import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { register, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      {/* Title and Subtitle */}
      <div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
          Create an account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
          Start your journey with us today.
        </p>
      </div>

      {/* Registration Form */}
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 -space-y-px overflow-hidden'>
          {/* Username Input */}
          <div>
            <label htmlFor='fullname' className='sr-only'>
              fullName
            </label>
            <input
              id='fullname'
              name='fullname'
              type='text'
              required
              placeholder='fullName'
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              disabled={isSigningUp}
              className='appearance-none rounded-t-xl relative block w-full px-4 py-4 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-base'
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              placeholder='Email address'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSigningUp}
              // Removed rounded-t/b-lg classes to blend the inputs
              className='appearance-none relative block w-full px-4 py-4 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-base'
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isSigningUp}
              className='appearance-none rounded-b-xl relative block w-full px-4 py-4 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-base'
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            disabled={isSigningUp}
            className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 shadow-lg disabled:opacity-50'
          >
            {isSigningUp ? (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              'Sign Up'
            )}
          </button>
        </div>
      </form>

      {/* Sign In Link */}
      <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
        Already have an account?
        <a
          href='#'
          className='font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition duration-150'
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUpScreen;
