import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Dashboard } from './Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <SignedOut>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-950 p-4">
          
          {/* Header Branding */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              UniWallet <span className="text-indigo-400">🪙✨</span>
            </h1>
            <p className="mt-2 text-sm text-indigo-200/80">
              Your starry night financial visualizer
            </p>
          </div>

          {/* Styled Clerk Sign In */}
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#6366f1', // Indigo-500 matching Tailwind
                colorBackground: 'rgba(15, 23, 42, 0.85)', // Dark translucent Slate-900
                colorText: '#f8fafc',
                colorTextSecondary: '#94a3b8',
                colorInputBackground: '#1e293b',
                colorInputText: '#ffffff',
                colorBorder: '#334155',
                borderRadius: '1rem',
              },
              elements: {
                card: 'border border-indigo-500/20 shadow-2xl backdrop-blur-xl',
                headerTitle: 'text-slate-100 font-bold',
                headerSubtitle: 'text-slate-400',
                socialButtonsBlockButton: 
                  'border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-all',
                formButtonPrimary: 
                  'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all',
                footerActionLink: 'text-indigo-400 hover:text-indigo-300',
              },
            }}
          />
        </div>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}