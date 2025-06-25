'use client';
import { 
  Edit,
  Shield,
  ChevronRight,
  User,
  Truck,
  Package,
  Users,
  CreditCard,
  MapPin
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header - Made more compact */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <ChevronRight className="h-3 w-3 rotate-180 mr-1" />
            Dashboard
          </button>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span>Profile</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account information and preferences</p>
        </div>
      </div>

      {/* Main Grid - Adjusted gap and column proportions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Content (wider) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Card - More compact */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-md font-semibold text-gray-800 flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                Personal Information
              </h2>
              <button className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition font-medium">
                View Authorized Users
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "First Name", value: "Mikhail", id: "firstName" },
                  { label: "Last Name", value: "Mcdowell", id: "lastName" },
                  { label: "Mailbox", value: "ETEL1", id: "mailbox" }
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {[
                  { label: "Email", value: "mikhailmcdowell4@gmail.com", type: "email", id: "email" },
                  { label: "Mobile", value: "8763663183", type: "tel", id: "mobile" },
                  { label: "TRN", value: "132485885", type: "text", id: "trn" }
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-md font-semibold text-gray-800 flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                Primary Address
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Street Address", value: "26 Wickie-Wackie Dr", id: "street" },
                  { label: "City", value: "Bull Bay", id: "city" },
                  { label: "Parish", value: "St. Andrew", id: "parish" }
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition font-medium flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Address
                </button>
              </div>
            </div>
          </div>

          {/* Password Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-md font-semibold text-gray-800 flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                Password Management
              </h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats (narrower) */}
        <div className="space-y-4">
          {/* Stats Cards - More compact and consistent */}
          {[
            { icon: CreditCard, value: "$1500", label: "Account Balance", color: "text-green-600" },
            { icon: Truck, value: "2", label: "In Transit", color: "text-blue-600" },
            { icon: Package, value: "2", label: "Ready for Pickup", color: "text-blue-600" },
            { icon: Users, value: "0", label: "Authorized Users", color: "text-teal-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${stat.color.replace('text-', '')}-100 mr-3`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Shipping Address Card - More compact */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
              SHIPPING ADDRESS
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Name", value: "Mikhail Mcdowell" },
                { label: "Address 1", value: "3750 W. Oakland Park Blvd" },
                { label: "Address 2", value: "ETEL1507", highlight: true },
                { label: "City", value: "Lauderdale Lakes" },
                { label: "State", value: "Florida" },
                { label: "Zip", value: "33311" }
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="text-gray-500 w-20 flex-shrink-0">{item.label}</div>
                  <div className={`${item.highlight ? 'font-bold text-red-600' : 'text-gray-700'}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}