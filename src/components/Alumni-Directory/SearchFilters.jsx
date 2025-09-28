import React, { useEffect, useRef, useState } from "react";

/* ---------- CustomSelect (unchanged behavior, keyboard accessible) ---------- */
export function CustomSelect({ label, options = [], value, onChange, placeholder = "Select..." }) {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setHighlight(-1);
  }, [options.length]);

  function toggleOpen() {
    setOpen((o) => {
      const next = !o;
      if (next) setHighlight(0);
      else setHighlight(-1);
      return next;
    });
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(0);
      } else if (highlight >= 0 && highlight < options.length) {
        onChange(options[highlight].value);
        setOpen(false);
        setHighlight(-1);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(0);
      } else {
        setHighlight((h) => {
          const next = h + 1;
          return next >= options.length ? options.length - 1 : next;
        });
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(options.length - 1);
      } else {
        setHighlight((h) => {
          const next = h - 1;
          return next < 0 ? 0 : next;
        });
      }
      return;
    }
  }

  return (
    <div ref={rootRef} className="w-full max-w-xs">
      {label && <div className="mb-2 text-lg font-semibold">{label}</div>}
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggleOpen}
          onKeyDown={onKeyDown}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-left text-base focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200"
        >
          <span className={`${selected ? "text-gray-900" : "text-gray-500"}`}>
            {selected ? selected.label : placeholder}
          </span>

          <svg
            className={`w-5 h-5 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            aria-activedescendant={highlight >= 0 ? `option-${highlight}` : undefined}
            tabIndex={-1}
            className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto z-50"
          >
            {options.length === 0 ? (
              <div className="px-6 py-4 text-gray-500">No options</div>
            ) : (
              options.map((opt, idx) => {
                const isHighlighted = idx === highlight;
                const isSelected = value === opt.value;
                return (
                  <div
                    id={`option-${idx}`}
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlight(idx)}
                    onMouseLeave={() => setHighlight(-1)}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                      setHighlight(-1);
                    }}
                    className={`px-6 py-4 cursor-pointer text-base ${isHighlighted ? "bg-gray-100" : "bg-white"} ${
                      isSelected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {opt.label}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- SearchFilters (combined search + filters UI) ---------- */
/*
  Props:
    - years, majors, industries, allSkills : arrays of option strings
    - filters: { year, major, industry, skill } (controlled)
    - setFilters: setter for filters
    - query, setQuery: controlled search input
    - onClear: callback when user clears
    - onApply: callback when user clicks Filter (optional)
*/
export default function SearchFilters({
  years = [],
  majors = [],
  industries = [],
  allSkills = [],
  filters,
  setFilters,
  query,
  setQuery,
  onClear,
  onApply,
}) {
  const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleClear() {
    setFilters({
      year: years[0] ?? "All Years",
      major: majors[0] ?? "All Majors",
      industry: industries[0] ?? "All Industries",
      skill: allSkills[0] ?? "All Skills",
    });
    setQuery("");
    if (onClear) onClear();
  }

  return (
    <div>
      <div className="mt-8 flex justify-center">
        <div className="flex gap-3 w-full max-w-2xl">
          <input
            className="flex-1 rounded-lg border-2 border-gray-200 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white"
            placeholder="Enter name or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="px-6 rounded-lg border-2 border-gray-800 bg-white hover:bg-gray-100 font-medium"
            onClick={() => {
              // user's search button behavior: just reset to page 1 in parent (handled there)
              if (onApply) onApply();
            }}
          >
            Search
          </button>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 mt-6">
        <div className="rounded-xl shadow-lg p-8 bg-white relative">
          <h2 className="text-3xl font-bold mb-6">Filter Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Graduation Year */}
            <CustomSelect
              label="Graduation Year"
              options={toOptions(years)}
              value={filters.year}
              onChange={(val) => handleFilterChange("year", val)}
              placeholder="All Years"
            />

            {/* Major */}
            <CustomSelect
              label="Major"
              options={toOptions(majors)}
              value={filters.major}
              onChange={(val) => handleFilterChange("major", val)}
              placeholder="Select an option"
            />

            {/* Industry */}
            <CustomSelect
              label="Industry"
              options={toOptions(industries)}
              value={filters.industry}
              onChange={(val) => handleFilterChange("industry", val)}
              placeholder="All Industries"
            />

            {/* Skills */}
            <CustomSelect
              label="Skills"
              options={toOptions(allSkills)}
              value={filters.skill}
              onChange={(val) => handleFilterChange("skill", val)}
              placeholder="All Skills"
            />

            <div className="md:col-span-4 flex justify-end gap-4 mt-1">
              <button onClick={handleClear} className="px-5 py-2 border rounded-md hover:bg-gray-100 transition">
                Clear
              </button>

              <button
                onClick={() => {
                  if (onApply) onApply();
                }}
                className="px-5 py-2 rounded-md bg-[#a0bfed] hover:bg-[#8aaee2] transition text-white"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
