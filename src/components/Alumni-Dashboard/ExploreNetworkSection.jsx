import React, { useEffect, useState } from "react";
import AlumniCard from "../common/AlumniCard.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../../public/assets/Shivansh.jpg";
import img2 from "../../../public/assets/Kavya.jpg";
import img3 from "../../../public/assets/Rishabh.jpg";
import img4 from "../../../public/assets/Shivanshi.jpg";


export default function ExploreNetworkSection() {
  // unique id per alumnus — important to use stable id (not array index)
  const alumniData = [
    { id: "shivansh-1", name: "Shivansh Sharma", major: "Artificial Intelligence and Machine Learning 2025", description: "Passionate about Web development and AI.", skills: ["ReactJS", "NodeJS", "MongoDB", "Python"], image: img1 },
    { id: "kavya-2", name: "Aarav Patel", major: "Computer Science and Engineering 2024", description: "Expert in embedded systems and Backend Development.", skills: ["Java", "Python", "IoT", "SpringBoot"], image: img2 },
    { id: "shivanshi-3", name: "Shivanshi Singh", major: "Business Administration 2025", description: "Focused on marketing strategy.", skills: ["Marketing", "Agile", "Figma"], image: img4 },
    { id: "rishabh-4", name: "Arjun Ready", major: "Graphic Design 2027", description: "Creating user-centric interfaces.", skills: ["UI/UX", "Figma", "Webflow"], image: img3 },
  ];

  const STORAGE_KEY = "alumniAvatarCrops_v1";

  // crops shape: { [id]: { posX, posY, zoom } }
  const [crops, setCrops] = useState({});

  // load persisted crops on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setCrops(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to read avatar crops from localStorage", err);
    }
  }, []);

  function handleImageUpdate(id, crop) {
    setCrops(prev => {
      const next = { ...prev, [id]: crop };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save avatar crop to localStorage", err);
      }
      return next;
    });

    // OPTIONALLY: send to server
    // fetch("/api/saveCrop", { method: "POST", body: JSON.stringify({ id, crop }) })
  }

  return (
    <div className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">Explore our network</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Stay connected with our ever-growing alumni family.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {alumniData.map((alumnus) => (
            <AlumniCard
              key={alumnus.id}
              id={alumnus.id}
              name={alumnus.name}
              major={alumnus.major}
              description={alumnus.description}
              skills={alumnus.skills}
              image={alumnus.image}
              savedCrop={crops[alumnus.id]}          // pass saved crop (may be undefined)
              onImageUpdate={(crop) => handleImageUpdate(alumnus.id, crop)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/alumni-directory" className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-5 py-3 font-semibold text-white shadow-sm hover:bg-opacity-90">
            View All Alumni <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
