import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './index.css'
import APP_ROUTES from '../service/AppRoutes';
import ConnectWithPerson from '../components/connect-with-person/ConnectWithPerson';
import LoginPage from '../components/login/LoginPage';
import SignupPage from '../components/login/SingupPage';

const { Header, Content, Footer } = Layout;

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <div className='container'>

          <Routes>
            <Route path={APP_ROUTES.CONNECT} element={<ConnectWithPerson/>  } />
            <Route path={APP_ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={APP_ROUTES.SIGNUP} element={<SignupPage/>} />
            <Route path="*" element={<Navigate to={APP_ROUTES.CONNECT} />} />
          </Routes>
    </div>
    </BrowserRouter>
  </React.StrictMode>,
)
