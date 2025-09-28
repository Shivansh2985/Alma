import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This is where your page content will be rendered */}
      </main>
      <Footer />
    </div>
  );
}
