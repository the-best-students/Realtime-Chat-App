import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import {
  MessagesSquareIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  SparklesIcon,
} from 'lucide-react';
import { Link } from 'react-router';

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className='w-full max-w-5xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/40 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden'>
      <div className='w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center'>
        <div className='text-center mb-10'>
          <MessagesSquareIcon className='w-14 h-14 mx-auto text-indigo-400 mb-4' />

          <h2 className='text-3xl font-bold'>Create Your Account ✨</h2>
          <p className='text-slate-400 mt-2'>
            Join <span className='text-indigo-400 font-semibold'>ChatWave</span>{' '}
            and start connecting instantly!
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* FULL NAME */}
          <div>
            <label className='block text-slate-300 font-medium mb-2'>
              Full Name
            </label>
            <div className='relative'>
              <UserIcon className='w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                type='text'
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className='w-full pl-10 pr-3 py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                placeholder='John Doe'
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className='block text-slate-300 font-medium mb-2'>
              Email
            </label>
            <div className='relative'>
              <MailIcon className='w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                type='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full pl-10 pr-3 py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                placeholder='you@example.com'
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className='block text-slate-300 font-medium mb-2'>
              Password
            </label>
            <div className='relative'>
              <LockIcon className='w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                type='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='w-full pl-10 pr-3 py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                placeholder='••••••••'
                required
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type='submit'
            disabled={isSigningUp}
            className='w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white flex items-center justify-center transition duration-200 disabled:opacity-70'
          >
            {isSigningUp ? (
              <LoaderIcon className='w-5 h-5 animate-spin text-white' />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <Link
            to='/login'
            className='text-indigo-400 hover:text-indigo-300 text-sm transition'
          >
            Already have an account? <span className='underline'>Log In</span>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE — ILLUSTRATION / CHAT PREVIEW */}
      <div className='hidden md:flex w-1/2 bg-gradient-to-br from-indigo-700/20 to-slate-900/40 items-center justify-center relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-800/40 to-slate-900/60 backdrop-blur-md' />
        <div className='relative z-10 space-y-4 px-8 py-12'>
          <div className='flex flex-col space-y-2 text-sm'>
            <div className='self-start bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-4 py-2 rounded-xl max-w-[80%]'>
              Welcome to{' '}
              <span className='font-semibold text-indigo-300'>ChatWave</span>!
              💬
            </div>
            <div className='self-end bg-slate-700/60 text-slate-200 px-4 py-2 rounded-xl max-w-[80%]'>
              Thanks! Just signed up 🚀
            </div>
            <div className='self-start bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-4 py-2 rounded-xl max-w-[80%]'>
              Let’s start chatting in real time 😄
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
