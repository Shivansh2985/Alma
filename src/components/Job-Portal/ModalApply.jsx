
import React, { useRef, useState } from "react";

const SKILL_KEYWORDS = [
  "python",
  "django",
  "aws",
  "sql",
  "figma",
  "excel",
  "rest",
  "api",
  "javascript",
  "react",
];

export default function ModalApply({ job, onClose }) {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const inputRef = useRef(null);

  function handleFilePicked(f) {
    setFile(f);
    setAnalysis(null);
    setMessage("");
  }

  function onInputChange(e) {
    const f = e.target.files?.[0];
    if (f) handleFilePicked(f);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFilePicked(f);
  }

  function onDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave() {
    setDragOver(false);
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function analyze() {
    if (!file) {
      setMessage("Please upload a resume first.");
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target.result).toLowerCase();
      const found = SKILL_KEYWORDS.filter((k) => text.includes(k));
      setAnalysis({ skills: found, words: text.split(/\s+/).length });
      setLoading(false);
      setMessage("Analysis complete");
    };
    
    reader.onerror = () => {
      setLoading(false);
      setMessage("Could not read file for analysis.");
    };
    reader.readAsText(file);
  }

  function applyNow() {
    if (!file) {
      setMessage("Upload a resume before applying.");
      return;
    }
    setMessage("Application submitted (simulated). Thank you!");
    // small delay then close
    setTimeout(() => {
      onClose();
    }, 900);
  }

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="relative w-full max-w-3xl bg-gray-900 text-white rounded-lg border border-white/20 shadow-2xl overflow-hidden">
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl"
          title="Close"
        >
          ✕
        </button>

        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-2">
            Apply — {job.title} @ {job.company}
          </h3>
          <p className="text-sm text-white/70 mb-6">
            Upload your resume below. Use AI Analyzer to scan skills and improve
            match.
          </p>

          {/* Dropzone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={openFilePicker}
            role="button"
            tabIndex={0}
            className={
              "cursor-pointer select-none rounded-lg border-2 transition-all " +
              (dragOver
                ? "border-white/90 bg-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                : "border-white/50 bg-black/60") +
              " p-8 flex items-center gap-6"
            }
          >
            {/* left icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-md bg-white/10 flex items-center justify-center">
              {/* simple document icon */}
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/90"
              >
                <path
                  d="M14 3H6C4.895 3 4 3.895 4 5V19C4 20.105 4.895 21 6 21H18C19.105 21 20 20.105 20 19V9L14 3Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3V9H20"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 11H16"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 15H13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* center large text */}
            <div className="flex-1 text-center">
              <div className="text-3xl font-extrabold tracking-tight">
                Drag and Drop
              </div>
              <div className="text-4xl font-bold mt-1">Resume</div>

              <div className="mt-3 text-sm text-white/70">
                Click to browse or drag file here (pdf, doc, docx, txt)
              </div>
            </div>

            {/* right small icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-md bg-white/8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/95"
              >
                <path
                  d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5v12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={onInputChange}
              className="hidden"
            />
          </div>

          {/* below: file info + dropdown + action buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/80">
                  {file ? (
                    <div>
                      <span className="font-medium">{file.name}</span>{" "}
                      <span className="text-xs text-white/60">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                  ) : (
                    <span className="text-white/60">No resume selected</span>
                  )}
                </div>

                {file && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setAnalysis(null);
                      setMessage("");
                    }}
                    className="text-sm px-3 py-1 rounded border border-white/20 text-white/90"
                  >
                    Remove
                  </button>
                )}

                {/* small resume source dropdown */}
                <select
                  className="ml-4 bg-transparent border border-white/15 text-white/90 px-3 py-2 rounded"
                  aria-label="Resume source"
                >
                  <option>Upload New Resume</option>
                  <option>Saved Resume 1</option>
                  <option>Saved Resume 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* analysis area */}
          <div className="mt-6 bg-white/5 rounded-md p-4 min-h-[80px]">
            {analysis ? (
              <>
                <div className="text-sm text-white/80">
                  <strong>Detected skill keywords:</strong>{" "}
                  {analysis.skills.length ? analysis.skills.join(", ") : "None detected,Keep Gain some more Skills"}
                </div>
                <div className="text-sm text-white/80 mt-2">
                  <strong>Word count:</strong> {analysis.words}
                </div>
                <div className="text-sm text-white/80 mt-2">
                  <strong>Predictions : </strong> <p>You are eligible to apply for this job role</p>
                </div>
                <div className="mt-3 w-full bg-white/10 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-green-400"
                    style={{ width: `${Math.min(100, analysis.skills.length * 30)}%` }}
                  />
                  <span>Your Resume {Math.min(100, analysis.skills.length * 30)}% Matched For this Post</span>
                </div>
              </>
            ) : (
              <div className="text-sm text-white/60">
                {message || "Run the AI Resume Analyzer to scan the uploaded resume for skills."}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
              <button
                onClick={analyze}
                className="cursor-pointer px-2 py-2 -mt-2 mb-3 rounded-md border border-white/20 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? "Analyzing..." : "AI Resume Analyzer"}
              </button>

              <button
                onClick={applyNow}
                className="cursor-pointer px-4 py-2 -mt-2 mb-3 mr-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
              >
                Apply
              </button>
            </div>
      </div>
    </div>
  );
}
