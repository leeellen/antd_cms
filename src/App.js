import PrivateRoute from './route/PrivateRoute';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import SignUp from './pages/SignUp';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0575E6',
                },
            }}
        >
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                <Route path="/" element={<PrivateRoute />}>
                    {/* <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioManage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact/:id" element={<ContactManage />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsManage />} /> */}
                </Route>
            </Routes>
        </ConfigProvider>
    );
}

export default App;
