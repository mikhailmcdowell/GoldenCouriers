'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Package, 
  Truck,
  MapPin,
  Eye,
  Search,
  Bell,
  Settings,
  User,
  Calculator,
  Archive,
  CreditCard,
  Home,
  FileText
} from 'lucide-react';
import ProtectedRoute from '../auth/components/auth/protectedroute';

export default function CustomerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userEmail, setUserEmail] = useState('user@example.com');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/customer/dashboard' },
    { id: 'track', label: 'Track', icon: MapPin, href: '/customer/dashboard/track' },
    { id: 'prealert', label: 'Prealert/Invoice', icon: FileText, href: '#' },
    { id: 'shop', label: 'Shop For Me', icon: Package, href: '#' },
    { id: 'rate', label: 'Rate', icon: CreditCard, href: '#' },
    { id: 'calculator', label: 'Calculator', icon: Calculator, href: '/customer/dashboard/calculator' },
    { id: 'profile', label: 'Profile', icon: User, href: '/customer/profile' },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockAuth');
      localStorage.removeItem('mockUserEmail');
      sessionStorage.removeItem('mockAuth');
      window.location.href = '/auth/login';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
            <span className="text-xl font-bold">
              <span className="text-white">Golden</span>
              <span className="text-amber-500">Couriers</span>
            </span>
          </div>
          
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      activeTab === item.id 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition duration-150`}
                  >
                    <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="text-gray-400 text-sm mb-2">ACCOUNT</div>
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-150"
            >
              <User className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                  >
                    <Menu size={24} />
                  </button>
                  <div className="ml-4 flex items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search coming soon"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Bell size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Settings size={20} />
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userEmail?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {userEmail || 'User'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </ProtectedRoute>
  );
}