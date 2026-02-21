import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// All imports
import AdminDashboard from "../pages/AdminDashboard";
import Analytics from "../pages/Analytics";
import InterviewScheduler from "../pages/InterviewScheduler";
import Events from "../pages/Events";
import JobBoard from "../pages/JobBoard";
import StudentDashboard from "../pages/StudentDashboard";
import AlumniDashboard from "../pages/AlumniDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ApplicationForm from "../pages/ApplicationForm";
import LandingPage from "../pages/LandingPage";
import Network from "../pages/Network"; 
import Internships from "../pages/Internships";
import MyApplications from "../pages/MyApplications";
import SkillAssessment from "../pages/SkillAssessment";
import UpdateProfile from "../pages/UpdateProfile";
import PostOffer from '../pages/PostOffer';
import AdminReports from '../pages/AdminReports';
import ForgotPassword from "../pages/ForgotPassword"; 
import ResetPassword from "../pages/ResetPassword"; // New Import Added

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth & Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/reset-password" element={<ResetPassword />} /> {/* New Route Added */}
        
        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/alumni" element={<AlumniDashboard />} />
        
        {/* Admin Specific Features */}
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/interviews" element={<InterviewScheduler />} />
        <Route path="/admin/events" element={<Events />} />

        {/* Functional routes */}
        <Route path="/jobs" element={<JobBoard />} /> 
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/network" element={<Network />} /> 
        <Route path="/internships" element={<Internships />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/assessments" element={<SkillAssessment />} />
        <Route path="/update-profile" element={<UpdateProfile />} /> 
        <Route path="/admin/post-offer" element={<PostOffer />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  );
}