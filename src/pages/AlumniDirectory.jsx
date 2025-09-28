import React, { useMemo, useState, useEffect } from "react";
import SearchFilters from "../components/Alumni-Directory/SearchFilters";
import img1 from "../../public/assets/Shivansh.jpg";
import alumniMembers from "../components/Alumni-Directory/AlumniMember";
import {Link} from 'react-router-dom';

/* -----------------------
   CONFIG
   ----------------------- */
const themeConfig = {
  headerHeight: "h-56 md:h-72 lg:h-96",
  bannerBg: "bg-[#203b81]",
  bannerTextColor: "text-white",
  filterPanelBg: "bg-white",
  cardBg: "bg-white",
  accent: "#0b1220",
  itemsPerPage: 9,
};

const uniq = (arr) => Array.from(new Set(arr));

/* -----------------------
   Derived select option lists (strings) - now based on alumniMembers
   ----------------------- */
const years = ["All Years", ...uniq(alumniMembers.map((a) => String(a.gradYear)))];
const majors = ["All Majors", ...uniq(alumniMembers.map((a) => a.major))];
const industries = ["All Industries", ...uniq(alumniMembers.map((a) => a.industry))];
const allSkills = ["All Skills", ...uniq(alumniMembers.flatMap((a) => (a.skills || [])))]; // guard skills

/* -----------------------
   Main component
   ----------------------- */
