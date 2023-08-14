import './assets/css/App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import LandingPage from './pages/LandingPage.jsx';
// Components
import SideNav from './components/SideNav.jsx';

const PageLayout = () => {
  return (
    <>
      <div>
        <SideNav />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* Routes With SideNav */}
        <Route path='/user' element={<PageLayout />}>
          <Route path='home' element={<Home />} />
        </Route>

        {/* Landing Page */}
        <Route path='/' element={<LandingPage />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
