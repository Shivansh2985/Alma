// import React, { useState, useEffect } from 'react'
// import Header from './Job-Portal/Header'
// import Filters from './Job-Portal/Filters'
// import JobList from './Job-Portal/JobList'
// import ModalApply from './Job-Portal/ModalApply'
// import PostJobModal from './Job-Portal/PostJobModal'
// import ManageJobs from './Job-Portal/ManageJobs'
// import { JOBS as INITIAL } from './data/jobs'
// import useJobsFilter from './hooks/useJobsFilter'
// import SearchArea from './Job-Portal/SearchArea'

import React, { useState, useEffect } from 'react'
import Header from '../components/Job-Portal/Header'
import Filters from '../components/Job-Portal/Filters'
import JobList from '../components/Job-Portal/JobList'
import ModalApply from '../components/Job-Portal/ModalApply'
import PostJobModal from '../components/Job-Portal/PostJobModal'
import ManageJobs from '../components/Job-Portal/ManageJobs'
import { JOBS as INITIAL } from '../data/jobs.js'
import useJobsFilter from '../hooks/useJobsFilter.js'
import SearchArea from '../components/Job-Portal/SearchArea'

export default function JobPortal(){
  // load from localStorage or initial
  const [jobs, setJobs] = useState(() => {
    try {
      const raw = localStorage.getItem('alum_jobs_v1')
      return raw ? JSON.parse(raw) : INITIAL
    } catch {
      return INITIAL
    }
  })

  useEffect(() => {
    localStorage.setItem('alum_jobs_v1', JSON.stringify(jobs))
  }, [jobs])

  // page: 'home' | 'manage'
  const [page, setPage] = useState('home')
  const { filtered, query, setQuery, jobType, setJobType, location, setLocation, salary, setSalary } = useJobsFilter(jobs)
  const [openJob, setOpenJob] = useState(null)        // apply modal
  const [postModalOpen, setPostModalOpen] = useState(false) // post/edit modal
  const [editJob, setEditJob] = useState(null)        // job being edited (for post modal)

  // create new job (or edited job)
  function upsertJob(job) {
    if (job.id) {
      // update existing
      setJobs((prev) => prev.map(j => j.id === job.id ? job : j))
    } else {
      // create new, mark as postedByUser
      const newJob = { ...job, id: Date.now(), postedByUser: true }
      setJobs((prev) => [newJob, ...prev])
    }
    setPostModalOpen(false)
    setEditJob(null)
  }

  function removeJob(id) {
    setJobs((prev) => prev.filter(j => j.id !== id))
  }

  function openPostModalForEdit(job) {
    setEditJob(job)
    setPostModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <Header/>

      <main>
        {page === 'home' && (
          <>
            <SearchArea
            onSearch={(q) => setQuery(q)}
            query={query}
            onOpenPost={() => { setEditJob(null); setPostModalOpen(true) }}
            onNavigateManage={() => setPage('manage')}
            />
            <Filters jobType={jobType} setJobType={setJobType} location={location} setLocation={setLocation} salary={salary} setSalary={setSalary} />

            <JobList jobs={filtered} onOpenApply={(j)=>setOpenJob(j)} />
          </>
        )}

        {page === 'manage' && (
          <ManageJobs
            jobs={jobs.filter(j=> j.postedByUser)}
            onBack={() => setPage('home')}
            onEdit={(job)=>openPostModalForEdit(job)}
            onDelete={(id)=>removeJob(id)}
            onCreate={() => { setEditJob(null); setPostModalOpen(true) }}
          />
        )}
      </main>

      {openJob && <ModalApply job={openJob} onClose={() => setOpenJob(null)} />}

      {postModalOpen && (
        <PostJobModal
          job={editJob}
          onClose={() => { setPostModalOpen(false); setEditJob(null) }}
          onSave={(j)=>upsertJob(j)}
        />
      )}
    </div>
  )
}

