import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useSignIn } from '@clerk/clerk-react';

export function RegisterPage() {
  const { setActive } = useClerk(); // https://clerk.com/docs/references/javascript/sign-in/sign-in#create
  const { signIn } = useSignIn(); // https://clerk.com/docs/references/javascript/sign-in/sign-in#create
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
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

        // Registration successful, redirect to login or home
        navigate('/');
      } else {
        // Handle registration error
        const data = await response.json();
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
