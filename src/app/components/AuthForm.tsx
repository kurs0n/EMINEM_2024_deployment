"use client";
import { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
      const payload = isLogin
        ? { email, password } // For sign-in
        : { username, email, password }; // For sign-up

      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful login/signup here
      // e.g., redirect to another page, or show a success message
      console.log("Success:", response.data);
      
    } catch (error) {
      // If the error has a response (error from the server), use that message; otherwise, use a generic message.
      const message = error.response?.data?.message || 'An error occurred';
      console.error("Error:", message);
      setErrorMessage(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 underline mt-4 block text-center"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
      </button>
    </div>
  );
};

export default AuthForm;