import React, { useEffect, useState } from 'react'

export default function PostJobModal({ job, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [type, setType] = useState('Full-time')
  const [skills, setSkills] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (job) {
      setTitle(job.title || '')
      setCompany(job.company || '')
      setLocation(job.location || '')
      setSalary(job.salary || '')
      setType(job.type || 'Full-time')
      setSkills((job.skills && job.skills.join(', ')) || '')
      setDescription(job.description || '')
    } else {
      setTitle(''); setCompany(''); setLocation(''); setSalary(''); setType('Full-time'); setSkills(''); setDescription('')
    }
  }, [job])

  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      id: job ? job.id : undefined,
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      salary: salary.trim(),
      type,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim(),
      postedByUser: true
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{job ? 'Edit Job' : 'Post a Job'}</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Job Title" className="p-3 border rounded" required/>
            <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company" className="p-3 border rounded" required/>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location (e.g. Remote or City, ST)" className="p-3 border rounded" />
            <input value={salary} onChange={(e)=>setSalary(e.target.value)} placeholder="Salary (e.g. $85k–$125k)" className="p-3 border rounded" />
            <select value={type} onChange={(e)=>setType(e.target.value)} className="p-3 border rounded">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
            <input value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Skills (comma separated)" className="p-3 border rounded" />
          </div>

          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Short description" rows={4} className="p-3 border rounded w-full" />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{job ? 'Save Changes' : 'Post Job'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
