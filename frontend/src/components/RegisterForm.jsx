// src/components/RegisterForm.jsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { registerApi } from '../api/auth.api.js';
import { loginSuccess } from '../store/slices/authSlice.js';

const RegisterForm = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => registerApi(name, email, password),
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      navigate({ to: '/dashboard' });
    }
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to get started with Shortify.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 
                       rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 
                       rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 
                       rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {error.message}
        </div>
      )}

      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="w-full py-3 bg-indigo-600 text-white font-semibold 
                   rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 
                   transition-all disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isPending ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-sm text-gray-600 font-medium">
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors focus:outline-none"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;