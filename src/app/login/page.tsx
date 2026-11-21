import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthForm } from '@/components/AuthForm';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } };

export default function LoginPage() {
  return (
    <section className="page-hero auth">
      <div className="container">
        <img src="/brand/mark.svg" alt="" width={64} height={64} className="auth__mark" />
        <h1 className="headline">Sign in.</h1>
        <p className="lede">Your purchases, ready to download on any device.</p>
        <Suspense fallback={null}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </section>
  );
}
