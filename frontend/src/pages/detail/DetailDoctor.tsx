import { useParams } from "react-router";
import { useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Award,
  GraduationCap,
  Stethoscope,
  Phone,
  Mail,
} from "lucide-react";
import DocBookings from "./_components/DocBookings";
import Loading from "../../components/Loading";
import { useGetAllDetailQuery } from "../../redux/api/user-api";

const DetailDoctor = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isLoading } = useGetAllDetailQuery(id);
  console.log("🚀 ~ DetailDoctor ~ doctor:", doctor?.doctor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isLoading) return <Loading />;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>
          <p className="text-gray-600 mt-2">
            The doctor you’re looking for doesn’t exist.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
                <div className="relative">
                  <div className="relative">
                    {doctor.doctor.images?.length > 0 ? (
                      <img
                        src={doctor.doctor.images[0].url}
                        alt={doctor.name}
                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/200"
                        alt={doctor.doctor.name}
                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                      />
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {doctor.doctor.name}
                  </h1>
                  <p className="text-lg text-indigo-600 font-medium mt-1">
                    {doctor.doctor.speciality}
                  </p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {doctor.doctor.totalRating ?? "4.8"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({doctor.doctor.reviews?.length ?? "124"} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-5 h-5" />
                      <span className="text-sm">
                        {doctor.doctor.experience ?? "10"} years experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-indigo-600" />
                  About Dr. {doctor.doctor.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {doctor.doctor.about ||
                    `Dr. ${doctor.doctor.name} is an experienced ${doctor.doctor.speciality} dedicated to providing high-quality patient care.`}
                </p>
              </div>

              {/* Education */}
              {doctor.doctor.education?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                    Education & Qualifications
                  </h2>
                  <div className="space-y-4">
                    {doctor.doctor.education.map((edu: any, index: number) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {doctor.doctor.services?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Services Offered
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctor.doctor.services.map(
                      (service: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl"
                        >
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span className="text-gray-700 font-medium">
                            {service}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* Appointment Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Appointment Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Working Hours
                      </p>
                      <p className="text-gray-600 text-sm">
                        {doctor.doctor.hours ?? "Mon - Fri: 9:00 AM - 5:00 PM"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600 text-sm">
                        {doctor.doctor.address.city} -{" "}
                        {doctor.doctor.address.country} -{" "}
                        {doctor.doctor.address.district} -{" "}
                        {doctor.doctor.address.postalCode} -{" "}
                        {doctor.doctor.address.street}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Consultation Fee
                      </p>
                      <p className="text-gray-600 text-sm">
                        {doctor.doctor.fee ? `$${doctor.doctor.fee}` : "$100"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>{doctor.doctor.phone ?? "+1 (555) 123-4567"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>{doctor.doctor.email ?? "doctor@hospital.com"}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Send Message
                </button>
              </div>
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">
                    {doctor.doctor.patients || "500"}+
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Patients</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">
                    {doctor.doctor.experience.slice(0,2) || "10"}+
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Years Exp</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600">
                    {doctor.doctor.awards.length || "15"}+
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Awards</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <p className="text-3xl font-bold text-yellow-600">
                    {doctor.doctor.totalRating || "4.8"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Rating</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <DocBookings />
    </>
  );
};

export default DetailDoctor;
