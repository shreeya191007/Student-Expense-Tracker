import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Dashboard } from './Dashboard';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Student Budget Visualizer</h1>
          <p className="text-slate-500">Please sign in to access your dashboard.</p>
          <SignInButton mode="modal">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
              Sign In / Sign Up
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </ClerkProvider>
  );
}