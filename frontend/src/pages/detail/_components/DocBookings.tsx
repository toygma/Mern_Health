import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateAppointmentMutation } from "../../../redux/api/appointment-api";
import toast from "react-hot-toast";
import Button from "../../../ui/Button";
import moment from "moment";

type TimeSlot = {
  datetime: Date;
  time: string;
};

type DaySlots = {
  dayName: string;
  date: number;
  slots: TimeSlot[];
};

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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [createAppointment, { isSuccess, error }] =
    useCreateAppointmentMutation();
  const [loadingSlots, setLoadingSlots] = useState<{
    [index: number]: boolean;
  }>({});

  // SLOTLARI HESAPLA
  const getAvailableSlots = async (): Promise<void> => {
    if (!doctor?.workingHours) return;

    const today = new Date();
    const allSlots: DaySlots[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const dayIndex = currentDate.getDay();

      const dayHours = doctor.workingHours.find(
        (d: any) => d.dayOfWeek === dayIndex && d.isWorking
      );

      const timeSlots: TimeSlot[] = [];

      if (dayHours) {
        const [startHour, startMinute] = dayHours.startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = dayHours.endTime.split(":").map(Number);

        const startTime = new Date(currentDate);
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date(currentDate);
        endTime.setHours(endHour, endMinute, 0, 0);

        const slotDuration = 30;

        while (startTime < endTime) {
          // Bugün geçmiş saatleri geç
          if (i === 0 && startTime < new Date()) {
            startTime.setMinutes(startTime.getMinutes() + slotDuration);
            continue;
          }

          timeSlots.push({
            datetime: new Date(startTime),
            time: startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          startTime.setMinutes(startTime.getMinutes() + slotDuration);
        }
      }

      allSlots.push({
        dayName: daysOfWeek[dayIndex],
        date: currentDate.getDate(),
        slots: timeSlots,
      });
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (doctor) getAvailableSlots();
  }, [doctor]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Appointment successful");
    } else if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "Appointment failed!");
    }
  }, [isSuccess, error]);

  // REZERVASYON

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
      toast.error(err?.data?.message || "Appointment failed!");
    } finally {
      setLoadingSlots((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-700" />
            </div>
            <h1 className="font-semibold text-xl! text-gray-900">
              Available Booking Slots
            </h1>
          </div>

          {/* REASON INPUT */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {docSlots.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 h-[350px] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => setSlotIndex(index)}
                    className={`font-medium text-lg transition-colors ${
                      slotIndex === index ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {item.dayName}, {item.date}
                  </button>
                  <div className="w-8 h-8 bg-gray-50 rounded-md flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                <div className="space-y-2 mb-5 ">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Available Times
                  </p>
                  {item.slots.length > 0 ? (
                    item.slots.map((timeSlot, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setSelectedSlots((prev) => ({
                            ...prev,
                            [index]: timeSlot,
                          }))
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                          selectedSlots[index]?.time === timeSlot.time
                            ? "bg-gray-900 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {timeSlot.time.toLowerCase()}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No slots available</p>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2.5 mb-4">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">30 min session</span>
                </div>

                <Button
                  disabled={loadingSlots[index]}
                  onClick={() => handleBookAppointment(index)}
                  type="button"
                  loading={loadingSlots[index]}
                  className="w-full border-none bg-gray-900 text-white font-medium py-3 rounded-md hover:bg-gray-800 transition-colors text-sm cursor-pointer"
                >
                  Book Appointment
                </Button>
              </div>
            ))}
          </div>

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
