'use client';
import { useState } from 'react';
import { 
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  Archive,
  Eye,
  Download,
  Calculator,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function TrackPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const readyForPickup = [
    {
      item: 'ETEL13883',
      tracking: '420333119361289719648413942572',
      description: 'Merchandise',
      weight: '0.8 lbs',
      location: 'Office',
      total: '$750',
      status: 'Not Paid',
      arrival: '20/05/2025',
      sender: 'USPS'
    },
    {
      item: 'ETEL11912',
      tracking: 'notrk9znsvwfejep',
      description: 'Merchandise',
      weight: '0.5 lbs',
      location: 'Office',
      total: '$750',
      status: 'Not Paid',
      arrival: '23/01/2025',
      sender: 'BG PROC'
    }
  ];

  const inTransit = [
    {
      item: 'AA9179',
      tracking: '420333111212940010810546543251742',
      description: 'Merchandise',
      weight: '0.5 lbs',
      location: 'In Transit',
      created: '07/09/2024',
      sender: 'UPS',
      estimatedDelivery: '28/05/2025'
    },
    {
      item: 'LML17978',
      tracking: '420333119374889677019527060826',
      description: 'Merchandise',
      weight: '0.9 lbs',
      location: 'Florida',
      created: '20/04/2023',
      sender: 'STUHRLING ORIGINAL',
      estimatedDelivery: '30/05/2025'
    }
  ];

  const totalShipped = [
    {
      item: 'ETEL10234',
      tracking: '420333119361289719648413942000',
      description: 'Electronics',
      weight: '2.1 lbs',
      shipped: '15/04/2025',
      delivered: '18/04/2025',
      sender: 'Amazon'
    }
  ];

  const pastOrders = [
    {
      item: 'ETEL08765',
      tracking: '420333119361289719648413941998',
      description: 'Books',
      weight: '3.0 lbs',
      orderDate: '05/04/2025',
      status: 'Cancelled',
      sender: 'Barnes & Noble'
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    switch (status) {
      case 'Not Paid': return `${baseClasses} bg-red-100 text-red-800`;
      case 'In Transit': return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'Delivered': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Cancelled': return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Track Your Packages</h1>
        <p className="text-gray-600 mt-2">Monitor all your shipments in real-time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Ready for Pickup */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{readyForPickup.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{inTransit.length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Total Shipped */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shipped</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalShipped.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Past Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Past Orders</p>
              <p className="text-3xl font-bold text-gray-600 mt-2">{pastOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Archive className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Ready for Pickup Section */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">READY FOR PICKUP ({readyForPickup.length})</h3>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <Download className="mr-1 h-4 w-4" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DESCRIPTION</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ARRIVAL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readyForPickup.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{item.item}</div>
                      <div className="text-xs text-gray-500">{item.tracking}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.weight} • {item.sender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(item.status)}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.arrival}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* In Transit Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">IN TRANSIT ({inTransit.length})</h3>
            </div>
            <div className="p-6">
              {inTransit.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{item.item}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.tracking}</div>
                      <div className="text-sm text-gray-900 mt-2">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.weight} • {item.sender}</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={getStatusBadge('In Transit')}>In Transit</span>
                    <span className="text-xs text-gray-500">Est. Delivery: {item.estimatedDelivery}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Orders Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">PAST ORDERS ({pastOrders.length})</h3>
            </div>
            <div className="p-6">
              {pastOrders.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{item.item}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.tracking}</div>
                      <div className="text-sm text-gray-900 mt-2">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.weight} • {item.sender}</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className={getStatusBadge(item.status)}>{item.status}</span>
                    <span className="text-xs text-gray-500">{item.orderDate}</span>
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