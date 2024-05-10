import PrivateRoute from './route/PrivateRoute';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import CreditCards from './pages/creditCard/CreditCards';
import MyPrivileges from './pages/accounts/MyPrivileges';
import Setting from './pages/accounts/Setting';
import CreditCardsDetail from './pages/creditCard/CreditCardsDetail';

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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/creditcards" element={<CreditCards />} />
                    <Route path="/creditcards/:id" element={<CreditCardsDetail />} />
                    <Route path="/accounts/myprivileges" element={<MyPrivileges />} />
                    <Route path="/accounts/setting" element={<Setting />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
