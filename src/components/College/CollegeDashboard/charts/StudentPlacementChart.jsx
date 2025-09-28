import { useEffect, useRef } from "react";

export default function StudentPlacementChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const loadPlotly = async () => {
      if (typeof window !== "undefined" && !window.Plotly) {
        const script = document.createElement("script");
        script.src = "https://cdn.plot.ly/plotly-latest.min.js";
        script.onload = () => createChart();
        document.head.appendChild(script);
      } else if (window.Plotly) {
        createChart();
      }
    };

    const createChart = () => {
      if (!chartRef.current || !window.Plotly) return;
      const data = [
        {
          labels: ["Placed", "Higher Studies", "Entrepreneurship", "Seeking"],
          values: [68, 18, 8, 6],
          type: "pie",
          marker: {
            colors: [
              "#16a34a", // green - placed
              "#3b82f6", // blue - higher studies
              "#f59e0b", // amber - entrepreneurship
              "#ef4444", // red - seeking
            ],
          },
          textinfo: "label+percent",
          textposition: "outside",
          textfont: { color: "#374151", size: 11 },
        },
      ];
      const layout = {
        title: { text: "", font: { color: "#3b82f6" } },
        plot_bgcolor: "white",
        paper_bgcolor: "white",
        font: { family: "Inter, sans-serif", size: 12, color: "#374151" },
        margin: { l: 40, r: 40, t: 30, b: 30 },
        showlegend: false,
      };
      const config = { displayModeBar: false, responsive: true };
      window.Plotly.newPlot(chartRef.current, data, layout, config);
    };

    loadPlotly();
    return () => {
      if (chartRef.current && window.Plotly) {
        window.Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return <div ref={chartRef} className="w-full h-80" />;
}
