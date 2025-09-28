import React, { useState } from "react";
import { Plus, Calendar, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CreateEventModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", date: "", time: "", location: "", category: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event Created: Your event has been successfully created!");
    setOpen(false);
    setFormData({ title: "", description: "", date: "", time: "", location: "", category: "" });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black hover:bg-opacity-90 border-2 cursor-pointer bg-green-500">
        <Plus className="h-4 w-4" /> Create Event
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="border-b px-5 py-4">
                  <h3 className="text-xl font-semibold text-gray-900">Create New Event</h3>
                  <p className="text-sm text-gray-500">Fill in the details below to create your event</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                  {/* Form fields */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                    <input id="title" placeholder="Enter event title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Date</label>
                    <input id="title" placeholder="00/00/0000" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Description</label>
                    <input id="title" placeholder="describe here" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  {/* ... other form fields can be added here in the same pattern ... */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
                    <button type="submit" className="flex-1 rounded-lg   border border-gray-300 bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-80 cursor-pointer">Create Event</button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
