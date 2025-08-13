"use client";

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700 flex items-center gap-4">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-slate-400">{title}</p>
      </div>
    </div>
  );
};

const CardSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <Card key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
      ))}
    </div>
  );
};

export default CardSection;
