import React, { useState, useMemo } from 'react';
import { Users, UserPlus, Upload, Download } from 'lucide-react';
import StatCard from '../components/Data-Management/StatCard.jsx';
import AlumniTable from '../components/Data-Management/AlumniTable.jsx';
import ImportExportModal from '../components/Data-Management/ImportExportModal.jsx';
import AddAlumniModal from '../components/Data-Management/AddAlumniModal.jsx';
import EditAlumniModal from '../components/Data-Management/EditAlumniModal.jsx';
import DataAuditTrail from '../components/Data-Management/DataAuditTrail.jsx';
import PromptSearch from '../components/Data-Management/PromptSearch.jsx';

// Dummy data
const mockAlumni = [
  { id: 1, name: 'Kavya Tiwari', email: 'kavya.tiwari@example.com', batch: 2027, section: 'A' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', batch: 2021, section: 'B' },
  { id: 3, name: 'Samuel Lee', email: 'samuel.lee@example.com', batch: 2023, section: 'A' },
  { id: 4, name: 'Emily White', email: 'emily.white@example.com', batch: 2022, section: 'C' },
  { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', batch: 2020, section: 'B' },
];

export default function DataManagementPage() {
  const [alumni, setAlumni] = useState(mockAlumni);
  const [auditLogs, setAuditLogs] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAlumnus, setEditingAlumnus] = useState(null);

  const logAction = (action, name) => {
    const newLog = { action, name, timestamp: new Date(), device: navigator.userAgent };
    setAuditLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const handleAddAlumni = (newAlumnus) => {
    const alumnusWithId = { ...newAlumnus, id: Date.now() };
    setAlumni((prevAlumni) => [...prevAlumni, alumnusWithId]);
    logAction('Added Alumni', newAlumnus.name);
  };

  const handleEditAlumni = (alumnusToEdit) => {
    setEditingAlumnus(alumnusToEdit);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateAlumni = (updatedAlumnus) => {
    setAlumni((prevAlumni) => prevAlumni.map((p) => p.id === updatedAlumnus.id ? updatedAlumnus : p));
    logAction('Edited Alumni', updatedAlumnus.name);
    setEditingAlumnus(null);
  };

  const handlePromptSearch = () => {
    setActiveSearch(prompt);
  };

  const filteredAlumni = useMemo(() => {
    if (!activeSearch) {
      return alumni;
    }
    const lowerCaseSearch = activeSearch.toLowerCase();
    return alumni.filter(person => {
        const personDataString = `${person.name} ${person.batch} ${person.section}`.toLowerCase();
        return lowerCaseSearch.split(' ').some(word => personDataString.includes(word));
    });
  }, [alumni, activeSearch]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Alumni Data</h1>
            <p className="mt-1 text-gray-600">Manage, import, and export alumni information.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsImportModalOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
              <Upload size={16} /> Import / Export
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-opacity-90">
              <UserPlus size={16} /> Add Alumni
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard icon={Users} title="Total Alumni" value={alumni.length} />
            <StatCard icon={UserPlus} title="New Members" value="128" />
            <StatCard icon={Download} title="Total Exports" value="72" />
        </div>
        
        {/* AI Prompt Search Section */}
        <PromptSearch prompt={prompt} setPrompt={setPrompt} onSearch={handlePromptSearch} />

        {/* Table Section */}
        <div className="mt-8">
          <AlumniTable alumni={filteredAlumni} onEdit={handleEditAlumni} />
        </div>
        
        {/* Data Audit Trail */}
        <DataAuditTrail logs={auditLogs} />
      </div>
      
      {/* Modals */}
      <ImportExportModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} alumni={alumni} />
      <AddAlumniModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddAlumni={handleAddAlumni} />
      <EditAlumniModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} alumnusData={editingAlumnus} onUpdateAlumni={handleUpdateAlumni} />
    </>
  );
}