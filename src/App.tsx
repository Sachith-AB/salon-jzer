import { Routes, Route } from 'react-router-dom';
import CustomHeader from "./components/CustomHeader";
import Home from './pages/Home';
import usePageTitle from './hooks/usePageTitle';

export default function App() {
  usePageTitle()
  
  return (
    <>
      <CustomHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}
