import './assets/css/App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
// Components
import SideNav from './components/SideNav.jsx';

const PageLayout = () => {
  return (
    <>
      <div className='flex min-h-screen'>
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
        <Route path='/app' element={<PageLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='customers' element={<Customers />} />
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
