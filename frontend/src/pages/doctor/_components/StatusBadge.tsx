import type { IAppointment } from "../../../types/types";

const StatusBadge = ({ status, paid }: { status: IAppointment["status"]; paid: IAppointment["isPaid"] }) => {
  const statusColors: Record<IAppointment["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };
  const paidColors: Record<IAppointment["isPaid"], string> = {
    paid: "bg-green-100 text-green-800",
    unpaid: "bg-red-100 text-red-800",
    refunded: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="flex gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
        {status.toUpperCase()}
      </span>
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paidColors[paid]}`}>
        {paid.toUpperCase()}
      </span>
    </div>
  );
};
export default StatusBadge