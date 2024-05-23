import { Link, Outlet, useLocation } from 'react-router-dom';
import Loader from './Loader';
import { Suspense } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const Layouts: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: 'Home',
      to: '/'
    },
    {
      key: '3',
      label: 'About',
      to: '/about'
    }
  ];

  const location = useLocation();

  const breadcrumbItems = window.location.pathname
    .split('/')
    .filter((item, index) => item || index === 0)
    .map((item, index) => (
      <Breadcrumb.Item key={index} href={index === 0 ? '/' : undefined}>
        {item.replace(/%20/g, ' ') || 'Home'}
      </Breadcrumb.Item>
    ));

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'White', paddingRight: '8px' }}>Owen News</h1>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[location.pathname]}
          style={{ flex: 1, minWidth: 0 }}>
          {items.map((item) => (
            <Menu.Item key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 48px', minHeight: '100vh' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
        {window.location.pathname !== '/' ? (
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG
            }}>
            {/* <div className='site-layout-content'> */}
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©{new Date().getFullYear()} Created by Owen
      </Footer>
    </Layout>
  );
};

export default Layouts;
