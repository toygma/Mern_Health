import { Calendar, CheckCircle, Clock, User, XCircle } from "lucide-react";
import type { IAppointment } from "../../../types/types";
import StatusBadge from "./StatusBadge";

const AppointmentRow = ({
  appointment,
  onUpdate,
}: {
  appointment: IAppointment;
  onUpdate: (id: string) => void;
}) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="text-blue-600" size={20} />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{appointment.user.name}</p>
        <p className="text-sm text-gray-500">{appointment?.user?.phone || ""}</p>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Calendar className="text-gray-400" size={16} />
        <span>{new Date(appointment.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Clock className="text-gray-400" size={16} />
        <span className="text-gray-600 text-sm">{appointment.timeSlot}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-gray-700">{appointment.reason}</td>
    <td className="px-6 py-4">
      <StatusBadge status={appointment.status} paid={appointment.isPaid} />
    </td>
    <td className="px-6 py-4">
      {appointment.status === "pending" ? (
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(appointment._id)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-1 text-sm"
          >
            <CheckCircle size={16} /> Confirm
          </button>
          <button
            onClick={() => onUpdate(appointment._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1 text-sm"
          >
            <XCircle size={16} /> Cancel
          </button>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">Action completed</span>
      )}
    </td>
  </tr>
);

export default AppointmentRow