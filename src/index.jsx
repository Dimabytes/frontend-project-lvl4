// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Link,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import { NotFoundPage } from './pages/notFound/NotFoundPage.jsx';
import authContext from './contexts/index.js';
import useAuth from './hooks/index.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login">Log in</Button>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"><AuthButton /></nav>

        <Routes>

          <Route
            path="/"
            element={(
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('chat'));
