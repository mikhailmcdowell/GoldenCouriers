'use client';
import { AdminRoute } from '../../auth/components/auth/adminroute'
import { useEffect, useState } from 'react';
import { 
  Package,
  Truck,
  Users,
  AlertTriangle,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  Plus,
  Download,
  CheckCircle,
  Clock,
  MapPin,
  Archive,
  UserPlus
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [unassignedPackages, setUnassignedPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('all');
  const [selectedPackages, setSelectedPackages] = useState([]);

  useEffect(() => {
    // Mock data for unassigned packages
    setUnassignedPackages([
      {
        id: 'PKG001',
        reference: 'REF-2024-001',
        carrier: 'DHL',
        weight: '2.5 lbs',
        description: 'Electronics',
        scanDate: '2024-06-18',
        status: 'Warehouse',
        trackingNumber: 'DHL123456789'
      },
      {
        id: 'PKG002',
        reference: 'REF-2024-002',
        carrier: 'UPS',
        weight: '1.2 lbs',
        description: 'Documents',
        scanDate: '2024-06-18',
        status: 'Warehouse',
        trackingNumber: 'UPS987654321'
      },
      {
        id: 'PKG003',
        reference: 'REF-2024-003',
        carrier: 'FedEx',
        weight: '3.8 lbs',
        description: 'Clothing',
        scanDate: '2024-06-17',
        status: 'Warehouse',
        trackingNumber: 'FDX555666777'
      }
    ]);

    // Mock users data
    setUsers([
      { id: 'USER001', name: 'John Smith', email: 'john@example.com', packages: 5 },
      { id: 'USER002', name: 'Sarah Johnson', email: 'sarah@example.com', packages: 3 },
      { id: 'USER003', name: 'Mike Wilson', email: 'mike@example.com', packages: 8 }
    ]);

    // Mock pallets data
    setPallets([
      {
        id: 'PAL001',
        name: 'Pallet A-001',
        packages: 12,
        weight: '125 lbs',
        status: 'Ready',
        destination: 'Miami, FL'
      },
      {
        id: 'PAL002',
        name: 'Pallet B-002',
        packages: 8,
        weight: '89 lbs',
        status: 'In Progress',
        destination: 'New York, NY'
      }
    ]);
  }, []);

  const filteredPackages = unassignedPackages.filter(pkg => {
    const matchesSearch = pkg.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCarrier = selectedCarrier === 'all' || pkg.carrier === selectedCarrier;
    return matchesSearch && matchesCarrier;
  });

  const handleBulkAssign = () => {
    if (selectedPackages.length === 0) {
      alert('Please select packages to assign');
      return;
    }
    alert(`Assigning ${selectedPackages.length} package(s) to user`);
  };

  const StatCard = ({ title, value, icon: Icon, color, action }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {action && (
        <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          {action}
          <Eye className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage packages, users, and operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'packages', label: 'Unmatched Packages', icon: Package },
              { id: 'pallets', label: 'Pallet Management', icon: Archive },
              { id: 'bulk', label: 'Bulk Operations', icon: Upload }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Unassigned Packages"
                value="24"
                icon={AlertTriangle}
                color="bg-red-100 text-red-600"
                action="View unassigned"
              />
              <StatCard
                title="Active Users"
                value="156"
                icon={Users}
                color="bg-blue-100 text-blue-600"
                action="Manage users"
              />
              <StatCard
                title="Ready Pallets"
                value="8"
                icon={Archive}
                color="bg-green-100 text-green-600"
                action="View pallets"
              />
              <StatCard
                title="In Transit"
                value="42"
                icon={Truck}
                color="bg-amber-100 text-amber-600"
                action="Track shipments"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Admin Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { action: 'Assigned 5 packages to John Smith', time: '2 minutes ago', type: 'assignment' },
                    { action: 'Created new pallet PAL-003', time: '15 minutes ago', type: 'pallet' },
                    { action: 'Bulk uploaded 12 packages via CSV', time: '1 hour ago', type: 'upload' },
                    { action: 'Generated customs manifest for PAL-001', time: '2 hours ago', type: 'document' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item.action}</span>
                      <span className="text-xs text-gray-500 ml-auto">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Unmatched Packages Tab */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by reference number or tracking..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={selectedCarrier}
                  onChange={(e) => setSelectedCarrier(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Carriers</option>
                  <option value="DHL">DHL</option>
                  <option value="UPS">UPS</option>
                  <option value="FedEx">FedEx</option>
                  <option value="USPS">USPS</option>
                </select>
                <button
                  onClick={handleBulkAssign}
                  disabled={selectedPackages.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Bulk Assign ({selectedPackages.length})
                </button>
              </div>
            </div>

            {/* Packages Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Unassigned Packages ({filteredPackages.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPackages(filteredPackages.map(p => p.id));
                            } else {
                              setSelectedPackages([]);
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carrier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scan Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assign to User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPackages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedPackages.includes(pkg.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPackages([...selectedPackages, pkg.id]);
                              } else {
                                setSelectedPackages(selectedPackages.filter(id => id !== pkg.id));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-blue-600">{pkg.reference}</div>
                            <div className="text-xs text-gray-500">{pkg.trackingNumber}</div>
                            <div className="text-xs text-gray-400">{pkg.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {pkg.carrier}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pkg.weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pkg.scanDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500">
                            <option value="">Select User</option>
                            {users.map(user => (
                              <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pallet Management Tab */}
        {activeTab === 'pallets' && (
          <div className="space-y-6">
            {/* Pallet Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Pallet Operations</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Pallet
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Manifests
                  </button>
                </div>
              </div>
            </div>

            {/* Pallets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pallets.map(pallet => (
                <div key={pallet.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{pallet.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      pallet.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {pallet.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Packages:</span>
                      <span className="text-sm font-medium">{pallet.packages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Weight:</span>
                      <span className="text-sm font-medium">{pallet.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Destination:</span>
                      <span className="text-sm font-medium">{pallet.destination}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Manage Packages
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bulk Operations Tab */}
        {activeTab === 'bulk' && (
          <div className="space-y-6">
            {/* CSV Upload */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Package Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop your CSV file here</p>
                <p className="text-sm text-gray-600 mb-4">or click to browse files</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Select File
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>CSV Format:</strong> Reference, Tracking Number, Carrier, Weight, Description</p>
              </div>
            </div>

            {/* Bulk Assignment */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Package Assignment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a user...</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="selected">Selected Packages Only</option>
                    <option value="filter">All Filtered Packages</option>
                    <option value="carrier">By Carrier</option>
                    <option value="date">By Date Range</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Execute Bulk Assignment
              </button>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Bulk Operation Log</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { operation: 'CSV Upload', details: 'Uploaded 25 packages', user: 'Admin', time: '10:30 AM', status: 'Success' },
                    { operation: 'Bulk Assignment', details: 'Assigned 12 packages to John Smith', user: 'Admin', time: '09:45 AM', status: 'Success' },
                    { operation: 'CSV Upload', details: 'Failed validation - 3 duplicate references', user: 'Admin', time: '09:15 AM', status: 'Error' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${log.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">{log.operation}</span>
                          <span className="text-sm text-gray-500">{log.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}