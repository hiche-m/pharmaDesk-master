import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { tailwindColors } from "../Utils/Colors.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";

ChartJS.register(ArcElement, Tooltip);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { width, height } } = chart;
    ctx.save();

    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = options.color || "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(`${options.value}/${options.total}`, width / 2, height / 2);

    ctx.restore();
  },
};

export default function DashboardDonuts() {
  const { todayStats } = useStateContext();
  if (!todayStats) return null;

  const total = todayStats.total_notifications_received;

  const makeData = (value, color) => ({
    datasets: [
      {
        data: [
          Math.round((value / total) * 100),
          100 - Math.round((value / total) * 100),
        ],
        backgroundColor: [color, "#F3F3F3"],
        borderWidth: 0,
      },
    ],
  });

  const makeOptions = (label, value,total) => ({
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      centerText: { value, total }, // pass values to plugin
    },
  });

  const cards = [
    {
      label: "Commandes",
      value: todayStats.total_notifications_received,
      color: tailwindColors.accent,
    },
    {
      label: "Acceptées",
      value: todayStats.notifications_accepted,
      color: tailwindColors.primary,
    },
    {
      label: "Refusées",
      value: todayStats.notifications_rejected,
      color: tailwindColors.selectionBG,
    },
    {
      label: "Ventes",
      value: todayStats.confirmed_notifications,
      color: tailwindColors.selection,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
        >
          <div className="w-28 h-28">
            <Doughnut
              data={makeData(c.value, c.color)}
              options={makeOptions(c.label, c.value, total)}
              plugins={[centerTextPlugin]}
            />
          </div>
          <span className="mt-2 text-sm font-medium">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
