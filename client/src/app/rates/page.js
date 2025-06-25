'use client';
import { useState } from 'react';
import { Menu, X, Package, Globe, TrendingUp, ArrowRight, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Calculator, Truck, Plane } from 'lucide-react';

export default function RatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('domestic');

  const domesticRates = [
    { weight: '1 lb', cost: 'J$750' },
    { weight: '2 lbs', cost: 'J$1,400' },
    { weight: '3 lbs', cost: 'J$2,050' },
    { weight: '4 lbs', cost: 'J$2,700' },
    { weight: '5 lbs', cost: 'J$3,350' },
    { weight: '6 lbs', cost: 'J$4,000' },
    { weight: '7 lbs', cost: 'J$4,650' },
    { weight: '8 lbs', cost: 'J$5,300' },
    { weight: '9 lbs', cost: 'J$5,950' },
    { weight: '10 lbs', cost: 'J$6,600' },
    { weight: '15 lbs', cost: 'J$9,900' },
    { weight: '20 lbs', cost: 'J$13,200' },
    { weight: '25 lbs', cost: 'J$16,500' },
    { weight: '30 lbs+', cost: 'Contact us for quote' }
  ];

  const internationalRates = [
    { weight: '1 lb', cost: 'J$2,500' },
    { weight: '2 lbs', cost: 'J$4,800' },
    { weight: '3 lbs', cost: 'J$7,100' },
    { weight: '4 lbs', cost: 'J$9,400' },
    { weight: '5 lbs', cost: 'J$11,700' },
    { weight: '6 lbs', cost: 'J$14,000' },
    { weight: '7 lbs', cost: 'J$16,300' },
    { weight: '8 lbs', cost: 'J$18,600' },
    { weight: '9 lbs', cost: 'J$20,900' },
    { weight: '10 lbs', cost: 'J$23,200' },
    { weight: '15 lbs', cost: 'J$34,800' },
    { weight: '20 lbs', cost: 'J$46,400' },
    { weight: '25 lbs', cost: 'J$58,000' },
    { weight: '30 lbs+', cost: 'Contact us for quote' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-navy-800">
                  <span className="text-blue-900">Golden</span>
                  <span className="text-amber-500">Couriers</span>
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#" className="text-blue-900 font-medium hover:text-amber-500 transition duration-300">HOME</a>
                <a href="#" className="text-blue-900 font-medium hover:text-amber-500 transition duration-300">ABOUT</a>
                <a href="#" className="text-amber-500 font-medium border-b-2 border-amber-500">RATES</a>
                <a href="#" className="px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 transition duration-300">LOGIN</a>
                <a href="#" className="px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600 transition duration-300">REGISTER</a>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-amber-500 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50">HOME</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50">ABOUT</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white">RATES</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-900 text-white hover:bg-blue-800">LOGIN</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white hover:bg-amber-600 mt-2">REGISTER</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping Rates</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Transparent pricing for all your delivery needs. Choose from our competitive domestic and international shipping rates.
            </p>
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-blue-50 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('domestic')}
                className={`px-6 py-3 rounded-md font-medium transition duration-300 flex items-center ${
                  activeTab === 'domestic'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                <Truck size={20} className="mr-2" />
                Domestic Shipping
              </button>
              <button
                onClick={() => setActiveTab('international')}
                className={`px-6 py-3 rounded-md font-medium transition duration-300 flex items-center ${
                  activeTab === 'international'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                <Plane size={20} className="mr-2" />
                International Shipping
              </button>
            </div>
          </div>

          {/* Domestic Rates */}
          {activeTab === 'domestic' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white px-6 py-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <Truck size={24} className="mr-3" />
                  Domestic Shipping Rates (Jamaica)
                </h2>
                <p className="text-blue-100 mt-2">Island-wide delivery with same-day options available in Kingston</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-semibold text-blue-900">Package Weight</th>
                      <th className="px-6 py-4 text-left text-lg font-semibold text-blue-900">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {domesticRates.map((rate, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">{rate.weight}</td>
                        <td className="px-6 py-4 text-blue-900 font-bold text-lg">{rate.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 px-6 py-4 border-t border-amber-200">
                <div className="flex items-start">
                  <Calculator className="text-amber-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Additional Services:</h4>
                    <ul className="text-amber-700 space-y-1">
                      <li>• Same-day delivery (Kingston): +J$500</li>
                      <li>• Express delivery (24hrs): +J$300</li>
                      <li>• Insurance (optional): 2% of declared value</li>
                      <li>• Signature required: +J$200</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* International Rates */}
          {activeTab === 'international' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white px-6 py-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <Plane size={24} className="mr-3" />
                  International Shipping Rates
                </h2>
                <p className="text-blue-100 mt-2">Worldwide delivery to USA, Canada, UK, and more</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-semibold text-blue-900">Package Weight</th>
                      <th className="px-6 py-4 text-left text-lg font-semibold text-blue-900">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {internationalRates.map((rate, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">{rate.weight}</td>
                        <td className="px-6 py-4 text-blue-900 font-bold text-lg">{rate.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 px-6 py-4 border-t border-amber-200">
                <div className="flex items-start">
                  <Globe className="text-amber-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">International Services:</h4>
                    <ul className="text-amber-700 space-y-1">
                      <li>• Express international (3-5 days): +50% of base rate</li>
                      <li>• Standard delivery: 7-14 business days</li>
                      <li>• Customs clearance: Included</li>
                      <li>• Tracking & insurance: Included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Package className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Package Requirements</h3>
              <p className="text-gray-600">
                Maximum dimensions: 24" x 18" x 12". Secure packaging required for fragile items.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Volume Discounts</h3>
              <p className="text-gray-600">
                Business customers shipping 20+ packages monthly qualify for up to 15% discount.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Calculator className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Custom Quote</h3>
              <p className="text-gray-600">
                Need shipping for oversized or special items? Contact us for a personalized quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ship with GoldenCouriers?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get started today and experience Jamaica's most reliable courier service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition duration-300 flex items-center">
                Register Now <ArrowRight size={20} className="ml-2" />
              </a>
              <a href="#" className="px-8 py-4 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition duration-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-white">Golden</span>
                <span className="text-amber-500">Couriers</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Premium delivery solutions across Jamaica and worldwide. Fast, secure, reliable.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
                <li><a href="#" className="text-amber-500 font-medium">Rates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Track Package</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Local Delivery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">International Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Business Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Express Delivery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Package Forwarding</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin size={18} className="mr-2 text-amber-500" />
                  <span className="text-gray-400">27 Knutsford Blvd, Kingston, Jamaica</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-amber-500" />
                  <a href="tel:+18769221234" className="text-gray-400 hover:text-white transition duration-300">+1 (876) 922-1234</a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-amber-500" />
                  <a href="mailto:info@goldencouriers.com" className="text-gray-400 hover:text-white transition duration-300">info@goldencouriers.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="md:flex md:items-center md:justify-between">
              <p className="text-gray-400">© 2025 GoldenCouriers. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}