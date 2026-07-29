export default function StatsBar() {
  const stats = [
    { value: "50+", label: "// projects_shipped" },
    { value: "30+", label: "// happy_clients" },
    { value: "99.9%", label: "// uptime_avg" },
    { value: "24/7", label: "// support_channel" },
  ];

  return (
    <div className="w-full bg-bg-secondary border-y border-border-subtle py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-subtle">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col items-center justify-center ${i !== 0 ? "pl-8" : ""}`}>
            <div className="text-3xl font-bold text-fg-primary mb-1">{stat.value}</div>
            <div className="text-xs text-brand">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
