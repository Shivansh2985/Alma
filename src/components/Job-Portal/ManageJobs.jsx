import React from 'react'

export default function ManageJobs({ jobs = [], onBack, onEdit, onDelete, onCreate }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="px-3 py-2 border rounded">← Back</button>
          <h2 className="text-3xl font-bold">Manage Jobs</h2>
        </div>

        <div>
          <button onClick={onCreate} className="px-4 py-2 bg-green-600 text-white rounded">+ New Job</button>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.length === 0 && (
          <div className="bg-white rounded p-6 card-shadow">
            <p className="text-gray-700">You haven't posted any jobs yet. Click <strong>New Job</strong> to post one.</p>
          </div>
        )}

        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded p-6 card-shadow border flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.company} • {job.location} • {job.salary}</p>
              <p className="mt-2 text-gray-800">{job.description}</p>
              <p className="mt-2 italic text-sm">Skills: {job.skills?.join(' | ')}</p>
            </div>

            <div className="flex flex-col gap-3 items-end">
              <div className="text-sm text-gray-500">Posted by you</div>
              <div className="flex gap-2">
                <button onClick={()=>onEdit(job)} className="px-3 py-2 border rounded">Edit</button>
                <button onClick={()=>{ if(window.confirm('Delete this job?')) onDelete(job.id) }} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
