import React from 'react';

// The table now accepts an 'onEdit' function prop
export default function AlumniTable({ alumni, onEdit }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Batch</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Section</th>
            <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {alumni.map((person, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{person.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-500">{person.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-500">{person.batch}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {person.section}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                {/* When clicked, this button calls the onEdit function with the current person's data */}
                <button 
                  onClick={() => onEdit(person)} 
                  className="text-primary hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
