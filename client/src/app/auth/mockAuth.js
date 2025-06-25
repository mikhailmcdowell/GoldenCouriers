// mockAuth.js
'use client';

export const mockSignIn = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const testAccounts = {
        'admin@example.com': { 
          password: 'admin123', 
          role: 'admin' 
        },
        'customer@example.com': { 
          password: 'customer123', 
          role: 'customer' 
        }
      };

      const account = testAccounts[email];
      
      if (!account) {
        resolve({ 
          success: false, 
          error: 'Account not found' 
        });
        return;
      }

      if (password !== account.password) {
        resolve({ 
          success: false, 
          error: 'Invalid password' 
        });
        return;
      }

      resolve({ 
        success: true, 
        user: { 
          email, 
          role: account.role 
        } 
      });
    }, 500);
  });
};

export const mockSignOut = () => {
  sessionStorage.removeItem('mockAuth');
  sessionStorage.removeItem('mockUser');
};

export const checkAuth = () => {
  return sessionStorage.getItem('mockAuth') === 'true';
};

export const getUserRole = () => {
  const user = sessionStorage.getItem('mockUser');
  return user ? JSON.parse(user).role : null;
};