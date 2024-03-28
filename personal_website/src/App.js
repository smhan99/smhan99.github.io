import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bio from "./pages/Bio";
import Projects from "./pages/Projects";
import ProjectDesc from "./pages/ProjectDesc";
import Experience from "./pages/Experience";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Mvp_chooser from './pages/opener/mvp_chooser'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDesc />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/mvp" element={<Mvp_chooser />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
