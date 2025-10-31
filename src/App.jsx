import React from 'react';
import { Routes, Route } from 'react-router-dom';




import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/dashboard/Gym-owner/Register';
import AllOwner from './pages/dashboard/Gym-owner/AllOwner';
import EditOwner from './pages/dashboard/Gym-owner/EditOwner';
import Profile from './pages/dashboard/Gym-owner/Profile';
import AdminProfile from './pages/dashboard/profile/AdminProfile';
import EditAdminProfile from './pages/dashboard/profile/EditAdminProfile';
import Login from './pages/auth/adminLogin';
import RegisterAdmin from './pages/auth/adminRegister';
import Health from './pages/dashboard/Health/Health';
import PrivacyPolicy from './pages/dashboard/PrivacyPolicy/PrivacyPolicy';
import Support from './pages/dashboard/Support/Support';







// Dashboard child pages


const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAdmin />} />
     
     

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<AllOwner />} /> {/* /dashboard */}
        <Route path="register_owner" element={<Register />} />
        <Route path="all_owners" element={<AllOwner />} />
        <Route path="all_owners/:id" element={<Profile />} />
        <Route path="all_owners/:id/edit" element={<EditOwner />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="profile/edit" element={<EditAdminProfile />} />
        <Route path="health" element={<Health />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Routes>
  );
};

export default App;