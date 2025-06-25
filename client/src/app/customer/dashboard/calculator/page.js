'use client';
import { useState } from 'react';
import { 
  Calculator,
  Info,
  AlertCircle,
  Package,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function CalculatorPage() {
  const [itemValue, setItemValue] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [dutyCategory, setDutyCategory] = useState('');
  const [calculated, setCalculated] = useState(false);

  const dutyCategories = [
    { value: 'electronics', label: 'Electronics (15%)', rate: 0.15 },
    { value: 'clothing', label: 'Clothing (10%)', rate: 0.10 },
    { value: 'books', label: 'Books (0%)', rate: 0.00 },
    { value: 'jewelry', label: 'Jewelry (20%)', rate: 0.20 },
    { value: 'cosmetics', label: 'Cosmetics (12%)', rate: 0.12 },
    { value: 'general', label: 'General Merchandise (8%)', rate: 0.08 }
  ];

  const calculateCosts = () => {
    if (!itemValue || !itemWeight || !dutyCategory) return null;

    const value = parseFloat(itemValue);
    const weight = parseFloat(itemWeight);
    const selectedCategory = dutyCategories.find(cat => cat.value === dutyCategory);
    
    if (!selectedCategory) return null;

    const dutyCost = value * selectedCategory.rate;
    const envlCost = value * 0.03;
    const gctCost = (value + dutyCost) * 0.15;
    const scfCost = 3.50;
    const cafCost = weight * 2.00;
    const stampDuty = value > 100 ? 100 : 0;
    const freightCost = weight * 12.50;
    const customsCharge = value > 100 ? 25 : 0;

    const grandTotal = dutyCost + envlCost + gctCost + scfCost + cafCost + stampDuty + freightCost + customsCharge;

    return {
      dutyCost,
      envlCost,
      gctCost,
      scfCost,
      cafCost,
      stampDuty,
      freightCost,
      customsCharge,
      grandTotal
    };
  };

  const handleCalculate = () => {
    setCalculated(true);
  };

  const costs = calculateCosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header - Matches dashboard style */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipping Calculator</h1>
        <p className="text-gray-600">Calculate duties, taxes, and shipping costs for your packages</p>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              CALCULATOR
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Item Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Value (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={itemValue}
                    onChange={(e) => setItemValue(e.target.value)}
                    placeholder="0.00"
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
              </div>

              {/* Item Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Weight (lbs)
                </label>
                <input
                  type="number"
                  value={itemWeight}
                  onChange={(e) => setItemWeight(e.target.value)}
                  placeholder="0.0"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>

              {/* Duty Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duty Category
                </label>
                <select
                  value={dutyCategory}
                  onChange={(e) => setDutyCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                >
                  <option value="">---- Select Duty ----</option>
                  {dutyCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!itemValue || !itemWeight || !dutyCategory}
              className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 font-medium flex items-center"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </button>
          </div>

          {/* Cost Breakdown */}
          {calculated && costs && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Breakdown</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Duty Cost', value: costs.dutyCost },
                  { label: 'ENVL Cost', value: costs.envlCost },
                  { label: 'GCT Cost', value: costs.gctCost },
                  { label: 'SCF Cost', value: costs.scfCost },
                  { label: 'CAF Cost', value: costs.cafCost },
                  { label: 'Stamp Duty', value: costs.stampDuty },
                  { label: `Freight Cost (${itemWeight}lbs)`, value: costs.freightCost },
                  { label: 'Customs Charge', value: costs.customsCharge },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">${item.value.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="flex justify-between py-4 border-t-2 border-gray-200 text-lg">
                  <span className="font-semibold text-gray-900">Grand Total</span>
                  <span className="font-bold text-blue-900">${costs.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Useful Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              Useful Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Split up orders over $100",
                "Wait to order multiple items over $100",
                "Wait for sales to order items over $100 to get the best deals"
              ].map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Reminders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
              Reminders
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Items over $100 can attract a custom charge",
                "Please select the correct category from the duty category list",
                "Please remember this is only an estimate",
                "Please remember to upload an invoice for all items"
              ].map((reminder, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {reminder}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions - Matches dashboard style */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                <DollarSign className="mr-2 h-4 w-4" />
                View Rates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}