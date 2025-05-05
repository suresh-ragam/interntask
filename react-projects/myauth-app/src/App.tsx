import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import AdminPage from './components/AdminPage';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/login' element = {<Login />}/>
        <Route path = '/signup' element = {<Signup />}/>
        <Route path = '/welcome' element = {<Welcome />}/>
        <Route path = "*" element = {<Navigate to = '/login' replace/>} />
        <Route path = '/admin' element = { <AdminRoute> <AdminPage /> </AdminRoute> }/>
      </Routes>
    </Router>
  );
}

export default App
