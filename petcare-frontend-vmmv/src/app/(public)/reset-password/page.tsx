'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ResetPasswordForm from '@/modules/auth/view/ResetPasswordForm';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Token Inválido</h1>
          <p className="mt-2 text-gray-600">El enlace de recuperación no es válido.</p>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
