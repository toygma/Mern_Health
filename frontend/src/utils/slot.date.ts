
export type TimeSlot = {
  datetime: Date;
  time: string;
};

export type DaySlots = {
  dayName: string;
  date: number;
  slots: TimeSlot[];
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


export const getAvailableSlots = (doctor: any): DaySlots[] => {
  if (!doctor?.workingHours) return [];

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
      const [startHour, startMinute] = dayHours.startTime.split(":").map(Number);
      const [endHour, endMinute] = dayHours.endTime.split(":").map(Number);

      const startTime = new Date(currentDate);
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(currentDate);
      endTime.setHours(endHour, endMinute, 0, 0);

      const slotDuration = 30; 

      while (startTime < endTime) {
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

  return allSlots;
};