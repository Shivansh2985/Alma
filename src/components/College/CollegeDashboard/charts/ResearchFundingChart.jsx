import { useEffect, useRef } from "react";

export default function ResearchFundingChart() {
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
          x: ["2020", "2021", "2022", "2023", "2024"],
          y: [2.5, 3.2, 4.1, 5.8, 7.2],
          type: "bar",
          marker: { color: "green-100", opacity: 0.85 }, // purple bars
          name: "Funding (Million $)",
        },
      ];
      const layout = {
        title: { text: "", font: { color: "#9333ea" } },
        xaxis: { title: "Year", color: "#374151", gridcolor: "#f3f4f6" },
        yaxis: { title: "Funding (Million $)", color: "#374151", gridcolor: "#f3f4f6" },
        plot_bgcolor: "white",
        paper_bgcolor: "white",
        font: { family: "Inter, sans-serif", size: 12, color: "#374151" },
        margin: { l: 70, r: 30, t: 30, b: 60 },
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
