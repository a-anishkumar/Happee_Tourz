import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TourPackages from './pages/TourPackages'
import GroupTours from './pages/GroupTours'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Company from './pages/Company'
import AdminLogin from './dashboards/admin/AdminLogin'
import AdminDashboard from './dashboards/admin/AdminDashboard'
import ManagePackages from './dashboards/admin/ManagePackages'
import AddPackage from './dashboards/admin/AddPackage'
import EditPackage from './dashboards/admin/EditPackage'
import ManageTestimonials from './dashboards/admin/ManageTestimonials'
import AddTestimonial from './dashboards/admin/AddTestimonial'
import EditTestimonial from './dashboards/admin/EditTestimonial'
import ManageInquiries from './dashboards/admin/ManageInquiries'
import UserDashboard from './dashboards/user/UserDashboard'

const AppLayout = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/company" element={<Company />} />
          <Route path="/group-tour-packages" element={<GroupTours />} />
          <Route path="/tour-packages" element={<TourPackages />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<ManagePackages />} />
          <Route path="/admin/packages/add" element={<AddPackage />} />
          <Route path="/admin/packages/edit/:id" element={<EditPackage />} />
          <Route path="/admin/testimonials" element={<ManageTestimonials />} />
          <Route path="/admin/testimonials/add" element={<AddTestimonial />} />
          <Route path="/admin/testimonials/edit/:id" element={<EditTestimonial />} />
          <Route path="/admin/inquiries" element={<ManageInquiries />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
