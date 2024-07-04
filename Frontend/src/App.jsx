import './App.css'
import AdminDashboard from './components/dashboard/AdminDasboard';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import NotFound from './components/pages/NotFound';
import SignIn from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/components/Hero';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser,clearUser } from './redux/userslice';
import {jwtDecode} from 'jwt-decode';
import Hero from './components/components/Hero';
import Navbar from './components/pages/Navbar';
import Homepage from './components/pages/Homepage';
import Bookinfo from './components/pages/BookInfo';
import LibrarianDashboard from './components/Librarian/LibrarianDashBoard';
import BooksList from './components/components/BookList';



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
  
  // console.log(user);
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
             <Route path="/" element={<><Header/><Homepage/><Footer /></>} />
             <Route path="api/books/:id" element={<><Navbar/><Bookinfo /><Footer /></>} />
             {/* <Route path="librarian" element={<LibrarianDashboard/>} /> */}
             <Route path="librarian" element={<LibrarianDashboard />}>
               <Route index element={<BooksList />} />
               
            </Route>
              {user.role === 'admin' && (
                <Route path="/admin" element={<><Navbar /><AdminDashboard /><Footer /></>} />
              )}
              <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;