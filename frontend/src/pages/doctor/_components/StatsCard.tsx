const StatsCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between border-l-4">
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    {icon}
  </div>
);
export default StatsCard;
