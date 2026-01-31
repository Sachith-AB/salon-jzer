import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeader from "./components/CustomHeader";
import Home from './pages/Home';
import usePageTitle from './hooks/usePageTitle';
import AdminUpload from './pages/admin/AdminUpload';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  usePageTitle()
  
  return (
    <>
      <CustomHeader />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-upload" element={<AdminUpload />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
