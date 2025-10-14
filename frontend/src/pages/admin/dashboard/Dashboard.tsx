import { useMemo } from "react";
import {
  Users,
  UserCheck,
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  useGetAllAppointmentsQuery,
  useGetAllReviewsQuery,
  useGetAllUsersQuery,
} from "../../../redux/api/doctor-api";
import moment from "moment";
import React from "react";

const StatCard = React.memo(
  ({
    icon: Icon,
    title,
    value,
    color,
  }: {
    title: string;
    value: string | number;
    color: string;
    icon: any;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <Icon className={`w-12 h-12 ${color.replace("border", "text")}`} />
      </div>
    </div>
  )
);

const Dashboard = () => {
  const { data: doctorsData } = useGetAllUsersQuery();
  const { data: reviewsData } = useGetAllReviewsQuery();
  const {
    data: appointmentsData,
    isLoading,
    isError,
  } = useGetAllAppointmentsQuery();

  const appointmentList = useMemo(
    () => appointmentsData?.data ?? [],
    [appointmentsData]
  );

  const stats = useMemo(
    () => ({
      totalDoctors: doctorsData?.counts?.doctors ?? 0,
      totalPatients: doctorsData?.counts?.patients ?? 0,
      totalComments: reviewsData?.review?.length ?? 0,
      totalAppointments: appointmentList.length,
    }),
    [doctorsData, reviewsData, appointmentList]
  );

  const newAppointments = useMemo(
    () =>
      appointmentList
        .filter((apt: any) => new Date(apt.date) >= new Date())
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    [appointmentList]
  );

  const appointmentsByDoctor = useMemo(() => {
    return Object.values(
      appointmentList.reduce((acc: any, apt: any) => {
        const doctorId = apt.doctor?._id;
        if (!doctorId) return acc;

        if (!acc[doctorId]) {
          acc[doctorId] = {
            id: doctorId,
            name: apt.doctor.name,
            speciality: apt.doctor.speciality,
            count: 0,
          };
        }
        acc[doctorId].count++;
        return acc;
      }, {})
    );
  }, [appointmentList]);

 if (isLoading) {
  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <p className="text-xl text-gray-500">Loading data...</p>
    </div>
  );
}

if (isError) {
  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <p className="text-xl text-red-500">
        An error occurred while loading data.
      </p>
    </div>
  );
}

return (
  <div className="min-h-screen p-8">
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl! font-bold text-gray-800">
          Admin Control Panel
        </h1>
        <p className="text-gray-500 mt-2">
          System overview and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={UserCheck}
          title="Total Doctors"
          value={stats.totalDoctors}
          color="border-blue-500"
        />
        <StatCard
          icon={Users}
          title="Total Patients"
          value={stats.totalPatients}
          color="border-green-500"
        />
        <StatCard
          icon={MessageSquare}
          title="Total Reviews"
          value={stats.totalComments}
          color="border-purple-500"
        />
        <StatCard
          icon={Calendar}
          title="Total Appointments"
          value={stats.totalAppointments}
          color="border-orange-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Appointments by Doctor */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              Appointments by Doctor
            </h2>
          </div>
          <div className="space-y-3">
            {appointmentsByDoctor.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.speciality}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.count} appointments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              New Appointments
            </h2>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {newAppointments.length > 0 ? (
              newAppointments.map((apt: any) => (
                <div
                  key={apt._id}
                  className="p-3 bg-orange-50 rounded-lg border border-orange-200 hover:border-orange-300 transition"
                >
                  <p className="font-semibold text-gray-800 text-sm">
                    {apt.user?.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {apt.doctor?.name}
                  </p>
                  <p className="text-xs text-orange-600 font-medium mt-2">
                    {moment(apt.date).format("L")} • {apt.timeSlot}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No upcoming appointments.</p>
            )}
          </div>
        </div>
      </div>

      {/* All Appointments Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          All Appointments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((apt: any) => (
                <tr
                  key={apt._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {apt.doctor?.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {apt.user?.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {moment(apt.date).format("L")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.timeSlot}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {apt.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
};

export default Dashboard;
