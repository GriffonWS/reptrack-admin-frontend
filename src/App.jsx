import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/dashboard/Gym-owner/Register';
import AllOwner from './pages/dashboard/Gym-owner/AllOwner';
import EditOwner from './pages/dashboard/Gym-owner/EditOwner';
import Profile from './pages/dashboard/Gym-owner/Profile';
import AdminProfile from './pages/dashboard/profile/AdminProfile';
import EditAdminProfile from './pages/dashboard/profile/EditAdminProfile';



// Dashboard child pages


const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
     

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<AllOwner />} /> {/* /dashboard */}
        <Route path="register_owner" element={<Register />} />
        <Route path="all_owners" element={<AllOwner />} />
        <Route path="all_owners/:id" element={<Profile />} />
        <Route path="all_owners/:id/edit" element={<EditOwner />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="profile/edit" element={<EditAdminProfile />} />


      </Route>
    </Routes>
  );
};

export default App;