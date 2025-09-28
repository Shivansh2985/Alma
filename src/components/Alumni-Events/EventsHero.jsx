import React from 'react';

export default function EventsHero() {
  return (
    <section className="bg-blue-900 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Connect, Celebrate, and Grow with Alumni Events
        </h1>
        <p className="text-lg text-indigo-100 md:text-xl">
          Discover exciting opportunities to reconnect with classmates, and continue your lifelong learning journey through our diverse range of alumni events.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-md bg-white px-6 py-3 font-semibold text-black shadow transition hover:bg-gray-100">
            Explore
          </button>
          <button className="rounded-md border bg-white border-white  px-6 py-3 font-semibold text-black shadow transition hover:bg-gray-200">
            Host an Event
          </button>
        </div>
      </div>
    </section>
  );
}