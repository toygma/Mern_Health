import { Outlet } from "react-router";
import logo from "/login.png";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen p-8 gap-12">
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-5/12 z-10 ">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-white/20 h-full">
            <Outlet />
          </div>
        </div>

        {/* Right Side - Visual Section */}
        <div className="w-full lg:w-7/12 relative z-10">
          <div className="relative max-w-2xl mx-auto">
            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl rotate-12 opacity-20 blur-sm"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl -rotate-12 opacity-20 blur-sm"></div>

            {/* Main Content Card */}
            <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/40">
              {/* Header */}
              <div className="relative mb-12">
                <div className="inline-block">
                  <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                    Your Health is Our Priority
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
                    Yourself and Your Family<br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Protect
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg">
                   Track your health with the easy online appointment system
                  </p>
                </div>

                {/* Decorative Stars */}
                <div className="absolute -top-4 -right-4 text-blue-500 text-2xl animate-pulse">✦</div>
                <div className="absolute top-8 -left-8 text-indigo-400 text-xl animate-pulse delay-300">✦</div>
              </div>

              {/* Image Container */}
              <div className="relative mb-8">
                <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <img 
                    src={logo} 
                    alt="Healthcare" 
                    className="w-full h-full object-cover mix-blend-overlay opacity-90"
                  />

                  {/* Floating Stats Cards */}
                  <div className="absolute top-6 left-1 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Total Dose</p>
                        <p className="text-lg font-bold text-gray-800">2.7M+</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Recovery Rate</p>
                        <p className="text-lg font-bold text-gray-800">98%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700 font-medium">
                  🔒 Secure Platform
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-full px-4 py-2 text-sm text-indigo-700 font-medium">
                  ⚡ Quick Appointment
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-full px-4 py-2 text-sm text-purple-700 font-medium">
                  👨‍⚕️ Expert Team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;