"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type TasksType = {
  _id: string;
  groupID:string,
  taskName:string,
  preRequsitse?:string[],
  assignedTo?:string[],
  status?:'To Do' | 'In Progress' | 'Done',
  createdAt?:Date,
  duration?:number,
  progress?:number,
};
type Props = {
  tasksList: TasksType[];
};

async function GanttChart( {tasksList}:Props) {
  const taskMap = new Map<string, { start: number; end: number }>();

  function getSchedule(task: TasksType): { start: number; end: number } {
    if (taskMap.has(task._id)) return taskMap.get(task._id)!;

    if (!task.preRequsitse || task.preRequsitse.length === 0) {
      const start = 0;
      const end = start + (task.duration ?? 1);
      taskMap.set(task._id, { start, end });
      return { start, end };
    }

    // find max end time of prerequisites
    let maxEnd = 0;
    for (const preId of task.preRequsitse) {
      const prereq = tasksList.find((t) => t._id === preId);
      if (prereq) {
        const { end } = getSchedule(prereq);
        maxEnd = Math.max(maxEnd, end);
      }
    }

    const start = maxEnd;
    const end = start + (task.duration ?? 1);
    taskMap.set(task._id, { start, end });
    return { start, end };
  }

  const schedules = tasksList.map((task) => ({
    ...task,
    ...getSchedule(task),
  }));

  const labels = schedules.map((t) => t.taskName);

  // ---- Prepare Chart.js stacked dataset ----
  const colors=[]
  for (let index = 0; index < schedules.length; index++) {
    colors.push([Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)])
  }
  const transformedData = {
    labels,
    borderSkiped:false,
    datasets: [
    {
      label: "Tasks",
      data: schedules.map((t) => ({
        x: [t.start, t.end],   // range [start, end]
        y: t.taskName,         // task name on y-axis
      })),
      backgroundColor: colors.map((color)=>"rgba("+color.join(",")+",0.3)"),
      borderColor: colors.map((color)=>"rgba("+color.join(",")+",0.8)"),
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped:false,
    },
  ],
  };

  const options = {
    indexAxis: "y" as const, // horizontal bars
    scales: {
      x: {
        min: 0,
        title: { display: true, text: "Days" },
        stacked: true,
      },
      y: { stacked: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gantt Chart</h2>
      <Bar data={transformedData} options={options} />
    </div>
  );
}

export default GanttChart;