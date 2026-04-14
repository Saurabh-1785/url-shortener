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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Create Account 🚀
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 border border-gray-300 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-gray-300 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Min 6 characters"
          className="w-full px-4 py-3 border border-gray-300 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}

      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="w-full py-3 bg-blue-600 text-white font-semibold 
                   rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;