import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const Protectedroute = ({ children,auth=false }) => {

  const isloggedin = localStorage.getItem('user:token') !== null || false;

  console.log("login=>", isloggedin)
  if (!isloggedin && auth) {
    return <Navigate to={'/users/login'} />
  }
  else if (isloggedin && ['/users/login', '/users/signup'].includes(window.location.pathname)) {
    return <Navigate to={'/'} />
  }
  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Protectedroute auth={true}>
            <Dashboard />
          </Protectedroute>
        } />
        <Route path='/users/login' element={
          <Protectedroute>
            <Login issigninpage={true} />
          </Protectedroute>
        } />
        <Route path='/users/signup' element={
          <Protectedroute>
            <Signup issigninpage={false} />
          </Protectedroute>} />
      </Routes>
    </>
  );
}

export default App;
