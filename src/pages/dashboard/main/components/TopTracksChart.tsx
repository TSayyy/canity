import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#181D3C", "#3498DB", "#DEE12D", "#3734DB", "#2ECC71", "#F93C65"];
type Data = {
  name: string;
  value: number;
};

export function DashboardPieChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} cx={"50%"} cy={"50%"} innerRadius={"50%"} fill="#8884d8" paddingAngle={2} dataKey="value">
          {data?.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          <Label
            position="center"
            value={"Top Tracks"}
            fill="#000"
            className="text-center sm:text-xl md:text-2xl  font-semibold"
          />
        </Pie>
        <Legend
          verticalAlign="middle"
          wrapperStyle={{ lineHeight: 2.5, textAlign: "center", fontSize: ".8rem" }}
          iconType="circle"
          layout="vertical"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TopTracksChart({ data }: { data: Data[] }) {
  return (
    <div className="rounded-xl shadow-custom ">
      <DashboardPieChart data={data} />
    </div>
  );
}
