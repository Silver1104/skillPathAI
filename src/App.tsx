import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { SignIn, SignInWithEmail } from './components/AuthComponents';
import Dashboard from './components/Dashboard';
import { api } from '../convex/_generated/api';
import './css/App.css';

export default function App() {
  const viewer = useQuery(api.users.viewer);

  return (
    <>
      <Unauthenticated>
        <div className="signin-container">
          <h2>Sign In</h2>
          <SignIn />
          <SignInWithEmail />
        </div>
      </Unauthenticated>
      
      <Authenticated>
        {viewer ? (
          <Dashboard username={viewer.name ?? 'User'} />
        ) : (
          <div>Loading...</div>
        )}
      </Authenticated>
    </>
  );
}
