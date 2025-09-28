import React,{useState} from 'react'


export default function JobCard({ job, onOpenApply }) {

const [open, setOpen] = useState(false);
const [active, setActive] = useState(false);

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "Check this out!",
        text: "Interesting content for you.",
        url: window.location.href,
      });
    } else {
      setOpen((o) => !o);
    }
  }
return (
<article className="bg-white rounded-xl p-8 card-shadow border">
<div className="flex justify-between">
<div>
<h3 className="text-2xl font-bold">{job.title}</h3>
<p className="text-gray-700">{job.company}</p>
<div className="flex gap-2 mt-4 flex-wrap">
<span className="px-3 py-1 rounded-full bg-blue-100">📍 {job.location}</span>
<span className="px-3 py-1 rounded-full bg-green-100">💰 {job.salary}</span>
<span className="px-3 py-1 rounded-full bg-purple-100">⏰ {job.type}</span>
</div>
<p className="mt-6 text-gray-800">{job.description}</p>
<p className="mt-4 italic">Skills: {job.skills.join(' | ')}</p>
<p className="mt-4 text-gray-500">Posted {job.posted} • {job.applicants} applicants</p>
</div>


<div className="flex flex-col items-end justify-between">
 <div className="flex flex-col items-end justify-between">
      <div className="space-x-2 relative">
        {/* Save / Bookmark */}
        <button
          title="Save"
          className="p-2 rounded-full hover:bg-gray-100 transition"

          onClick={() => setActive((prev) => !prev)}
        >
          {/* Bookmark SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill={active ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
            />
          </svg>
        </button>

        {/* Share */}
        <button
          title="Share"
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          {/* Share SVG */}
         <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6 text-gray-700"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 12v.01M12 4l8 8-8 8M20 12H4"
  />
</svg>
        </button>

        {/* Fallback custom share dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-2 space-y-1">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1 hover:bg-gray-100 rounded"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1 hover:bg-gray-100 rounded"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1 hover:bg-gray-100 rounded"
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>


<div>
<button onClick={onOpenApply} className="px-5 py-3 rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600">Apply Now</button>
</div>
</div>
</div>
</article>
)
}