import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavBar from './components/SideNavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/side-nav-bar" element={<SideNavBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
