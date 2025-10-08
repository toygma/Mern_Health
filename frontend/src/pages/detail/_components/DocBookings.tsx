import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type TimeSlot = {
  datetime: Date;
  time: string;
};

const DocBookings = () => {
  const [docSlots, setDocSlots] = useState<TimeSlot[][]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getAvailableSlots = async (): Promise<void> => {
    setDocSlots([]);

    const today = new Date();
    const allSlots: TimeSlot[][] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots: TimeSlot[] = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };
  useEffect(() => {
    getAvailableSlots();
  }, []);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {docSlots?.map((item, index) => (
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
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]},{" "}
                    {item[0] && item[0].datetime.getDate()}
                  </button>
                  <div className="w-8 h-8 bg-gray-50 rounded-md flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                <div className="space-y-2 mb-5 ">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Available Times
                  </p>
                  {docSlots.length &&
                    docSlots[slotIndex].map((timeSlot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlotTime(timeSlot.time)}
                        className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                          timeSlot.time === slotTime
                            ? "bg-gray-900 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {timeSlot.time.toLowerCase()}
                      </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2.5 mb-4">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">30 min session</span>
                </div>

                <button className="w-full bg-gray-900 text-white font-medium py-3 rounded-md hover:bg-gray-800 transition-colors text-sm">
                  Book Appointment
                </button>
              </div>
            ))}
          </div>

          {(!docSlots || docSlots.length === 0) && (
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
