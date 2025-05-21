'use client';
import { useState } from 'react';
import { Menu, X, Package, Clock, Globe, TrendingUp, ChevronRight, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <a href="#" className="text-blue-900 font-medium hover:text-amber-500 transition duration-300">RATES</a>
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
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50">RATES</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-900 text-white hover:bg-blue-800">LOGIN</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white hover:bg-amber-600 mt-2">REGISTER</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Delivery Solutions in Jamaica</h1>
              <p className="text-lg mb-8 text-blue-100">Fast, secure, and reliable courier services across Jamaica and worldwide. Experience golden standard delivery.</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="px-6 py-3 bg-amber-500 rounded-lg font-medium text-white hover:bg-amber-600 transition duration-300">Register</a>
                <a href="#" className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition duration-300">Contact Us</a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">Quick Estimate</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Package Category</label>
                      <select className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white">
                        <option>Kingston</option> 
                        <option>Montego Bay</option>
                        <option>Ocho Rios</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Package Weight</label>
                      <div className="flex">
                        <input type="number" placeholder="Weight" className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-l-lg text-white" />
                        <span className="px-3 py-2 bg-blue-700 rounded-r-lg border border-white/30">kg</span>
                      </div>
                    </div>
                    <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition duration-300">
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Premium Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why Jamaican businesses and individuals trust GoldenCouriers for their delivery needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Package className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Island-wide Delivery</h3>
              <p className="text-gray-600 mb-4">
                Fast and secure delivery to any location across Jamaica, with same-day options available for Kingston metropolitan area.
              </p>
              <a href="#" className="flex items-center text-amber-500 font-medium">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">International Shipping</h3>
              <p className="text-gray-600 mb-4">
                Reliable shipping to and from Jamaica with our global network of partners. Competitive rates for all your international needs.
              </p>
              <a href="#" className="flex items-center text-amber-500 font-medium">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Business Solutions</h3>
              <p className="text-gray-600 mb-4">
                Tailored logistics solutions for Jamaican businesses of all sizes. Streamline your operations with our expert services.
              </p>
              <a href="#" className="flex items-center text-amber-500 font-medium">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose GoldenCouriers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence makes us Jamaica's most trusted courier service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Clock className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Guaranteed delivery times with real-time tracking across Jamaica.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Package className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Secure Handling</h3>
              <p className="text-gray-600">
                Professional packaging and careful handling for all your items.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Globe className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Global Network</h3>
              <p className="text-gray-600">
                Connected with major carriers worldwide for seamless international delivery.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <TrendingUp className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Competitive Rates</h3>
              <p className="text-gray-600">
                Best value pricing for both domestic and international shipments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from some of the businesses and individuals who rely on GoldenCouriers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "GoldenCouriers has transformed how we handle deliveries for our e-commerce store. Their reliable service lets us promise next-day delivery to our Kingston customers."
              </p>
              <div>
                <p className="font-medium text-blue-900">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Owner, Island Boutique</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I regularly ship products between Montego Bay and Kingston. GoldenCouriers offers the best rates and has never missed a delivery window in two years."
              </p>
              <div>
                <p className="font-medium text-blue-900">Michael Brown</p>
                <p className="text-sm text-gray-500">CEO, Jamaica Fresh Produce</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Their international shipping service is a game-changer for my business. I can now confidently ship my artisan crafts to customers in the US and Europe."
              </p>
              <div>
                <p className="font-medium text-blue-900">Alicia Grant</p>
                <p className="text-sm text-gray-500">Founder, Jamaican Crafts Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Ready to experience golden standard delivery?</h2>
              <p className="text-xl text-blue-100">
                Join hundreds of satisfied customers across Jamaica who trust us with their shipping needs.
              </p>
            </div>
            <div className="md:w-1/3 md:text-right">
              <a href="#" className="inline-block px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition duration-300">
                Create an Account
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
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Rates</a></li>
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