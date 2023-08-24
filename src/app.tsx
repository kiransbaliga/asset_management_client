import type { FC } from 'react';
import './styles/global.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Dashboard from './layouts/Dashboard';
import AuthRequired from './wrappers/AuthRequired';
import DoNotAuth from './wrappers/DoNotAuth';
import UIProvider from './contexts/UIContexts';

const App: FC = () => {
  return (
    <UIProvider>
      <Router>
        <Routes>
          <Route path='' element={<Home />} />
          <Route
            path='/login'
            element={
              <DoNotAuth>
                <Login />
              </DoNotAuth>
            }
          />
          <Route
            path='/*'
            element={
              <AuthRequired>
                <Dashboard />
              </AuthRequired>
            }
          />
        </Routes>
      </Router>
    </UIProvider>
  );
};

export default App;
