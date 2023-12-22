
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './User/Login'
import Register from './User/Register';
import Home from './User/Home';
import AdminLogin from './Admin/AdminLogin'
import AdminHome from './Admin/AdminHome'

function App() {
  return (
    <Router>
      <Routes>
   {/* user */}
        <Route path='/' exact element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>}/>

{/* admin */}
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin-home' element={<AdminHome/>} />


      </Routes>
    </Router>
  );
}

export default App;
