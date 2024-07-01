import './App.css'
import Dashboard from './components/Dasboard';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from './components/auth/Login'
import Register from './components/auth/Register'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser,clearUser } from './redux/userslice';
import {jwtDecode} from 'jwt-decode';


function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ user: decoded.user, token }));
      } catch (error) {
        console.error('Token is invalid:', error);
        localStorage.removeItem('token');
        dispatch(clearUser());
      }
    }
  }, [dispatch]);
  
  console.log(user);
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Register />} />
              <Route path="*" element={<SignIn/>} />
            </>
          ) : (
            <>
              <Route path="/" element={<><Header /><Dashboard /><Footer /></>} />
              <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;