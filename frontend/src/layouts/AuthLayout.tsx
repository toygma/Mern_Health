import { Outlet, useLocation } from "react-router";
import logo from "/login.png";

const AuthLayout = () => {
  const location = useLocation();
  const signUp = location.pathname;
  const startWith = signUp.startsWith("/doctor/sign-up");
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Statik Arka Plan - Animasyon Kaldırıldı */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full opacity-10"></div>
      </div>

      {/* Grid Pattern - Daha hafif */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen p-8 gap-12">
        {/* Sol Taraf - Form Bölümü */}
        <div className="w-full lg:flex-1 z-10">
          <div className={`${startWith ? "mt-20":"bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-full"}`}>
            <Outlet />
          </div>
        </div>

        {/* Sağ Taraf - Görsel Bölüm */}
        {!startWith && (
          <div className="w-full lg:flex-1relative z-10">
            <div className="relative max-w-2xl mx-auto">
              {/* Dekoratif Elementler - Blur Kaldırıldı */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl rotate-12 opacity-15"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl -rotate-12 opacity-15"></div>

              {/* Ana İçerik Kartı */}
              <div className="relative bg-white/90 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
                {/* Başlık */}
                <div className="relative mb-12">
                  <div className="inline-block">
                    <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                      Your Health is Our Priority
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
                      Yourself and Your Family
                      <br />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Protect
                      </span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Track your health with the easy online appointment system
                    </p>
                  </div>

                  {/* Dekoratif Yıldızlar - Animasyon Kaldırıldı */}
                  <div className="absolute -top-4 -right-4 text-blue-500 text-2xl">
                    ✦
                  </div>
                  <div className="absolute top-8 -left-8 text-indigo-400 text-xl">
                    ✦
                  </div>
                </div>

                {/* Resim Konteyneri */}
                <div className="relative mb-8">
                  <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl aspect-square max-w-md mx-auto">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <img
                      src={logo}
                      alt="Healthcare"
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />

                    {/* İstatistik Kartları - Hover Animasyonu Basitleştirildi */}
                    <div className="absolute top-6 left-1 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100 transition-transform hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Total Dose
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            2.7M+
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100 transition-transform hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Recovery Rate
                          </p>
                          <p className="text-lg font-bold text-gray-800">98%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Özellik Rozetleri */}
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
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
