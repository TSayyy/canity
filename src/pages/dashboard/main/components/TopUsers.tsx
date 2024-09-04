import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Data = {
  name: string;
  user: number;
};

function UsersAreaChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeOpacity={0.4} horizontal={false} />
        <XAxis dataKey="name" stroke="#B7B9C3" fontSize={14} dy={10} />
        <YAxis stroke="#B7B9C3" fontSize={14} dx={-5} unit={"k"} />
        <Tooltip />
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498DB" stopOpacity={1} />
            <stop offset="70%" stopColor="#3498DB" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area type="natural" dataKey="user" stroke="#3498DB" fill="url(#colorUsers)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TopUsers({ data }: { data: Data[] }) {
  return (
    <div className="rounded-xl shadow-custom p-3 flex justify-center items-start gap-3 flex-col">
      <span className="text-2xl font-semibold ">Total Users</span>
      <UsersAreaChart data={data} />
    </div>
  );
}
