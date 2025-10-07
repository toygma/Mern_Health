import { useState } from "react";
import { Circle, User } from "lucide-react";
import { Link } from "react-router";
import { generateSlugify } from "../../utils/helper";
import { doctorImages } from "./_components/imageData";

const AllDoctors = () => {
  const categories = [
    { id: "all", name: "All Doctors", icon: "👨‍⚕️" },
    { id: "dermatologist", name: "Dermatology", icon: "🔬" },
    { id: "pediatrician", name: "Pediatrics", icon: "👶" },
    { id: "cardiologist", name: "Cardiology", icon: "❤️" },
    { id: "orthopedist", name: "Orthopedics", icon: "🦴" },
    { id: "neurologist", name: "Neurology", icon: "🧠" },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Ayşe Yılmaz",
      category: "dermatologist",
      categoryName: "Dermatology",
      available: true,
      href: `/doctor/${generateSlugify("Dr. Ayşe Yılmaz")}`,
      image: doctorImages.doctor1,
    },
    {
      id: 2,
      name: "Dr. Mehmet Kaya",
      category: "pediatrician",
      categoryName: "Pediatrics",
      href: `/doctor/${generateSlugify("Dr. Mehmet Kaya")}`,
      available: true,
      image: doctorImages.doctor2,
    },
    {
      id: 3,
      name: "Dr. Zeynep Demir",
      category: "cardiologist",
      categoryName: "Cardiology",
      href: `/doctor/${generateSlugify("Dr. Zeynep Demir")}`,

      available: false,
      image: doctorImages.doctor3,
    },
    {
      id: 4,
      name: "Dr. Can Öztürk",
      category: "dermatologist",
      categoryName: "Dermatology",
      href: `/doctor/${generateSlugify("Dr. Can Öztürk")}`,

      available: true,
      image: doctorImages.doctor4,
    },
    {
      id: 5,
      name: "Dr. Elif Şahin",
      category: "orthopedist",
      categoryName: "Orthopedics",
      href: `/doctor/${generateSlugify("Dr. Elif Şahin")}`,

      available: true,
      image: doctorImages.doctor5,
    },
    {
      id: 6,
      name: "Dr. Ahmet Çelik",
      category: "neurologist",
      categoryName: "Neurology",
      href: `/doctor/${generateSlugify("Dr. Ahmet Çelik")}`,
      available: false,
      image: doctorImages.doctor6,
    },
    {
      id: 7,
      name: "Dr. Selin Arslan",
      category: "pediatrician",
      categoryName: "Pediatrics",
      href: `/doctor/${generateSlugify("Dr. Selin Arslan")}`,
      available: true,
      image: doctorImages.doctor7,
    },
    {
      id: 8,
      name: "Dr. Burak Yıldız",
      category: "cardiologist",
      categoryName: "Cardiology",
      href: `/doctor/${generateSlugify("Dr. Burak Yıldız")}`,
      available: true,
      image: doctorImages.doctor8,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDoctors =
    selectedCategory === "all"
      ? doctors
      : doctors.filter((doc) => doc.category === selectedCategory);

  return (
     // Ana Kapsayıcı: Kenar boşlukları ve maksimum genişlik eklendi
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
        {/* Sol Taraf - Kategoriler (Sidebar) */}
        {/* md:flex-shrink-0: Geniş ekranlarda kenar çubuğunun sıkışmasını önler */}
        <aside className="w-full md:w-72 lg:w-80 md:flex-shrink-0 mb-8 md:mb-0">
          <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 h-full">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Specializations
              </h2>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                Filter to search
              </p>
            </div>
            {/* Mobil: Yatayda kayan bir flex container
              Tablet ve üstü (md): Dikey bir liste (flex-col)
            */}
            <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-x-visible pb-2 md:pb-0 -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  // flex-shrink-0 mobil yatay kaydırmada butonların sıkışmasını engeller
                  className={`w-[250px] h-full flex-shrink-0 md:w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm sm:text-base cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform md:scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:transform md:hover:scale-102"
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{cat.icon}</span>
                  <span className="font-medium truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sağ Taraf - Doktorlar */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {selectedCategory === "all"
                ? "All Doctors"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Showing {filteredDoctors.length} doctors
            </p>
          </div>

          {/* Doktor Kartları Grid'i */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              // Kartın tamamı artık bir Link
              <Link to={doctor.href} key={doctor.id} className="group block">
                <div className="bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105 h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-52 object-cover"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        doctor.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <Circle className={`w-2 h-2 ${doctor.available ? 'fill-green-500' : 'fill-red-500'}`} />
                      {doctor.available ? "Available" : "Busy"}
                    </div>
                  </div>

                  {/* flex-1 ve flex-col ile kart içeriği dikeyde esner, buton aşağıda kalır */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {doctor.categoryName}
                    </p>
                    
                    {/* mt-auto: Bu butonu kartın en altına iter */}
                    <div
                      className={`w-full mt-auto text-center py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                        doctor.available
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white group-hover:shadow-lg"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {doctor.available ? "Book Appointment" : "Not Available"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Doktor Bulunamadığında Gösterilecek Mesaj */}
          {filteredDoctors.length === 0 && (
            <div className="text-center text-gray-500 mt-20 py-10">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No doctors found.</p>
              <p className="text-sm">
                Try selecting a different specialization.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllDoctors;
