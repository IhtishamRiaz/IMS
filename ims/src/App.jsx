import './assets/css/App.css';
import { Outlet, Route, Routes, useLocation, Navigate } from 'react-router-dom';
// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Unauthorised from './pages/Unauthorised.jsx';
// Components
import SideNav from './components/SideNav.jsx';
import { useMyContext } from './context/ContextProvider';

const PageLayout = () => {
  return (
    <>
      <div className='flex min-h-screen'>
        <SideNav />
        <main className='min-h-screen px-8 py-5 border basis-full'>
          <Outlet />
        </main>
      </div>
    </>
  );
};

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useMyContext();
  const location = useLocation();

  return (
    allowedRoles?.includes(auth?.role)
      ? <Outlet />
      : auth?.userId
        ? < Navigate to={'/unauthorised'} state={{ from: location }} replace />
        : < Navigate to={'/login'} state={{ from: location }} replace />
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* Only Admin Routes */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path='/app' element={<PageLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={['admin', 'user']} />}>
          <Route path='/app' element={<PageLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='accounts' element={<Accounts />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/unauthorised' element={<Unauthorised />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
