'use client';
import { useEffect, useState } from 'react';
import { 
  Package,
  Truck,
  Archive,
  CreditCard,
  Eye,
  Calculator,
  MapPin
} from 'lucide-react';

export default function DashboardPage() {
  const [readyForPickup, setReadyForPickup] = useState([]);

  useEffect(() => {
    // Mock data for ready for pickup
    setReadyForPickup([
      {
        item: 'ETEL11912',
        tracking: 'notrk9znsvwfejep',
        description: 'Merchandise (0.5 lbs)',
        sender: 'BG PROC',
        location: 'Office'
      },
      {
        item: 'ETEL13883',
        tracking: '420333119361289719648413942572',
        description: 'Merchandise (0.8 lbs)',
        sender: 'usps',
        location: 'Office'
      }
    ]);
  }, []);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Ready for Pickup */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">2</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View all orders
            <Eye className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* In Transit */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">2</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View in transit
            <Eye className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* Total Shipped */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shipped</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Archive className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View all items
            <Eye className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* Account Balance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Account Balance</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">$1500</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View account
            <Eye className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ready for Pickup Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">READY FOR PICKUP (2)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ITEM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DESCRIPTION
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SENDER
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LOCATION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {readyForPickup.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-blue-600">{item.item}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{item.tracking}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.sender}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.location}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SHIPPING ADDRESS</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-sm text-gray-900">Mikhail Mcdowell</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line One</label>
                <p className="text-sm text-gray-900">3750 W. Oakland Park Blvd</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line Two</label>
                <p className="text-sm text-blue-600 font-medium">ETEL1507</p>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition duration-300 font-medium">
              Edit Address
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300 font-medium">
                <Package className="mr-2 h-4 w-4" />
                Create Shipment
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium">
                <MapPin className="mr-2 h-4 w-4" />
                Track Package
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-medium">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Rate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}