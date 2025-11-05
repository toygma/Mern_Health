import { Calendar, Clock } from "lucide-react";
import Button from "../../../ui/Button";
import type { DaySlots, TimeSlot } from "../../../utils/slot.date";

type DaySlotCardProps = {
  daySlot: DaySlots;
  index: number;
  slotIndex: number;
  setSlotIndex: (index: number) => void;
  selectedSlots: { [dayIndex: number]: TimeSlot | null };
  setSelectedSlots: React.Dispatch<
    React.SetStateAction<{ [dayIndex: number]: TimeSlot | null }>
  >;
  onBookAppointment: (index: number) => void;
  loading: boolean;
};

const DaySlotCard = ({
  daySlot,
  index,
  slotIndex,
  setSlotIndex,
  selectedSlots,
  setSelectedSlots,
  onBookAppointment,
  loading,
}: DaySlotCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 h-[350px] overflow-y-auto">
      {/* Gün Başlığı */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setSlotIndex(index)}
          className={`font-medium text-lg transition-colors ${
            slotIndex === index ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {daySlot.dayName}, {daySlot.date}
        </button>
        <div className="w-8 h-8 bg-gray-50 rounded-md flex items-center justify-center">
          <Calendar className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Slot Seçimi */}
      <div className="space-y-2 mb-5">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Available Times
        </p>
        {daySlot.slots.length > 0 ? (
          daySlot.slots.map((timeSlot, idx) => (
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

      {/* Oturum Süresi Bilgisi */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2.5 mb-4">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">30 min session</span>
      </div>

      {/* Randevu Butonu */}
     {daySlot.slots.length > 0 &&  <Button
        disabled={loading}
        onClick={() => onBookAppointment(index)}
        type="button"
        loading={loading}
        className="w-full border-none bg-gray-900 text-white font-medium py-3 rounded-md hover:bg-gray-800 transition-colors text-sm cursor-pointer"
      >
        Book Appointment
      </Button>}
    </div>
  );
};

export default DaySlotCard;