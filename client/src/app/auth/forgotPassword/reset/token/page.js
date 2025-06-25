'use client';
import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Password validation
  const validatePassword = (password) => {
    const errors = {};
    
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.number = 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.special = 'Password must contain at least one special character (@$!%*?&)';
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    setError(null);
    setValidationErrors({});
    
    // Validate passwords
    const passwordErrors = validatePassword(newPassword);
    if (Object.keys(passwordErrors).length > 0) {
      setValidationErrors(passwordErrors);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // In a real app, this would use router.push('/auth/login')
    setIsSuccess(false);
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
    setValidationErrors({});
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        {/* Header with logo */}
        <header className="w-full py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <button onClick={handleBackToLogin} className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2 text-blue-900" />
                <span className="text-blue-900 font-medium">Back to Login</span>
              </button>
              <div className="text-2xl font-bold">
                <span className="text-blue-900">Golden</span>
                <span className="text-amber-500">Couriers</span>
              </div>
            </div>
          </div>
        </header>

        {/* Success content */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-green-600 p-6 text-center text-white">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Password Reset Successful</h1>
                <p className="text-green-100 mt-2">Your password has been updated</p>
              </div>
              
              <div className="p-6 sm:p-8 text-center">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">
                      Your account is now secure with your new password
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      You can now log in with your updated credentials
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleBackToLogin}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                  >
                    Continue to Login
                  </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Security Tip:</strong> Keep your password safe and don't share it with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2025 GoldenCouriers. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
                Help Center
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header with logo */}
      <header className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button onClick={handleBackToLogin} className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2 text-blue-900" />
              <span className="text-blue-900 font-medium">Back to Login</span>
            </button>
            <div className="text-2xl font-bold">
              <span className="text-blue-900">Golden</span>
              <span className="text-amber-500">Couriers</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-900 p-6 text-center text-white">
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-blue-100 mt-2">Create a new secure password</p>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-gray-600 text-center">
                  Enter your new password below. Make sure it's strong and secure.
                </p>
              </div>

              <div>
                <div className="space-y-6">
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="new-password"
                        name="new-password"
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               placeholder-gray-400 text-gray-900"
                        placeholder="Enter new password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength - 1] || 'bg-gray-200'}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {strengthLabels[passwordStrength - 1] || 'Too Weak'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               placeholder-gray-400 text-gray-900"
                        placeholder="Confirm new password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                    <ul className="text-xs space-y-1">
                      <li className={`flex items-center ${newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">•</span>
                        At least 8 characters long
                      </li>
                      <li className={`flex items-center ${/(?=.*[a-z])/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">•</span>
                        One lowercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*[A-Z])/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">•</span>
                        One uppercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*\d)/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">•</span>
                        One number
                      </li>
                      <li className={`flex items-center ${/(?=.*[@$!%*?&])/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">•</span>
                        One special character (@$!%*?&)
                      </li>
                    </ul>
                  </div>

                  {/* Validation Errors */}
                  {Object.keys(validationErrors).length > 0 && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Password requirements not met
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <ul className="list-disc list-inside space-y-1">
                              {Object.values(validationErrors).map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Error
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            {error}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !newPassword || !confirmPassword}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                        isLoading || !newPassword || !confirmPassword 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-900 hover:bg-blue-800'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating Password...
                        </span>
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Security Note:</strong> Your password will be encrypted and stored securely. This reset link will expire after use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 GoldenCouriers. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}