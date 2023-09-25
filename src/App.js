import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {Routes,Route } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
    </>
  );
}

export default App;
