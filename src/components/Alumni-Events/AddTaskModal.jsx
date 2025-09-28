import React, { useState } from "react";
import { Plus, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function AddTaskModal({ selectedDate, onAddTask, open, onOpenChange }) {
  const [formData, setFormData] = useState({ title: "", description: "", time: "", type: "task", priority: "medium" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !formData.title) return;
    onAddTask({ ...formData, date: selectedDate });
    setFormData({ title: "", description: "", time: "", type: "task", priority: "medium" });
    onOpenChange(false);
  };

  const handleInputChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => onOpenChange(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="relative w-full max-w-md rounded-xl bg-white shadow-xl">
              <div className="border-b px-5 py-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900"><Plus className="h-5 w-5" /><span>Add {formData.type === "task" ? "Task" : "Deadline"}</span></div>
                <p className="mt-1 text-sm text-gray-500">{selectedDate ? `Adding to ${selectedDate.toLocaleDateString()}` : "Choose a date"}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select value={formData.type} onChange={(e) => handleInputChange("type", e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="task">Task</option>
                      <option value="deadline">Deadline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select value={formData.priority} onChange={(e) => handleInputChange("priority", e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input id="title" placeholder="Enter title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => onOpenChange(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold border border-gray-300 text-black hover:bg-opacity-90">Add {formData.type === "task" ? "Task" : "Deadline"}</button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
