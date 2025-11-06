import { Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import moment from "moment";

// Girdi için interface (TypeScript için)
interface CreateAppointmentBody {
  doctorId: string;
  date: string;
  timeSlot: string;
  reason: string;
}

const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId, date, timeSlot, reason } =
      req.body as CreateAppointmentBody;
    const userId = req.user?._id;

    // -------------------------
    // VALIDATION
    // -------------------------
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You must be logged in" });
    }
    if (!doctorId || !date || !timeSlot || !reason) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Doctor, date, timeSlot, reason are required",
        });
    }

    // Convert date + timeSlot to actual Date object
    const [hoursStr, minutesStr, meridiem] = timeSlot
      .match(/(\d+):(\d+)\s?(AM|PM)/i)!
      .slice(1);
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

    const [month, day, year] = date.split("/").map(Number); // assuming MM/DD/YYYY
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);

    if (appointmentDateTime < new Date()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot book appointment for past dates",
        });
    }

    // -------------------------
    // CHECK DOCTOR
    // -------------------------
    const doctor = await Doctor.findById(doctorId);
    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    // -------------------------
    // CHECK EXISTING APPOINTMENT
    // -------------------------
    const existing = await Appointment.findOne({
      user: userId,
      doctor: doctorId,
      date: {
        $gte: new Date(year, month - 1, day),
        $lt: new Date(year, month - 1, day + 1),
      },
      status: { $in: ["pending", "confirmed"] },
    });
    if (existing)
      return res
        .status(409)
        .json({
          success: false,
          message:
            "You already have an appointment with this doctor on this date",
        });

    // -------------------------
    // CREATE APPOINTMENT
    // -------------------------
    const appointment = await Appointment.create({
      user: userId,
      doctor: doctorId,
      date: appointmentDateTime,
      timeSlot,
      reason,
    });

    // -------------------------
    // UPDATE DOCTOR APPOINTMENTS
    // -------------------------
    doctor.appointments.push(appointment._id);
    await doctor.save();

    // -------------------------
    // POPULATE AND RETURN
    // -------------------------
    const populated = await Appointment.findById(appointment._id)
      .populate("user", "name email phone")
      .populate("doctor", "name speciality fee");

    res
      .status(201)
      .json({
        success: true,
        message: "Appointment booked successfully",
        data: populated,
      });
  } catch (err) {
    console.error("Create Appointment Error:", err);
    next(err);
  }
};

const getUserAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in",
      });
    }

    const appointments = await Appointment.find({ user: userId })
      .populate("user")
      .populate("doctor")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Your appointments fetched successfully",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Get User Appointments Error:", error);
    next(error);
  }
};

const getDoctorAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const appointments = await Appointment.find({ doctor: id })
      .populate("user", "name email phone")
      .populate("doctor", "name speciality")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Doctor appointments fetched successfully",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    next(error);
  }
};

const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const appointment = await Appointment.findById(id);
  

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const isPatient =
      user.role === "patient" &&
      appointment.user.toString() === user._id.toString();

    const isDoctor =
      user.role === "doctor" &&
      appointment.doctor.toString() === user._id.toString();

    if (!isPatient && !isDoctor) {
      return res.status(403).json({
        success: false,
        message:
          "You can only cancel your own appointments or your own doctor appointments",
      });
    }

     await Doctor.findByIdAndUpdate(appointment.doctor, {
      $pull: { appointments: appointment._id },
    });

    await Appointment.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    next(error);
  }
};

const confirmAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "confirmed" },
      { new: true }
    )
      .populate("user", "name email phone")
      .populate("doctor", "name speciality");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment confirmed successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Confirm Appointment Error:", error);
    next(error);
  }
};

const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const dateString = req.query.date as string;

    if (!dateString) {
      return res.status(400).json({ message: "Date is required." });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    const requestedDate = moment(dateString, "YYYY-MM-DD");
    const dayOfWeek = requestedDate.day();

    const schedule = doctor.workingHours.find((d) => d.dayOfWeek === dayOfWeek);

    if (!schedule?.isWorking) {
      return res.json({ availableSlots: [] });
    }

    const startOfDay = requestedDate.clone().startOf("day").toDate();
    const endOfDay = requestedDate.clone().endOf("day").toDate();

    const bookedAppointments = await Appointment.aggregate([
      {
        $match: {
          doctor: doctorId,
          date: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $project: {
          _id: 0,
          time: { $dateToString: { format: "%H:%M", date: "$date" } },
        },
      },
    ]);

    const bookedSlots = bookedAppointments.map((a) => a.time);

    // Tüm olası saatleri oluştur
    const slots: string[] = [];
    let currentSlot = moment(schedule.startTime, "HH:mm");
    const endTime = moment(schedule.endTime, "HH:mm");
    const duration = doctor.appointmentDurationMinutes;

    while (currentSlot.isBefore(endTime)) {
      const slotTime = currentSlot.format("HH:mm");
      if (!bookedSlots.includes(slotTime)) {
        slots.push(slotTime);
      }
      currentSlot.add(duration, "minutes");
    }

    res.json({ availableSlots: slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred." });
  }
};

export {
  getAvailableSlots,
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  cancelAppointment,
  confirmAppointment,
};
