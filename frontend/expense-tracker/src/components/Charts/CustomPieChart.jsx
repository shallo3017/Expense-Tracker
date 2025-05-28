import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  return (
    <div className="relative w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* ✅ Hover Tooltip Enabled */}
          <Tooltip content={<CustomTooltip />} />

          {/* ✅ Legend below chart */}
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            layout="horizontal"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ Center Label Styling */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-md text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{totalAmount}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
