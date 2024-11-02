import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import BlogEdit from './pages/BlogEdit';
import BlogPage from './pages/BlogPage';
import Home from './pages/Home';
import ProjectEdit from './pages/ProjectEdit';
import SignPage from './pages/SignPage';
import WorkPage from './pages/WorkPage';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Start loading whenever route changes
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after the timeout
    }, 4000); // Change duration as needed

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading &&(
        <Preloader />
      )}
        <div className='h-auto w-full relative app-main dark:bg-white overflow-hidden flex flex-col items-center m-auto' style={{ maxWidth: "1600px" }}>
          <div className='w-full overflow-hidden'>
            <div className="absolute top-0 left-0 bottom-0 right-0 glass-effect p-5 mt-20 text-center" style={{ zIndex: "2" }}></div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:id" element={<BlogPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<WorkPage />} />
              <Route path="/sign" element={<SignPage />} />
              <Route path="/projectedit" element={<ProjectEdit />} />
              <Route path="/projectedit/:id" element={<ProjectEdit />} />
              <Route path="/blogedit" element={<BlogEdit />} />
              <Route path="/blogedit/:id" element={<BlogEdit />} />
              <Route path="/*" element={<Outlet />} />
            </Routes>
          </div>
          <Toaster />
        </div>
    </>
  );
}

// Wrap App component with Router in the entry point
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
