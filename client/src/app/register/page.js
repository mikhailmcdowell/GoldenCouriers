'use client';
import { useState } from 'react';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [accountType, setAccountType] = useState('individual');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3); // Success step
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: 'bg-gray-200' };
    if (password.length < 8) return { strength: 1, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 12) return { strength: 2, text: 'Moderate', color: 'bg-yellow-500' };
    return { strength: 3, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header with logo */}
      <header className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2 text-blue-900" />
              <span className="text-blue-900 font-medium">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold">
              <span className="text-blue-900">Golden</span>
              <span className="text-amber-500">Couriers</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress steps */}
            <div className="bg-blue-900 p-6 text-white">
              <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
              <p className="text-blue-100 mt-2 text-center">Join GoldenCouriers today and experience premium delivery services</p>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex flex-col items-center w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-amber-500' : 'bg-blue-700'}`}>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="mt-2 text-sm text-blue-100">Account Info</span>
                </div>
                <div className={`flex-grow h-1 mx-2 ${currentStep >= 2 ? 'bg-amber-500' : 'bg-blue-700'}`}></div>
                <div className="flex flex-col items-center w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-amber-500' : 'bg-blue-700'}`}>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="mt-2 text-sm text-blue-100">Profile Setup</span>
                </div>
                <div className={`flex-grow h-1 mx-2 ${currentStep >= 3 ? 'bg-amber-500' : 'bg-blue-700'}`}></div>
                <div className="flex flex-col items-center w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-amber-500' : 'bg-blue-700'}`}>
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="mt-2 text-sm text-blue-100">Confirmation</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              {currentStep === 1 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-6">
                    {/* Account Type Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => setAccountType('individual')}
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          accountType === 'individual' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            accountType === 'individual' ? 'border-blue-900' : 'border-gray-300'
                          }`}>
                            {accountType === 'individual' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Individual</h3>
                            <p className="text-xs text-gray-500">Personal shipping needs</p>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => setAccountType('business')}
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          accountType === 'business' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            accountType === 'business' ? 'border-blue-900' : 'border-gray-300'
                          }`}>
                            {accountType === 'business' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Business</h3>
                            <p className="text-xs text-gray-500">Corporate shipping solutions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
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
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Create a strong password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Password strength indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`${passwordStrength.color} h-2 rounded-full`} style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Password strength: {passwordStrength.text}</p>
                          <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li className="flex items-center">
                              <span className={formData.password.length >= 8 ? "text-green-500" : "text-gray-400"}>
                                {formData.password.length >= 8 ? "✓" : "○"}
                              </span>
                              <span className="ml-2">At least 8 characters</span>
                            </li>
                            <li className="flex items-center">
                              <span className={/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                                {/[A-Z]/.test(formData.password) ? "✓" : "○"}
                              </span>
                              <span className="ml-2">At least 1 uppercase letter</span>
                            </li>
                            <li className="flex items-center">
                              <span className={/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                                {/[0-9]/.test(formData.password) ? "✓" : "○"}
                              </span>
                              <span className="ml-2">At least 1 number</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Confirm your password"
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
                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    {/* Continue Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {currentStep === 2 && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="First name"
                          />
                        </div>
                      </div>
                      
                      {/* Last Name */}
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 (876) 123-4567"
                        />
                      </div>
                    </div>

                    {accountType === 'business' && (
                      <div className="space-y-2">
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your business name"
                        />
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={() => setAgreeTerms(!agreeTerms)}
                          required
                          className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-amber-600 hover:text-amber-500">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-amber-600 hover:text-amber-500">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Form Navigation */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-full md:w-1/2 flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-blue-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!agreeTerms || isLoading}
                        className={`w-full md:w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                          !agreeTerms ? 'bg-gray-400 cursor-not-allowed' : isLoading ? 'bg-blue-700' : 'bg-blue-900 hover:bg-blue-800'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </span>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {currentStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h2>
                  <p className="text-gray-600 mb-8">
                    We've sent a verification email to <strong>{formData.email}</strong>.<br />
                    Please verify your email to complete your registration.
                  </p>
                  <div className="space-y-4">
                    <Link 
                      href="/login"
                      className="w-full inline-block py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                    >
                      Go to Login
                    </Link>
                    <p className="text-sm text-gray-500">
                      Didn't receive the email?{' '}
                      <button className="text-amber-600 hover:text-amber-500 font-medium">
                        Resend verification email
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Login Link (only show on steps 1 and 2) */}
              {currentStep < 3 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-amber-600 hover:text-amber-500 transition duration-300">
                      Log in
                    </Link>
                  </p>
                </div>
              )}
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