export default function AlumniDirectory() {
  // controlled pieces (parent owns them)
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    year: years[0],
    major: majors[0],
    industry: industries[0],
    skill: allSkills[0],
  });
  const [appliedFilters, setAppliedFilters] = useState(filters); // if you want an explicit "Apply" action
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = themeConfig.itemsPerPage;

  // If you want the Filter button in SearchFilters to apply the filters,
  // we'll copy the current filter values into appliedFilters on apply.
  function onApplyFilters() {
    setAppliedFilters(filters);
    setCurrentPage(1);
  }

  function onClearFilters() {
    // clear will already reset filters in child; ensure appliedFilters too
    setAppliedFilters({
      year: years[0],
      major: majors[0],
      industry: industries[0],
      skill: allSkills[0],
    });
    setFilters({
      year: years[0],
      major: majors[0],
      industry: industries[0],
      skill: allSkills[0],
    });
    setCurrentPage(1);
  }

  // Filter + search the data (now using alumniMembers)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alumniMembers.filter((a) => {
      if (appliedFilters.year !== years[0] && String(a.gradYear) !== String(appliedFilters.year)) return false;
      if (appliedFilters.major !== majors[0] && a.major !== appliedFilters.major) return false;
      if (appliedFilters.industry !== industries[0] && a.industry !== appliedFilters.industry) return false;
      if (appliedFilters.skill !== allSkills[0] && !(a.skills || []).includes(appliedFilters.skill)) return false;

      if (!q) return true;
      if ((a.name || "").toLowerCase().includes(q)) return true;
      if ((a.major || "").toLowerCase().includes(q)) return true;
      if ((a.description || "").toLowerCase().includes(q)) return true;
      if (((a.skills || []).join(" ") || "").toLowerCase().includes(q)) return true;
      return false;
    });
  }, [query, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Ensure currentPage is valid when filtered count changes
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const pageItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 text-[#0b1220]">
      {/* HERO / Banner */}
      <header className={`${themeConfig.bannerBg} flex items-center justify-center h-72 relative`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className={`font-extrabold text-4xl md:text-6xl leading-tight ${themeConfig.bannerTextColor}`}>
            Find your
            <br />
            alumni network
          </h1>
          <p className={`mt-6 text-base md:text-lg ${themeConfig.bannerTextColor} opacity-90`}>
            Search and connect with alumni using advanced filtering options.
          </p>
        </div>
      </header>

      {/* SEARCH + FILTERS combined component */}
      <SearchFilters
        years={years}
        majors={majors}
        industries={industries}
        allSkills={allSkills}
        filters={filters}
        setFilters={setFilters}
        query={query}
        setQuery={setQuery}
        onClear={onClearFilters}
        onApply={onApplyFilters}
      />

      {/* CARDS GRID */}
      <main className="max-w-6xl mx-auto px-6 mt-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((a) => (
            <AlumniCard key={a.id} alumni={a} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex items-center gap-3 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2"
            >
              ◀
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 ${currentPage === i + 1 ? "text-blue-600 font-semibold" : "text-gray-500"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2"
            >
              ▶
            </button>
          </nav>
        </div>
      </main>

      {/* CTA / Footer Hero */}
      <footer className="mt-12 bg-[#e6efff] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Connect with your university
            <br />
            alumni network
          </h2>
          <p className="max-w-3xl mx-auto mb-8">
            Discover and reconnect with fellow graduates across various industries and generations. Build meaningful professional
            relationships and support your career journey.
          </p>

          <div className="flex items-center justify-center gap-6">
            <button className="px-6 py-3 rounded-xl bg-[#0b1220] text-white">Search</button>
            <button className="px-6 py-3 rounded-xl border">Join</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -----------------------
   AlumniCard component (same UI/behavior)
   ----------------------- */
function AlumniCard({ alumni }) {
  const [expanded, setExpanded] = useState(false);

  // image fallback: use alumni.image or Shivansh image as default
  const imgSrc = alumni.image || img1;

  return (
    <article
      className={`relative rounded-2xl shadow-md overflow-hidden bg-white cursor-pointer`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="cat p-8 min-h-[260px]">
        <div className="flex items-center gap-7">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden object-fit">
            <img src={imgSrc} alt={alumni.name || "alumni"} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl">{alumni.name}</h3>
            <div className="text-gray-600">
              {alumni.major} {alumni.gradYear}
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-700">{alumni.description}</p>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">Skills</h4>
          <div className="flex gap-3 flex-wrap">
            {(alumni.skills || []).map((s) => (
              <span key={s} className="px-2 py-1 rounded-full border text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle area / achievement */}
        <div className="mt-6">
          <button className="flex items-center gap-2 font-semibold" onClick={() => setExpanded((v) => !v)}>
            Recent Achievement {expanded ? <span className="mb-1 scale-[1.3]">▴</span> : <span className="mb-1 scale-[1.3]">▾</span>}
          </button>
          {expanded && <p className="mt-3 text-gray-700">{alumni.achievement}</p>}
        </div>
      </div>

      {/* Footer with socials and Connect button (slide-up on hover) */}
      <div className={`mat cursor-pointer left-0 right-0 bottom-0 transition-transform duration-300 ${expanded ? "translate-y-0" : "translate-y-4"} `}>
        {expanded && (
          <div className="flex items-center justify-between px-6 py-4 bg-[#f0f6ff]">
            <div className="flex items-center gap-1">
              <a href={alumni.socials?.linkedin || "#"} className="w-6 h-6 rounded bg-white flex items-center justify-center shadow hover:scale-120 transition" target="_blank" rel="noreferrer">
                {/* linkedin svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue"><path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"/></svg>
              </a>
              <a href={alumni.socials?.github || "#"} className="w-6 h-6 rounded bg-white flex items-center justify-center shadow hover:scale-120 transition" target="_blank" rel="noreferrer">
                {/* github svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"/></svg>
              </a>
              <a href={alumni.socials?.x || "#"} className="w-6 h-6 rounded bg-white flex items-center justify-center shadow hover:scale-120 transition" target="_blank" rel="noreferrer">
                {/* x svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"/></svg>
              </a>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Link to={`/alumni/${alumni.id}`} className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-300 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:scale-105 transition hover:text-white">
                        View Profile
              </Link>
              <Link className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-300 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:scale-105 transition hover:text-white">Connect</Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
