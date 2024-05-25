import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import APP_ROUTES from '../service/AppRoutes';
import ConnectWithPerson from '../components/connect-with-person/ConnectWithPerson';
import LoginPage from '../components/login/LoginPage';
import SignupPage from '../components/login/SingupPage';

const { Header, Content, Footer } = Layout;

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={APP_ROUTES.HOME}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={APP_ROUTES.LOGIN}>Login</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path={APP_ROUTES.CONNECT} element={<ConnectWithPerson/>  } />
            <Route path={APP_ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={APP_ROUTES.SIGNUP} element={<SignupPage/>} />
            <Route path={APP_ROUTES.HOME} element={<ConnectWithPerson/>  } />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Your Footer</Footer>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
