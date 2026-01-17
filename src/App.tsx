import { Routes, Route } from 'react-router-dom';
import CustomHeader from "./components/CustomHeader";
import Home from './pages/Home';
import usePageTitle from './hooks/usePageTitle';
import Admin from './pages/Admin';

export default function App() {
  usePageTitle()
  
  return (
    <>
      <CustomHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}
