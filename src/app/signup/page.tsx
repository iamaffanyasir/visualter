import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthForm } from '@/components/AuthForm';

export const metadata: Metadata = { title: 'Create account', robots: { index: false } };

export default function SignupPage() {
  return (
    <section className="page-hero auth">
      <div className="container">
        <img src="/brand/mark.svg" alt="" width={64} height={64} className="auth__mark" />
        <h1 className="headline">Create your account.</h1>
        <p className="lede">Buy once, download again whenever you need it.</p>
        <Suspense fallback={null}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </section>
  );
}
