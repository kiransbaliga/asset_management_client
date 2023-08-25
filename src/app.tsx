import type { FC } from 'react';
import './styles/global.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Dashboard from './layouts/Dashboard';
import AuthRequired from './wrappers/AuthRequired';
import DoNotAuth from './wrappers/DoNotAuth';
import { Tooltip } from 'react-tooltip';
import UIProvider from './contexts/UIContexts';
// import PageNotFound from './pages/PageNotFound';

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
            path='*'
            element={
              <AuthRequired>
                <Dashboard />
              </AuthRequired>
            }
          />
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </Router>
      <Tooltip id='my-tooltip' />
    </UIProvider>
  );
};

export default App;
