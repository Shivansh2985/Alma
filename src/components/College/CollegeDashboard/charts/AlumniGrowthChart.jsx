import { useEffect, useRef } from "react";

export default function AlumniGrowthChart() {
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
          x: ["2019", "2020", "2021", "2022", "2023", "2024"],
          y: [8500, 9200, 10800, 12400, 13900, 15234],
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#16a34a", width: 3 },   // green line
          marker: { color: "#f97316", size: 8 },  // orange markers
          name: "Alumni Count",
        },
      ];
      const layout = {
        title: { text: "", font: { color: "#16a34a" } },
        xaxis: { title: "Year", color: "#374151", gridcolor: "#f3f4f6" },
        yaxis: { title: "Number of Alumni", color: "#374151", gridcolor: "#f3f4f6" },
        plot_bgcolor: "white",
        paper_bgcolor: "white",
        font: { family: "Inter, sans-serif", size: 12, color: "#374151" },
        margin: { l: 60, r: 30, t: 30, b: 60 },
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
