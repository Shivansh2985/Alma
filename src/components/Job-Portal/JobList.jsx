import React from 'react'
import JobCard from './JobCard'


export default function JobList({ jobs, onOpenApply }) {
if (jobs.length === 0) return <p className="max-w-6xl mx-auto px-6 py-6">No jobs matched your search.</p>
return (
<section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
{jobs.map((j) => (
<JobCard key={j.id} job={j} onOpenApply={() => onOpenApply(j)} />
))}
</section>
)
}