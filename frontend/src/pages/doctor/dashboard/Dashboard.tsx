import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  useConfirmAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetDoctorAppointmentQuery,
} from "../../../redux/api/appointment-api";
import type { FilterStatus, IAppointment, IStats } from "../../../types/types";
import toast from "react-hot-toast";
import StatsCard from "../_components/StatsCard";
import { AlertCircle, Calendar, CheckCircle } from "lucide-react";
import FilterBar from "../_components/FilterSearch";
import AppointmentRow from "../_components/AppointmentRow";

const DoctorPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: appointmentsData,
    isLoading,
    error,
  } = useGetDoctorAppointmentQuery(id);

  const [confirmMutation, { isSuccess, error: errorConfirm }] =
    useConfirmAppointmentMutation();

  const [deleteMutation] = useDeleteAppointmentMutation();

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const updateAppointmentStatus = async (appointmentId: string) => {
    try {
      await confirmMutation({ id: appointmentId }).unwrap();
      toast.success("Appointment Success");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteAppointmentStatus = async (appointmentId: string) => {
    try {
      await deleteMutation({ id: appointmentId }).unwrap();
      toast.success("Delete Success");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success("Appointment confirmed");
    if (errorConfirm && "data" in errorConfirm)
      toast.error((errorConfirm as any).data?.message || "Confirm failed!");
  }, [isSuccess, errorConfirm]);

  const filteredAppointments = useMemo(() => {
    if (!appointmentsData?.data) return [];
    return appointmentsData.data
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

  const stats = useMemo<IStats>(() => {
    const list = appointmentsData?.data || [];
    return {
      total: list.length,
      pending: list.filter((a: IAppointment) => a.status === "pending").length,
      confirmed: list.filter((a: IAppointment) => a.status === "confirmed")
        .length,
      completed: list.filter((a: IAppointment) => a.status === "completed")
        .length,
    };
  }, [appointmentsData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Appointment Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Total"
            value={stats.total}
            icon={<Calendar size={32} />}
          />
          <StatsCard
            label="Pending"
            value={stats.pending}
            icon={<AlertCircle size={32} />}
          />
          <StatsCard
            label="Confirmed"
            value={stats.confirmed}
            icon={<CheckCircle size={32} />}
          />
          <StatsCard
            label="Completed"
            value={stats.completed}
            icon={<CheckCircle size={32} />}
          />
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Date & Time</th>
                <th className="px-6 py-4 text-left">Reason</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <AlertCircle className="mx-auto mb-2" size={48} />
                    No appointments found
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt: IAppointment) => (
                  <AppointmentRow
                    key={apt._id}
                    appointment={apt}
                    onUpdate={updateAppointmentStatus}
                    onDelete={deleteAppointmentStatus}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;
