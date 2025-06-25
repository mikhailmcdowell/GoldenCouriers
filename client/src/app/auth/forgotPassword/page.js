'use client';
import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // In a real app, this would use router.push('/auth/login')
    setIsSuccess(false);
    setEmail('');
    setError(null);
  };

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
                <h1 className="text-2xl font-bold">Check Your Email</h1>
                <p className="text-green-100 mt-2">Reset instructions sent successfully</p>
              </div>
              
              <div className="p-6 sm:p-8 text-center">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Check your inbox and follow the link to reset your password. 
                    The link will expire in 1 hour.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleBackToLogin}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                  >
                    Back to Login
                  </button>
                  
                  <p className="text-sm text-gray-500">
                    Didn't receive the email?{' '}
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="font-medium text-amber-600 hover:text-amber-500 transition duration-300"
                    >
                      Try again
                    </button>
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
              <h1 className="text-2xl font-bold">Forgot Password?</h1>
              <p className="text-blue-100 mt-2">No worries, we'll help you reset it</p>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-gray-600 text-center">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <div>
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               placeholder-gray-400 text-gray-900"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
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
                      disabled={isLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                        isLoading ? 'bg-blue-700' : 'bg-blue-900 hover:bg-blue-800'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Reset Instructions'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <button 
                    onClick={handleBackToLogin}
                    className="font-medium text-amber-600 hover:text-amber-500 transition duration-300"
                  >
                    Back to Login
                  </button>
                </p>
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Need help?</strong> Contact our support team if you're having trouble accessing your account.
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