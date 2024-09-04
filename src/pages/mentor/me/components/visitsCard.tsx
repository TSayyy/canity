import { format, subDays } from "date-fns";
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const day = payload[0].payload.name;
    return (
      <div className="bg-white p-4 shadow-xl rounded-md text-center">
        <h6 className="font-medium">{day}</h6>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({
  data,
}: {
  data: {
    name: string;
    visits: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498DB" stopOpacity={1} />
            <stop offset="95%" stopColor="#3498DB" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="visits" stroke="#3498DB" strokeWidth={2.5} fill="url(#colorVisits)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const StatsCard = ({ visits }: { visits: Record<string, number> }) => {
  const last30Days: { name: string; visits: number }[] = [];

  // Get today's date
  let currentDate = new Date();

  // Loop to get the dates for the last 30 days
  for (let i = 0; i < 30; i++) {
    // Format the date as "yyyy-MM-dd"
    const visit = Object.entries(visits).find(
      ([key]) => format(key, "MM/dd/yyyy") === format(currentDate, "MM/dd/yyyy")
    );
    last30Days.push({
      name: format(currentDate, "d MMM"),
      visits: Number(visit?.at(1)) || 0,
    });

    // Subtract 1 day from the current date
    currentDate = subDays(currentDate, 1);
  }
  return (
    <div className="shadow-custom p-6 rounded-md space-y-2">
      <div>
        <h5 className="font-medium text-xl">profile visits</h5>
        <span>last 30 days</span>
      </div>
      <Chart data={last30Days.reverse()} />
    </div>
  );
};
