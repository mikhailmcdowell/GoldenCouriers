'use client';
import ProtectedRoute from './protectedroute';

export default function AdminRoute({ children }) {
  return (
    <ProtectedRoute adminOnly>
      {children}
    </ProtectedRoute>
  );
}