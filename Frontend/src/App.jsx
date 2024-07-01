import './App.css'
import SignIn from './components/auth/Login'
import Register from './components/auth/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
     const isLoggesIn=false;
  return (
    <div>
     <BrowserRouter>
      <Routes>
        {!isLoggesIn?(
          <>
             <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Register/>} />
              <Route path="*" element={<Register/>} />
          </>
        ):(
        <>
          {/* <Route path="/" element={<Home />} /> */}
          
        </>
      )}
      </Routes>
     </BrowserRouter>
     
  </div>
  )
}



export default App
