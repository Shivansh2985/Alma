import React from 'react';

export default function HeroSection() {
  return (
    <div className="bg-blue-900">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Your Gateway to the Alumni Community
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
          Connect, Grow, and Thrive with Your Fellow Graduates
        </p>
        <a
          href="#"
          className="cursor-pointer mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-bold text-primary hover:bg-gray-100"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}