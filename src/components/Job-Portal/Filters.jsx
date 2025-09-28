
import React, { useEffect, useRef, useState } from "react";

function CustomSelect({ label, options = [], value, onChange, placeholder = "Select..." }) {
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

  useEffect(() => setHighlight(-1), [options.length]);

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

export default function Filters({
  jobType,
  setJobType,
  location,
  setLocation,
  salary,
  setSalary,
  onClear,
  onApply,
}) {
  const jobOptions = [
    { value: "All", label: "All" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
  ];

  const locationOptions = [
    { value: "All", label: "All" },
    { value: "Remote", label: "Remote" },
    { value: "San Francisco, CA", label: "San Francisco, CA" },
    { value: "Chicago, IL", label: "Chicago, IL" },
  ];

  const salaryOptions = [
    { value: "All", label: "All" },
    { value: "$70k–$100k", label: "$70k–$100k" },
    { value: "$85k–$125k", label: "$85k–$125k" },
    { value: "$95k–$135k", label: "$95k–$135k" },
  ];

  function handleClear() {
    setJobType("All");
    setLocation("All");
    setSalary("All");
    if (onClear) onClear();
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CustomSelect label="Job Type" options={jobOptions} value={jobType} onChange={(v) => setJobType(v)} placeholder="All" />

          <CustomSelect label="Location" options={locationOptions} value={location} onChange={(v) => setLocation(v)} placeholder="All" />

          <CustomSelect label="Salary Range" options={salaryOptions} value={salary} onChange={(v) => setSalary(v)} placeholder="All" />
        </div>

        <div className="mt-6 md:mt-8 flex justify-end gap-4">
          <button onClick={handleClear} className="px-5 py-2 border rounded-md hover:bg-gray-100 transition">
            Cancel
          </button>

          <button
            onClick={() => {
              if (onApply) onApply();
            }}
            className="cursor-pointer px-5 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition text-white"
          >
            Filter
          </button>
        </div>
      </div>
    </section>
  );
}
