import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateAppointmentMutation } from "../../../redux/api/appointment-api";
import toast from "react-hot-toast";
import moment from "moment";
import { getAvailableSlots, type DaySlots, type TimeSlot } from "../../../utils/slot.date";
import DaySlotCard from "./DaySlotCard";

type DocBookingsProps = {
  doctor: any;
};

const DocBookings = ({ doctor }: DocBookingsProps) => {
  const [docSlots, setDocSlots] = useState<DaySlots[]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [reason, setReason] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<{
    [dayIndex: number]: TimeSlot | null;
  }>({});
  const [loadingSlots, setLoadingSlots] = useState<{
    [index: number]: boolean;
  }>({});

  const [createAppointment, { isSuccess, error }] = useCreateAppointmentMutation();

  useEffect(() => {
    if (doctor) {
      const slots = getAvailableSlots(doctor);
      setDocSlots(slots);
    }
  }, [doctor]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Appointment successful");
      setSelectedSlots({});
      setReason("");
    } else if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "Appointment failed!");
    }
  }, [isSuccess, error]);

  const handleBookAppointment = async (index: number) => {
    const slot = selectedSlots[index];
    if (!slot) {
      toast.error("Please select a time slot!");
      return;
    }

    try {
      setLoadingSlots((prev) => ({ ...prev, [index]: true }));
      await createAppointment({
        doctorId: doctor._id,
        date: moment(slot.datetime).format("L"),
        timeSlot: slot.time,
        reason: reason || "General Consultation",
      }).unwrap();
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoadingSlots((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          {/* Başlık */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-700" />
            </div>
            <h1 className="font-semibold text-xl text-gray-900">
              Available Booking Slots
            </h1>
          </div>

          {/* Randevu Nedeni Input'u */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Appointment
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for appointment"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
            />
          </div>

          {/* Gün Kartları Grid'i */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSlots.map((daySlot, index) => (
              <DaySlotCard
                key={index}
                daySlot={daySlot}
                index={index}
                slotIndex={slotIndex}
                setSlotIndex={setSlotIndex}
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
                onBookAppointment={handleBookAppointment}
                loading={loadingSlots[index] || false}
              />
            ))}
          </div>

          {/* Slot Yoksa Mesaj */}
          {docSlots.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-700 font-medium">
                No booking slots available
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Please check back later or contact us directly
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocBookings;