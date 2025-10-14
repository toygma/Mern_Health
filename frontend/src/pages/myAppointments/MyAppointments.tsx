import { Clock, CreditCard, MapPin, X } from "lucide-react";
import {
  useDeleteAppointmentMutation,
  useGetMeAppointmentQuery,
} from "../../redux/api/appointment-api";
import moment from "moment";
import toast from "react-hot-toast";
import { useState } from "react";

const MyAppointments = () => {
  const { data, isLoading: isLoadingAppointments } = useGetMeAppointmentQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({});

  const handleCancel = async (appointmentId: string) => {
    try {
      setLoadingIds((prev) => ({ ...prev, [appointmentId]: true }));
      await deleteAppointment({ id:appointmentId }).unwrap();
      toast.success("Appointment cancelled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel appointment");
    } finally {
      setLoadingIds((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  if (isLoadingAppointments) {
    return <p className="text-center mt-16">Loading appointments...</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            My Appointments
          </h2>
          <p className="text-gray-500 text-lg">
            Manage your upcoming medical appointments
          </p>
        </div>

        {/* Appointments Grid */}
        <div className="space-y-6">
          {data?.data?.length ? (
            data.data.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Doctor Image */}
                  <div className="md:w-1/4 h-64 md:h-auto bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                    {item.doctor.images?.length > 0 ? (
                      <img
                        src={item.doctor.images[0].url}
                        alt={item.doctor.name}
                        className="w-full h-full rounded-2xl border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/200"
                        alt={item.doctor.name}
                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                      />
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {item?.doctor?.name}
                        </h3>
                        <p className="text-blue-600 font-semibold text-lg">
                          {item?.doctor?.speciality}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        {/* Address */}
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500 mb-0.5">Address</p>
                            <p className="text-gray-800">{item?.doctor?.address?.city}</p>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500 mb-0.5">Date & Time</p>
                            <p className="text-gray-800 font-semibold">
                              {moment(item?.date).format("L")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer">
                        <CreditCard className="w-5 h-5" />
                        Pay Online
                      </button>
                      <button
                        onClick={() => handleCancel(item._id)}
                        disabled={loadingIds[item._id]}
                        className={`flex-1 ${
                          loadingIds[item._id]
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200"
                        } font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        <X className="w-5 h-5" />
                        {loadingIds[item._id] ? "Cancelling..." : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-16">No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
