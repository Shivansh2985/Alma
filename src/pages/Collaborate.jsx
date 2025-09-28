import React, { useState, useEffect } from 'react';
import { Dashboard } from '../components/Crd.jsx/Dashboard';
import { ProjectCards } from '../components/Crd.jsx/ProjectCards';
import CalendarView from '../components/Crd.jsx/CalendarView';
import { useLocation } from 'react-router-dom';
import { CollaborateSidebar } from '../components/Crd.jsx/CollaborateSidebar';
import Resource from '../components/Crd.jsx/Resource';
import AlumniCard from '../components/common/AlumniCard.jsx';
export const Collaborate = () => {
  // Minimal tasks state for calendar view
  // Team Chat state and handler
  const [messages, setMessages] = useState([
  { sender: 'Aarav', text: 'Hey team, let’s start the meeting!' },
  { sender: 'Meera', text: 'Sure, I am ready.' },
  { sender: 'Yash', text: 'Let’s discuss the project updates.' },
    { sender: 'me', text: 'Sounds good! I have some updates to share.' },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
  setMessages((prev) => [...prev, { sender: 'me', text: inputValue }]);
    setInputValue("");
  };
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finalize the Q4 project proposal and submit for review",
      date: new Date(),
      time: "14:00",
      type: "deadline",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Team standup meeting",
      description: "Weekly team sync and progress updates",
      date: new Date(),
      time: "09:00",
      type: "task",
      priority: "medium",
      completed: false,
    },
  ]);

  
  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();

  // Set active section based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/collaborate/')) {
      const section = path.split('/collaborate/')[1];
      setActiveSection(section);
    }
  }, [location]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-[calc(100vh-64px)] mt-16">
        {/* Sidebar */}
        <CollaborateSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'projects' && (
            <div className="py-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
              <ProjectCards />
            </div>
          )}
          {activeSection === 'chat' && (
            <div className="py-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Chat</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto flex h-[500px] border border-border/50">
                {/* Sidebar: Team Members */}
                <div className="w-64 bg-gray-50 border-r border-border/50 flex flex-col p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Group Members</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">K</div>
                      <span className="text-gray-800 font-medium">Aarav</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">S</div>
                      <span className="text-gray-800 font-medium">Meera</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">RR</div>
                      <span className="text-gray-800 font-medium">Yash</span>
                    </div>
                  </div>
                </div>
                {/* Chat Panel */}
                <div className="flex-1 flex flex-col">
                  {/* Chat Header with call icons */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-white">
                    <span className="text-lg font-semibold text-gray-800">Team Chat</span>
                    <div className="flex gap-4">
                      {/* Voice Call Icon (SVG) */}
                      <button title="Voice Call" className="text-gray-500 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0122 16.92z" />
                        </svg>
                      </button>
                      {/* Video Call Icon (SVG) */}
                      <button title="Video Call" className="text-gray-500 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="3" y="7" width="15" height="10" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                          <path d="M21 7l-4 3v4l4 3V7z" strokeWidth={2} stroke="currentColor" fill="none" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 bg-white flex flex-col gap-3" id="chat-panel">
                    {messages.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center">
                        <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <div className={
                            msg.sender === 'me'
                              ? 'bg-blue-100 text-blue-900 px-4 py-2 rounded-2xl max-w-xs shadow text-sm'
                              : 'bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow text-sm'
                          }>
                            {msg.sender !== 'me' && (
                              <span className="block font-semibold text-xs mb-1 text-blue-700">{msg.sender}</span>
                            )}
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form
                    className="flex items-center gap-2 border-t border-border/50 bg-gray-50 p-4"
                    onSubmit={handleSendMessage}
                  >
                    <input
                      type="text"
                      placeholder="Type Your Message ........."
                      className="flex-1 bg-white border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center"
                    >
                      {/* Send icon facing right */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'resources' && (
            <Resource />
          )}
          {activeSection === 'calendar' && (
            <div className="py-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h2>
              <CalendarView
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
              />
            </div>
          )}
          {activeSection === 'teams' && (
            <div className="py-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AlumniCard name="Aarav" major="Frontend Lead" description="UI/UX and React specialist." skills={['React', 'Tailwind', 'Figma']} />
                <AlumniCard name="Meera" major="Backend Developer" description="Node.js and API expert." skills={['Node.js', 'Express', 'MongoDB']} />
                <AlumniCard name="Yash" major="Full Stack Engineer" description="Bridges frontend and backend." skills={['React', 'Node.js', 'SQL']} />
                <AlumniCard name="Priya Singh" major="QA Engineer" description="Ensures quality and testing." skills={['Jest', 'Cypress', 'Manual Testing']} />
                <AlumniCard name="Amit Shah" major="DevOps Specialist" description="Automates and deploys." skills={['Docker', 'AWS', 'CI/CD']} />
                <AlumniCard name="Emily White" major="UI Designer" description="Designs beautiful interfaces." skills={['Figma', 'Sketch', 'Adobe XD']} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};