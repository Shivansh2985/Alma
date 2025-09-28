import React, { useState } from "react"; // Add useState to this line
// ...existing code...
import AddTaskModal from "../Alumni-Events/AddTaskModal.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export default function CalendarView({ tasks, onAddTask, onToggleTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getTasksForDate = (date) => tasks.filter((task) => isSameDay(task.date, date));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowAddModal(true);
  };

  const getPriorityColor = (priority, completed) => {
    if (completed) return "bg-gray-100 text-gray-400 line-through border-gray-200";
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "low":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getTaskIcon = (type) =>
    type === "deadline" ? (
      <AlertTriangle className="h-3 w-3" />
    ) : (
      <CheckCircle className="h-3 w-3" />
    );

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{format(currentDate, "MMMM yyyy")}</h2>
          <p className="text-sm text-gray-500">
            {tasks.length} total tasks • {tasks.filter((t) => !t.completed).length} pending
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 min-w-[100px] hover:bg-gray-100"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const dayTasks = getTasksForDate(date);
            const inCurrentMonth = isSameMonth(date, currentDate);
            const isDayToday = isToday(date);

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer hover:bg-blue-50 transition-colors group ${
                  !inCurrentMonth ? "bg-gray-50" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <div
                  className={`text-sm font-medium mb-2 flex items-center justify-between ${
                    !inCurrentMonth
                      ? "text-gray-400"
                      : isDayToday
                      ? "text-blue-600 font-bold"
                      : "text-gray-900"
                  }`}
                >
                  <span
                    className={
                      isDayToday
                        ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        : ""
                    }
                  >
                    {format(date, "d")}
                  </span>
                  <Plus className="h-3 w-3 opacity-0 group-hover:opacity-100 text-gray-400" />
                </div>

                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs p-1.5 rounded border cursor-pointer hover:scale-[1.01] transition ${getPriorityColor(
                        task.priority,
                        task.completed
                      )}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTask(task.id);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {getTaskIcon(task.type)}
                        <span className="truncate flex-1">{task.title}</span>
                      </div>
                      {task.time && (
                        <div className="flex items-center gap-1 mt-1 opacity-75">
                          <Clock className="h-2.5 w-2.5" />
                          <span className="text-[11px]">{task.time}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-gray-500">Task</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <span className="text-gray-500">Deadline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-gray-500">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-blue-600" />
          <span className="text-gray-500">Click dates to add tasks</span>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        selectedDate={selectedDate}
        onAddTask={onAddTask}
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
}

