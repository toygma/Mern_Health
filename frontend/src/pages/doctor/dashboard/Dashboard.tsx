import React, { useState, useMemo, useEffect } from "react";
import {
  useConfirmAppointmentMutation,
  useGetDoctorAppointmentQuery,
} from "../../../redux/api/appointment-api";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

// TypeScript Types
interface IUser {
  _id: string;
  name: string;
  phone: string;
}

interface IAppointment {
  _id: string;
  user: IUser;
  date: string | Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  reason: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface IStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
}

type FilterStatus = "all" | "pending" | "confirmed" | "cancelled" | "completed";

const DoctorPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: appointmentsData,
    isLoading,
    error,
  } = useGetDoctorAppointmentQuery(id);

  const [confirmMutation, { isSuccess, error: errorConfirm }] =
    useConfirmAppointmentMutation();

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateAppointmentStatus = async (appointmentId: string) => {
    await confirmMutation({ id: appointmentId }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Appointment confirmed");
    } else if (errorConfirm && "data" in errorConfirm) {
      toast.error((errorConfirm as any)?.data?.message || "Login failed!");
    }
  }, [isSuccess, errorConfirm]);

  // Filtrelenmiş ve aranmış randevular
  const filteredAppointments = useMemo<IAppointment[]>(() => {
    if (!appointmentsData?.data) return [];
    return appointmentsData?.data
      .filter(
        (apt: IAppointment) =>
          filterStatus === "all" || apt.status === filterStatus
      )
      .filter(
        (apt: IAppointment) =>
          apt.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(
        (a: IAppointment, b: IAppointment) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [appointmentsData, filterStatus, searchTerm]);
  console.log("🚀 ~ DoctorPanel ~ filteredAppointments:", filteredAppointments)

  // Durum badge'i
  const getStatusBadge = (status: IAppointment["status"]): any => {
    const styles: Record<IAppointment["status"], string> = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
    };

    const labels: Record<IAppointment["status"], string> = {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  // İstatistikler
  const stats = useMemo<IStats>(() => {
    if (!appointmentsData?.data)
      return { total: 0, pending: 0, confirmed: 0, completed: 0 };
    return {
      total: appointmentsData?.data.length,
      pending: appointmentsData?.data.filter(
        (a: IAppointment) => a.status === "pending"
      ).length,
      confirmed: appointmentsData?.data.filter(
        (a: IAppointment) => a.status === "confirmed"
      ).length,
      completed: appointmentsData?.data.filter(
        (a: IAppointment) => a.status === "completed"
      ).length,
    };
  }, [appointmentsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <AlertCircle className="mx-auto mb-4" size={48} />
          <p className="text-xl font-semibold">Error loading appointments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Appointment Management Panel
          </h1>
          <p className="text-gray-600">View and manage your appointments</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </p>
              </div>
              <Calendar className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.pending}
                </p>
              </div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.confirmed}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </p>
              </div>
              <CheckCircle className="text-indigo-500" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by patient name or reason..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilterStatus(e.target.value as FilterStatus)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Appointments</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointment List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <AlertCircle className="mx-auto mb-2" size={48} />
                      <p>No appointments found</p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment: IAppointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {appointment.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.user.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-gray-700">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="text-gray-400" size={16} />
                          <span className="text-gray-600 text-sm">
                            {appointment.timeSlot}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 text-sm max-w-xs">
                          {appointment.reason}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(appointment._id)
                                }
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 text-sm font-medium"
                              >
                                <CheckCircle size={16} /> Confirm
                              </button>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(appointment._id)
                                }
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
                              >
                                <XCircle size={16} /> Cancel
                              </button>
                            </>
                          )}
                         
                          {(appointment.status === "confirmed" ||
                            appointment.status === "cancelled") && (
                            <span className="text-gray-400 text-sm">
                              Action completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;
