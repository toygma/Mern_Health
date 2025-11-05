import { Clock, CreditCard, MapPin, X } from "lucide-react";
import {
  useDeleteAppointmentMutation,
  useGetMeAppointmentQuery,
} from "../../redux/api/appointment-api";
import moment from "moment";
import toast from "react-hot-toast";
import { useCreateCheckoutMutation } from "../../redux/api/checkout-api";
import { useState } from "react";
import { useAppSelector } from "../../redux/hook";

// Type definitions
interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  images?: { url: string }[];
  address?: { city: string };
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  date: string;
  timeSlot: string;
}

const MyAppointments = () => {
  const { data, isLoading: isLoadingAppointments } = useGetMeAppointmentQuery();
  const [createCheckout] = useCreateCheckoutMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const { user } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ MyAppointments ~ user:", user);

  const [loadingCheckoutId, setLoadingCheckoutId] = useState<string | null>(
    null
  );
  const [loadingCancelId, setLoadingCancelId] = useState<string | null>(null);

  const handleCheckout = async (doctorId: string, appointmentId: string) => {
    setLoadingCheckoutId(appointmentId);
    try {
      const res = await createCheckout({ doctorId, appointmentId }).unwrap();

      if (res?.sessionUrl) {
        window.location.href = res.sessionUrl;
      } else {
        toast.error("Failed to get Stripe checkout URL");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Checkout failed!");
      console.error("Checkout error:", err);
    } finally {
      setLoadingCheckoutId(null);
    }
  };

  const handleCancel = async (appointmentId: string) => {
    setLoadingCancelId(appointmentId);
    try {
      await deleteAppointment({ id: appointmentId }).unwrap();
      toast.success("Appointment cancelled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel appointment");
      console.error("Delete error:", err);
    } finally {
      setLoadingCancelId(null);
    }
  };

  if (isLoadingAppointments) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600 text-lg">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            My Appointments
          </h2>
          <p className="text-gray-500 text-lg">
            Manage your upcoming medical appointments
          </p>
        </div>

        <div className="space-y-6">
          {data?.data?.length ? (
            data.data.map((item: Appointment) => {
              const isCheckoutLoading = loadingCheckoutId === item._id;
              const isCancelLoading = loadingCancelId === item._id;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Doctor Image */}
                    <div className="md:w-1/4 h-64 md:h-auto bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                      {item.doctor.images?.length ? (
                        <img
                          src={item.doctor.images[0].url}
                          alt={`Dr. ${item.doctor.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
                          <span className="text-4xl text-blue-600 font-bold">
                            {item.doctor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            Dr. {item.doctor.name}
                          </h3>
                          <p className="text-blue-600 font-semibold text-lg">
                            {item.doctor.speciality}
                          </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                          {item.doctor.address?.city && (
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-500 mb-0.5">
                                  Address
                                </p>
                                <p className="text-gray-800">
                                  {item.doctor.address.city}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 mb-0.5">
                                Date & Time
                              </p>
                              <p className="text-gray-800 font-semibold">
                                {moment(item.date).format("LL")} -{" "}
                                {item.timeSlot}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                        <button
                          onClick={() =>
                            handleCheckout(item.doctor._id, item._id)
                          }
                          disabled={isCheckoutLoading || user?.paid === "paid"}
                          className={`flex-1 ${
                            isCheckoutLoading
                              ? "bg-blue-300 cursor-not-allowed"
                              : user?.paid === "paid"
                              ? "bg-gray-400"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                          } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
                        >
                          <CreditCard className="w-5 h-5" />
                          {isCheckoutLoading
                            ? "Processing..."
                            : user?.paid === "paid"
                            ? "payment has been made."
                            : "Pay Online"}
                        </button>

                        {user?.paid !== "paid" && (
                          <button
                            onClick={() => handleCancel(item._id)}
                            disabled={isCancelLoading}
                            className={`flex-1 ${
                              isCancelLoading
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200"
                            } font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2`}
                          >
                            <X className="w-5 h-5" />
                            {isCancelLoading ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-lg mb-2">
                No appointments found
              </p>
              <p className="text-gray-400">
                Book your first appointment to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
