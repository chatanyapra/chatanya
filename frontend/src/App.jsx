import './App.css'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import Home from './pages/Home'
import WorkPage from './pages/WorkPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className='h-auto w-full relative app-main dark:bg-white overflow-hidden flex flex-col items-center m-auto' style={{ maxWidth: "1600px" }}>
      <div className='w-full overflow-hidden'>
        <div className="absolute top-0 left-0 bottom-0 right-0 glass-effect p-5 mt-20 text-center" style={{ zIndex: "2" }}></div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/work" element={<WorkPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
