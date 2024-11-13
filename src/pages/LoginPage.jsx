import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useSignIn } from '@clerk/clerk-react';

export function LoginPage() {
  const { setActive } = useClerk();
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailAddress, password }),
      });

      if (response.ok) {
        const session = await response.json();
        const { token } = session;
        const signInResponse = await signIn.create({
          identifier: emailAddress,
          password,
          token,
        });
        await setActive({ session: signInResponse.createdSessionId });

        // Login successful, redirect to home
        navigate('/');
      } else {
        // Handle login error
        const data = await response.json();
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
