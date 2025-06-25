// components/auth/protectedroute.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth, getUserRole } from '../../mockAuth';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const router = useRouter();

  useEffect(() => {
    // Client-side check only
    const isAuthenticated = checkAuth();
    const userRole = getUserRole();
    
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else if (adminOnly && userRole !== 'admin') {
      router.push('/customer/dashboard');
    }
  }, [router, adminOnly]);

  return children;
}