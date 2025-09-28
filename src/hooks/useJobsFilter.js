import { useMemo, useState } from 'react'


export default function useJobsFilter(jobs) {
const [query, setQuery] = useState('')
const [jobType, setJobType] = useState('All')
const [location, setLocation] = useState('All')
const [salary, setSalary] = useState('All')


const filtered = useMemo(() => {
const q = query.trim().toLowerCase()
return jobs.filter((j) => {
if (jobType !== 'All' && j.type !== jobType) return false
if (location !== 'All' && j.location !== location) return false
if (salary !== 'All' && j.salary !== salary) return false
if (!q) return true
return (
j.title.toLowerCase().includes(q) ||
j.company.toLowerCase().includes(q) ||
j.skills.join(' ').toLowerCase().includes(q) ||
j.description.toLowerCase().includes(q)
)
})
}, [jobs, query, jobType, location, salary])


return {
filtered,
query,
setQuery,
jobType,
setJobType,
location,
setLocation,
salary,
setSalary
}
}