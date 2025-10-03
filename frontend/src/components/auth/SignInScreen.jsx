import React, { useState, useCallback } from 'react';

const SignInScreen = () => {
  const [formData, setFormData] = useState({
    email: '', // Represents Username or Email
    password: '',
  });

  // State for loading/submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Handler for all input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Handler for form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setMessage('Signing in...');

      // Simulate an API call delay
      setTimeout(() => {
        // Basic validation check
        if (
          formData.email === 'test@example.com' &&
          formData.password === 'password'
        ) {
          setMessage('Sign in successful! Welcome back.');
          // In a real app, redirection would occur here
        } else {
          setMessage('Invalid credentials. Please try again.');
        }

        console.log('Sign In attempt with:', formData);
        setIsSubmitting(false);
      }, 1500);
    },
    [formData]
  );
  return (
    <div className='w-full max-w-md p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition duration-300'>
      {/* Title and Subtitle */}
      <div className='text-center'>
        <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white'>
          Welcome back
        </h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          Sign in to continue to your account.
        </p>
      </div>

      {/* Submission Message */}
      {message && (
        <div
          className={`p-3 text-center text-sm rounded-lg font-medium transition duration-300
              ${
                message.includes('successful')
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
              }`}
        >
          {message}
        </div>
      )}

      {/* Sign In Form */}
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-4'>
          {/* Email/Username Input */}
          <div>
            <label htmlFor='email' className='sr-only'>
              Username or Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              placeholder='Username or Email'
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className='w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-150 sm:text-base shadow-inner'
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
              onChange={handleChange}
              disabled={isSubmitting}
              className='w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-150 sm:text-base shadow-inner'
            />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className='text-right'>
          <a
            href='#'
            className='text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150'
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 shadow-lg disabled:opacity-50'
          >
            {isSubmitting ? (
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
              'Sign In'
            )}
          </button>
        </div>
      </form>

      {/* Sign Up Link */}
      <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
        Don't have an account?
        <a
          href='#'
          className='font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition duration-150'
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignInScreen;
