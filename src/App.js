import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Home from './pages/home';
import Inventario from './pages/inventario';
import Login from './pages/login';
import Logout from './pages/util/logout';


import Nav from './pages/util/nav';
import './styles/App.scss';

import { UserProvider } from './UserProvider';
import { DataProvider } from './DataProvider';
import ProtectedRoute from "./pages/util/ProtectedRoute";

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <main className="App">
          <Router basename={"/"}>
            <Nav/>
            <section>
              <Routes>
                  <Route path="/" element={
                    <ProtectedRoute accessBy="non-authenticated">                      
                      <Login />
                    </ProtectedRoute>
                  } />                
                  <Route path="/home" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Home />
                    </ProtectedRoute>             
                  } />   
                  <Route path="/inventario" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Inventario />
                    </ProtectedRoute>             
                  } />                
                  <Route path="/logout" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Logout />
                    </ProtectedRoute>             
                  } />  
                  <Route path="*" element={<Navigate replace to="/home" />} />              
              </Routes>
            </section>
          </Router  >
        </main>
      </UserProvider>
    </DataProvider>
  );
}

export default App;
