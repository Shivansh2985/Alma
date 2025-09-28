import React from 'react';

export default function VisionSection() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
              "Alumni are the living legacy of an institution, a vibrant thread that weaves the past into the future."
            </h3>
            <p className="mt-6 text-lg text-gray-600">
              Our vision is simple: to connect, engage and grow together – building a network that lasts beyond graduation.
            </p>
          </div>
          <div className="order-first lg:order-last">
            {/* Remember to place 'alumni-vision.png' in your public folder */}
            <img 
              src="https://uwaterloo.ca/optometry-vision-science/sites/default/files/uw_convocation_spring_2019_day_3-177-cropped.jpg"
              alt="Graduates celebrating"
              className="h-full w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}