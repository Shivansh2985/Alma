import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import ImageCropModal from "./ImageCropModal"; // if you split modal into separate file OR inline from earlier code
import { Link } from "react-router-dom";

export default function AlumniCard({ id, name, major, description, skills = [], image, savedCrop: savedCropFromParent, onImageUpdate }) {
  // local UI state that mirrors parent-provided crop. default center
  const [savedCrop, setSavedCrop] = useState({ posX: 50, posY: 50, zoom: 100 });
  const [openEditor, setOpenEditor] = useState(false);

  // sync whenever parent passes a saved crop (initial load or updates)
  useEffect(() => {
    if (savedCropFromParent) {
      setSavedCrop(savedCropFromParent);
    }
  }, [savedCropFromParent]);

  function handleSaveCrop(crop) {
    setSavedCrop(crop);
    setOpenEditor(false);
    // inform parent — parent will persist to localStorage
    if (typeof onImageUpdate === "function") onImageUpdate(crop);
  }

  // fallback if no image: show placeholder circle with text
  const style = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundPosition: `${savedCrop.posX}% ${savedCrop.posY}%`,
        backgroundSize: `${savedCrop.zoom}%`,
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <>
      <div className="group bg-white text-center shadow rounded-lg p-6 h-full flex flex-col transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
        <button
          type="button"
          aria-label="Edit avatar"
          onClick={() => setOpenEditor(true)}
          className="mx-auto mb-3 h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative border-0 focus:outline-none"
          title="Click to edit avatar"
          style={style}
        >
          <img src={image} alt={`${name} avatar`} className="sr-only" />
          {!image && <div className="flex items-center justify-center h-full w-full text-sm text-gray-600">Image</div>}
        </button>

        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{major}</p>
        <p className="text-sm text-gray-500 my-3 flex-grow">{description}</p>
        <div className="mb-3 flex flex-wrap justify-center gap-1">
          <h3 className="text-blue-600">Skills: </h3>
          {skills.map((skill) => (
            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700" key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-0">
          <div className="h-10 flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <Link to='/profile' className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-900">
              View Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {openEditor && (
        <ImageCropModal
          src={image}
          initial={savedCrop}
          onCancel={() => setOpenEditor(false)}
          onSave={handleSaveCrop}
        />
      )}
    </>
  );
}
