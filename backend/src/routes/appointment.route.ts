import express from "express";
import {
  getAvailableSlots,
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  cancelAppointment,
  confirmAppointment,
} from "../controllers/appointment.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const appointmentRouter = express.Router();

// Uygun saatleri getir (herkes erişebilir)
appointmentRouter.get("/available-slots/:doctorId", getAvailableSlots);

// Kullanıcı randevu işlemleri
appointmentRouter.post("/", isAuthenticatedUser, createAppointment);
appointmentRouter.get("/users", isAuthenticatedUser, getUserAppointments);
appointmentRouter.put("/:appointmentId/cancel", isAuthenticatedUser, cancelAppointment);

// Doktor randevu işlemleri
appointmentRouter.get("/doctor/:doctorId", getDoctorAppointments);
appointmentRouter.put("/:appointmentId/confirm", confirmAppointment);

export default appointmentRouter;