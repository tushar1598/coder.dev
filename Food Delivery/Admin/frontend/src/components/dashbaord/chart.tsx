import React from "react";

interface ChartDataPoint {
  month: string;
  value: number;
}

interface ChartProps {
  data: ChartDataPoint[];
  title: string;
}

export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="relative h-80">
        <div className="absolute inset-0 flex items-end justify-around gap-4 px-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group"
            >
              <div
                className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600 relative"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </span>
              </div>
              <span className="text-sm text-gray-600 mt-3">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500">
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};
