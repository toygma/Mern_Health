import {  useState } from "react";
import { Circle, User } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import { useGetAllDoctorsQuery } from "../../redux/api/doctor-api";
import type { Doctor } from "./_components/dataDoctor";
import { generateSlugify } from "../../utils/helper";

const categories = [
  { id: "all", name: "All Doctors", icon: "👨‍⚕️" },
  { id: "cardiologist", name: "Cardiologist", icon: "❤️" },
  { id: "dermatologist", name: "Dermatologist", icon: "🔬" },
  { id: "pediatrician", name: "Pediatrician", icon: "👶" },
  { id: "neurologist", name: "Neurologist", icon: "🧠" },
  { id: "orthopedic_surgeon", name: "Orthopedic Surgeon", icon: "🦴" },
  { id: "ophthalmologist", name: "Ophthalmologist", icon: "👁️" },
  { id: "psychiatrist", name: "Psychiatrist", icon: "💭" },
  { id: "endocrinologist", name: "Endocrinologist", icon: "🧬" },
  { id: "gastroenterologist", name: "Gastroenterologist", icon: "🍽️" },
  { id: "dentist", name: "Dentist", icon: "🦷" },
];

const AllDoctors = () => {
  const { data: doctors, isLoading } = useGetAllDoctorsQuery();
  const [selectedCategory, setSelectedCategory] = useState("all");

 const filterDoctor = doctors?.data 
  ? selectedCategory === "all"
    ? doctors.data
    : doctors.data.filter((doc:Doctor) => 
        doc?.speciality?.toLowerCase() === selectedCategory.toLowerCase()
      )
  : [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
        {/* Sidebar - Categories */}
        <aside className="w-full md:w-72 lg:w-80 md:flex-shrink-0 mb-8 md:mb-0">
          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 h-full">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Specializations
              </h2>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                Filter to search
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-x-visible pb-2 md:pb-0 -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-[250px] h-full flex-shrink-0 md:w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors duration-200 flex items-center gap-3 text-sm sm:text-base cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{cat.icon}</span>
                  <span className="font-medium truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content - Doctors */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {selectedCategory === "all"
                ? "All Doctors"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Showing {filterDoctor.length} doctors
            </p>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filterDoctor.map((doctor:Doctor) => (
              <Link
                to={`/doctor/${generateSlugify(doctor.name)}/${doctor._id}`}
                key={doctor._id}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={doctor?.images[0]?.url}
                      alt={doctor.name}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        doctor.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <Circle
                        className={`w-2 h-2 ${
                          doctor.available ? "fill-green-500" : "fill-red-500"
                        }`}
                      />
                      {doctor.available ? "Available" : "Busy"}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {doctor.speciality}
                    </p>

                    <div
                      className={`w-full mt-auto text-center py-2.5 px-4 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base ${
                        doctor.available
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white group-hover:from-blue-600 group-hover:to-indigo-700"
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

          {/* No Doctors Found */}
          {filterDoctor.length === 0 && (
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