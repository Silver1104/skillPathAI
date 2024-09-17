// src/components/AuthComponents.tsx
import React from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import '../css/AuthComponents.css';

// Import your logo images
import githubLogo from '../assets/github-logo.png'; // Update the path as necessary
import googleLogo from '../assets/google-logo.png'; // Update the path as necessary
import { Input } from './ui/input';
import { Button } from './ui/button';

export const SignIn: React.FC = () => {
  const { signIn } = useAuthActions();

  return (
    <div className="auth-buttons-container">
      <img
        src={githubLogo}
        alt="Sign in with GitHub"
        className="auth-github-logo"
        onClick={() => void signIn('github')}
      />
      <img
        src={googleLogo}
        alt="Sign in with Google"
        className="auth-google-logo"
        onClick={() => void signIn('google')}
      />
    </div>
  );
};

export const SignInWithEmail: React.FC = () => {
  const { signIn } = useAuthActions();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn('resend', formData);
      }}
    >
      <Input name="email" placeholder="Email" type="text" />
      <Button type="submit">Send sign-in link</Button>
    </form>
  );
};

export const SignOut: React.FC = () => {
  const { signOut } = useAuthActions();
  return <Button onClick={() => void signOut()}>Sign out</Button>;
};
