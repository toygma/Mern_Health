import { Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";

const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to book an appointment",
      });
    }

    if (!doctorId || !date || !timeSlot || !reason) {
      return res.status(400).json({
        success: false,
        message: "Doctor, date, timeSlot and reason are required",
      });
    }

    const appointmentDate = new Date(date);
    if (appointmentDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot book appointment for past dates",
      });
    }

    // Aynı doktor ve kullanıcı için aynı gün birden fazla randevu engelle
    const existingAppointment = await Appointment.findOne({
      user: userId,
      doctor: doctorId,
      date: {
        $gte: new Date(appointmentDate),
        $lt: new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000),
      },
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message:
          "You already have an appointment with this doctor on this date",
      });
    }

    const appointment = new Appointment({
      user: userId,
      doctor: doctorId,
      date: appointmentDate,
      timeSlot,
      reason,
    });

    const savedAppointment = await appointment.save();

    const populatedAppointment = await Appointment.findById(
      savedAppointment._id
    )
      .populate("user", "name email phone")
      .populate("doctor", "name speciality fee");

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: populatedAppointment,
    });
  } catch (error: any) {
    console.error("Create Appointment Error:", error);
    if (error.message.includes("already booked")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
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
      .populate("doctor", "name speciality images fee")
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
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctor: doctorId })
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
    const { appointmentId } = req.params;
    const userId = req.user?._id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.user._id.toString() !== userId?.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own appointments",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
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
    const { appointmentId } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
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

const getAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required (YYYY-MM-DD format)",
      });
    }

    // Doktoru kontrol et
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const startDate = new Date(date as string);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startDate, $lt: endDate },
      status: { $in: ["pending", "confirmed"] },
    });

    const bookedSlots = bookedAppointments.map((apt) => apt.timeSlot);

    const allSlots = [
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
    ];

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.status(200).json({
      success: true,
      message: "Available slots fetched successfully",
      date,
      totalSlots: allSlots.length,
      availableCount: availableSlots.length,
      availableSlots,
    });
  } catch (error) {
    console.error("Get Available Slots Error:", error);
    next(error);
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
