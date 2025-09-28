import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ImportExportModal({ open, onOpenChange, alumni }) {
  const handleExportExcel = () => {
    // Convert the alumni data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(alumni);
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni Data");
    // Trigger the download
    XLSX.writeFile(workbook, "AlumniData.xlsx");
    onOpenChange(false); // Close the modal after download
  };

  const handleExportCsv = () => {
    // Convert the alumni data to CSV format
    const worksheet = XLSX.utils.json_to_sheet(alumni);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    
    // Create a Blob to hold the data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    
    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "AlumniData.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    onOpenChange(false); // Close the modal after download
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onOpenChange(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Import & Export Data
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Choose an option to export your alumni data. Import functionality can be added here as well.
                  </p>
                  <button
                    onClick={handleExportExcel}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
                  >
                    <Download size={16} /> Export as Excel (.xlsx)
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                  >
                    <Download size={16} /> Export as CSV (.csv)
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
