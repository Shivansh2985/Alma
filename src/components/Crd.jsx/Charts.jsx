import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const progressData = [
  { day: 'Mon', value: 65, projects: 8 },
  { day: 'Tue', value: 72, projects: 9 },
  { day: 'Wed', value: 68, projects: 7 },
  { day: 'Thu', value: 85, projects: 12 },
  { day: 'Fri', value: 90, projects: 14 },
  { day: 'Sat', value: 75, projects: 10 },
  { day: 'Sun', value: 82, projects: 11 },
];

const resourceData = [
  { name: 'Research Papers', value: 35 },
  { name: 'Lab Equipment', value: 25 },
  { name: 'Computing Resources', value: 20 },
  { name: 'Collaboration Tools', value: 20 },
];

const activityData = [
  { week: 'Week 1', commits: 24, reviews: 12 },
  { week: 'Week 2', commits: 32, reviews: 18 },
  { week: 'Week 3', commits: 28, reviews: 15 },
  { week: 'Week 4', commits: 45, reviews: 22 },
];

export const ProgressChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const trace = {
        x: progressData.map(d => d.day),
        y: progressData.map(d => d.value),
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#4f46e5',
          width: 3
        },
        marker: {
          color: '#4f46e5',
          size: 8
        },
        name: 'Progress'
      };

      const layout = {
        title: '',
        xaxis: { title: '', showgrid: false },
        yaxis: { title: '', showgrid: true, gridcolor: '#f1f5f9' },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        margin: { t: 20, r: 20, b: 40, l: 40 },
        height: 300
      };

      const config = { displayModeBar: false, responsive: true };
      Plotly.newPlot(chartRef.current, [trace], layout, config);
    }

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <Card className="col-span-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row text-white items-center justify-between">
        <CardTitle>Project Progress Overview</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">7D</Button>
          <Button variant="gradient" size="sm" className="text-xs">1M</Button>
          <Button variant="outline" size="sm" className="text-xs">3M</Button>
          <Button variant="outline" size="sm" className="text-xs">1Y</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} />
      </CardContent>
    </Card>
  );
};

export const ResourceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const colors = ['#4f46e5', '#06b6d4', '#f59e0b', '#8b5cf6'];
      
      const trace = {
        labels: resourceData.map(d => d.name),
        values: resourceData.map(d => d.value),
        type: 'pie',
        hole: 0.4,
        marker: {
          colors: colors
        }
      };

      const layout = {
        title: '',
        showlegend: false,
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        margin: { t: 20, r: 20, b: 20, l: 20 },
        height: 250
      };

      const config = { displayModeBar: false, responsive: true };
      Plotly.newPlot(chartRef.current, [trace], layout, config);
    }

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex text-white items-center gap-2">
          Resource Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} />
        <div className="mt-4 space-y-2">
          {resourceData.map((item, index) => {
            const colors = ['#4f46e5', '#06b6d4', '#f59e0b', '#8b5cf6'];
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-auto text-gray-500">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const TeamActivityChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const trace1 = {
        x: activityData.map(d => d.week),
        y: activityData.map(d => d.commits),
        type: 'bar',
        name: 'Commits',
        marker: {
          color: '#4f46e5'
        }
      };

      const trace2 = {
        x: activityData.map(d => d.week),
        y: activityData.map(d => d.reviews),
        type: 'bar',
        name: 'Reviews',
        marker: {
          color: '#06b6d4'
        }
      };

      const layout = {
        title: '',
        xaxis: { title: '', showgrid: false },
        yaxis: { title: '', showgrid: true, gridcolor: '#f1f5f9' },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        margin: { t: 20, r: 20, b: 40, l: 40 },
        height: 300,
        barmode: 'group'
      };

      const config = { displayModeBar: false, responsive: true };
      Plotly.newPlot(chartRef.current, [trace1, trace2], layout, config);
    }

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <Card className="transition-all text-white duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Team Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} />
      </CardContent>
    </Card>
  );
};