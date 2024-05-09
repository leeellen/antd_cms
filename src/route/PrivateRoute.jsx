import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOutlined, CreditCardOutlined, HomeOutlined, TransactionOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', 'dashboard', <HomeOutlined />),
    getItem('Transactions', 'transactions', <TransactionOutlined />),
    getItem('Credit Cards', 'creditcards', <CreditCardOutlined />),
    getItem('Accounts', 'accounts', <UserOutlined />, [
        getItem('My Privileges', 'myprivileges'),
        getItem('Setting', 'setting'),
    ]),
];

export default function PrivateRoute() {
    const { pathname } = useLocation();
    const [, main, sub] = pathname.split('/');
    const selected = sub ? [sub, main] : [main];
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        !selected[0] && navigate('/dashboard');
    }, [navigate, selected]);

    const getCurrentTitle = () => items.find((e) => e.key === main);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: '#fff',
                        bodyBg: 'rgb(242,245,249)',
                        headerHeight: 100,
                    },
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                    <div className="demo-logo-vertical" />
                    <div style={{ display: 'flex', gap: 10, padding: '30px 38px' }}>
                        <BookOutlined style={{ fontWeight: 'bold', fontSize: 30, color: '#0575E6' }} />
                        <h1 style={{ fontWeight: 'bold', fontSize: 25, color: '#0575E6' }}>ANTD CMS</h1>
                    </div>
                    <Menu
                        selectedKeys={selected}
                        mode="inline"
                        items={items}
                        onClick={({ item, key, keyPath, domEvent }) => {
                            const [page, parents] = keyPath;
                            const moveTo = parents ? `/${parents}/${page}` : `/${page}`;
                            navigate(moveTo);
                        }}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '20px 40px',
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h2 style={{ fontSize: 23, fontWeight: 600 }}>{getCurrentTitle()?.label}</h2>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    </Header>
                    <Content style={{ padding: '24px 40px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
