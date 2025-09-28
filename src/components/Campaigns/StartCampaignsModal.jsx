import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Plus } from 'lucide-react';

export default function StartCampaignModal({ open, onOpenChange, onAddCampaign }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCampaign({
      ...formData,
      id: Date.now(),
      raised: 0, // New campaigns start with $0 raised
      category: 'Community', // Default category
    });
    onOpenChange(false); // Close modal after submission
    // Reset form for next time
    setFormData({ title: '', description: '', goal: '', duration: '' });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onOpenChange(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                  Start a New Campaign
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Money Goal ($)</label>
                    <input type="number" name="goal" id="goal" value={formData.goal} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (in days)</label>
                    <input type="number" name="duration" id="duration" value={formData.duration} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => onOpenChange(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-opacity-90">
                      Submit Campaign
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
