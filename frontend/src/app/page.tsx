"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Code,
  Database,
  FileCheck,
  Globe,
  Users,
  ShoppingCart,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  Github,
  Download,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                eCommerce
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#overview"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Overview
              </Link>
              <Link
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#dashboards"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Dashboards
              </Link>
              <Link
                href="#tech"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Tech Stack
              </Link>
              <Link href="/login">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              MERN Stack Developer Evaluation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Multivendor eCommerce
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Platform
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              A comprehensive solution featuring customer and seller dashboards
              with authentication, real-time analytics, and modern UI/UX design
              principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
                <Globe className="w-5 h-5 mr-2" />
                Live Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer">
                <Github className="w-5 h-5 mr-2" />
                View Code
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Project Overview
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built from incomplete Figma designs, this project demonstrates
              problem-solving skills and technical proficiency in a real-world
              development scenario.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Customer Dashboard
              </h3>
              <p className="text-slate-600 mb-4">
                Complete shopping experience with order tracking, wishlist, and
                profile management.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>• Product browsing & search</li>
                <li>• Shopping cart & checkout</li>
                <li>• Order history & tracking</li>
                <li>• Profile & preferences</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Seller Dashboard
              </h3>
              <p className="text-slate-600 mb-4">
                Comprehensive vendor management with analytics and inventory
                control.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>• Product & inventory management</li>
                <li>• Order processing & fulfillment</li>
                <li>• Sales analytics & reports</li>
                <li>• Store customization</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Authentication & Security
              </h3>
              <p className="text-slate-600 mb-4">
                Robust authentication system with role-based access control.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>• JWT-based authentication</li>
                <li>• Role-based permissions</li>
                <li>• Secure payment processing</li>
                <li>• Data encryption</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section
        id="dashboards"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Dashboard Previews
            </h2>
            <p className="text-lg text-slate-600">
              Explore the intuitive interfaces designed for both customers and
              sellers
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab("customer")}
                className={`px-6 py-2 rounded-md font-medium transition-all cursor-pointer ${
                  activeTab === "customer"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Customer Dashboard
              </button>
              <button
                onClick={() => setActiveTab("seller")}
                className={`px-6 py-2 rounded-md font-medium transition-all cursor-pointer ${
                  activeTab === "seller"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Seller Dashboard
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {activeTab === "customer" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Customer Experience
                  </h3>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Live
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Intuitive product browsing with advanced filters
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Seamless shopping cart and checkout process
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Real-time order tracking and notifications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Wishlist and favorites management
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-600">
                        Customer Dashboard Preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Seller Management
                  </h3>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Live
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Comprehensive product and inventory management
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Advanced analytics and sales reporting
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Order processing and fulfillment tools
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                        <span className="text-slate-600">
                          Store customization and branding options
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-600">Seller Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tech Stack & Implementation
            </h2>
            <p className="text-lg text-slate-600">
              Modern technologies and best practices for scalable development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Frontend</h3>
              <p className="text-sm text-slate-600">
                Next.js, TypeScript, Tailwind CSS, ShadCN UI
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Backend</h3>
              <p className="text-sm text-slate-600">
                Node.js, Express, MongoDB, JWT Authentication
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
              <p className="text-sm text-slate-600">
                JWT, bcrypt, CORS, Rate Limiting
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Deployment</h3>
              <p className="text-sm text-slate-600">
                Vercel, MongoDB Atlas, CI/CD Pipeline
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation & Deliverables */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Project Deliverables
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive documentation and live implementations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Live Dashboards
              </h3>
              <p className="text-slate-600 mb-6">
                Fully functional customer and seller dashboards with
                authentication
              </p>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  Customer Dashboard
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                  Seller Dashboard
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Documentation
              </h3>
              <p className="text-slate-600 mb-6">
                Detailed project documentation including assumptions and
                challenges
              </p>
              <div className="space-y-3">
                <button className="w-full border border-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button className="w-full border border-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer">
                  <FileCheck className="w-4 h-4 mr-2" />
                  View README
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Source Code
              </h3>
              <p className="text-slate-600 mb-6">
                Complete codebase with clean architecture and best practices
              </p>
              <div className="space-y-3">
                <button className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer">
                  <Github className="w-4 h-4 mr-2" />
                  View Repository
                </button>
                <button className="w-full border border-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  Download ZIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                eCommerce Evaluation Project
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              &copy; Developed by{" "}
              <Link
                href="https://nadim.vercel.app"
                className="hover:text-white transition-colors"
              >
                Nadim Chodhury
              </Link>
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="https://github.com/nadim-chowdhury">
                <button className="text-slate-400 hover:text-white transition-colors border rounded-full p-2 cursor-pointer">
                  <Github className="w-4 h-4" />
                </button>
              </Link>
              <Link href="https://www.linkedin.com/in/nadim-chowdhury">
                <button className="text-slate-400 hover:text-white transition-colors border rounded-full p-2 cursor-pointer">
                  <Globe className="w-4 h-4" />
                </button>
              </Link>
              <Link href="https://nadim.vercel.app">
                <button className="text-slate-400 hover:text-white transition-colors border rounded-full p-2 cursor-pointer">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
