import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

// Import all of your page components
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import { Collaborate } from './pages/Collaborate.jsx';
import AlumniDirectory from './pages/AlumniDirectory.jsx';
import JobPortal from './pages/JobPortal.jsx';
import DataManagement from './pages/DataManagement.jsx';
import Community from './pages/Community.jsx';
import CollegeDashboard from './pages/CollegeDashboard.jsx';
import CollegeAlumniPage from './pages/college/CollegeAlumniPage.jsx';
import CollegeStudentPage from './pages/college/CollegeStudentPage.jsx';
import CollegeEventsPage from './pages/college/CollegeEventsPage.jsx';
import CollegeResearchPage from './pages/college/CollegeResearchPage.jsx';
import CollegeJobsPage from './pages/college/CollegeJobsPage.jsx';
import CollegeProjectsPage from './pages/college/CollegeProjectsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CampaignsPage from './pages/CampaignsPage.jsx';
import ExplroreCampaignPage from './pages/ExploreCampaignPage.jsx'
import AlumniProfileComponent from './components/Alumni-Directory/AlumniProfileComponent.jsx'
import AlumniProfileRoute from './components/Alumni-Directory/AlumniProfileComponent.jsx';
import AlumniProfile from './hooks/AlumniProfileComp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "collaborate",
        element: <Collaborate />,
      },
      {
        path: "collaborate/team-chats",
        element: <Navigate to="/collaborate/chat" replace />,
      },
      {
        path: "collaborate/dashboard",
        element: <Collaborate />,
      },
      {
        path: "collaborate/projects",
        element: <Collaborate />,
      },
      {
        path: "collaborate/chat",
        element: <Collaborate />,
      },
      {
        path: "collaborate/resources",
        element: <Collaborate />,
      },
      {
        path: "collaborate/calendar",
        element: <Collaborate />,
      },
      {
        path: "collaborate/teams",
        element: <Collaborate />,
      },
      {
        path: "alumni-directory",
        element: <AlumniDirectory />,
      },
      {
        path: "job-board",
        element: <JobPortal />,
      },
      {
        path: "data-management",
        element: <DataManagement />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "college-dashboard",
        element: <CollegeDashboard />,
      },
      {
        path: "college/alumni",
        element: <CollegeAlumniPage />,
      },
      {
        path: "college/students",
        element: <CollegeStudentPage />,
      },
      {
        path: "college/events",
        element: <CollegeEventsPage />,
      },
      {
        path: "college/research",
        element: <CollegeResearchPage />,
      },
      {
        path: "college/jobs",
        element: <CollegeJobsPage />,
      },
      {
        path: "college/projects",
        element: <CollegeProjectsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path:"campaigns",
        element:<CampaignsPage/>
      },
      {
        path:"/campaigns/explore",
        element:<ExplroreCampaignPage/>
      },
      {
        path:"/profile",
        element:<AlumniProfile/>
      },
      {
        path:"/alumni/:id" ,
        element:<AlumniProfileRoute/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
