import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; 
import SentimentPage from './components/SentimentForm';
import SentimentHistoryPage from './pages/SentimentHistoryPage';
import ChatPage from './pages/ChatPage';
import MoodTracker from './pages/MoodTracker';
import EmergencyHelp from './pages/EmergencyHelp';
import MicroTherapyPage from './pages/MicroTherapyPage';
import WearableIntegration from './pages/WearableIntegration';
import CulturalPreference from './pages/CulturalPreference';
import AdminDashboard from './pages/AdminDashboard'; // Correct path
import PrivateRoute from './components/PrivateRoute';
import ManualDataEntryPage from './pages/ManualDataEntryPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sentiment" element={<SentimentPage />} />
        <Route path="/history" element={<SentimentHistoryPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/emergency-help" element={<EmergencyHelp />} />
        <Route path="/micro-therapy" element={<MicroTherapyPage />} />
        <Route path="/wearables" element={<WearableIntegration />} />
        <Route path="/cultural-preferences" element={<CulturalPreference />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manual-data-entry" element={<ManualDataEntryPage />} />;
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

