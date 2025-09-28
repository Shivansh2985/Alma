import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserCog } from 'lucide-react';

export default function EditAlumniModal({ open, onOpenChange, alumnusData, onUpdateAlumni }) {
  const [formData, setFormData] = useState({ name: '', email: '', batch: '', section: '' });

  // Pre-fill the form whenever the selected alumnus changes
  useEffect(() => {
    if (alumnusData) {
      setFormData({
        name: alumnusData.name || '',
        email: alumnusData.email || '',
        batch: alumnusData.batch || '',
        section: alumnusData.section || '',
      });
    }
  }, [alumnusData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAlumni({ ...alumnusData, ...formData });
    onOpenChange(false);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onOpenChange(false)}>
        {/* ... Modal backdrop and structure ... */}
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Edit Alumni Information
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Form fields pre-filled with data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required />
                  </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700">Batch (Year)</label>
                      <input type="number" name="batch" value={formData.batch} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700">Section</label>
                      <input type="text" name="section" value={formData.section} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button type="button" onClick={() => onOpenChange(false)} className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-green-400 cursor-pointer px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90">
                      <UserCog size={16} /> Update
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
