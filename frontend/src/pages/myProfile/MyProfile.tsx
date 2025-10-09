import { useState } from "react";
import { Edit, Save, X } from "lucide-react";
import doctor from "/doctors/doctor.jpg";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: doctor,
    email: "richard@gmail.com",
    phone: "+1 454 454 7898",
    address: {
      line1: "57th cross, Richmond",
      line2: "Circle, Church road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          
          <div className="px-8 pb-8">
            <div className="flex items-end gap-6 -mt-16 mb-6">
              <img
                src={userData.image}
                alt={userData.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div className="flex-1">
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="text-3xl font-bold text-gray-800 bg-gray-50 border-2 border-blue-400 rounded-lg px-4 py-2 w-full"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">
                    {userData.name}
                  </h1>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEdit ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    <Save size={20} />
                    Kaydet
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    <X size={20} />
                    İptal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  <Edit size={20} />
                  Düzenle
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            İletişim Bilgileri
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                {isEdit ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{userData.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Telefon
                </label>
                {isEdit ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{userData.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Adres
                </label>
                {isEdit ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ) : (
                  <p className="text-gray-800 font-medium">
                    {userData.address.line1} <br /> {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Temel Bilgiler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Cinsiyet
              </label>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Male">Erkek</option>
                  <option value="Female">Kadın</option>
                </select>
              ) : (
                <p className="text-gray-800 font-medium">{userData.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Doğum Tarihi
              </label>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;