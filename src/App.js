import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TodoHome from './components/TodoHome';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    // ログイン時の処理
    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username); // ログイン時に username を設定
    };

    // ログアウト時の処理
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername(''); // ログアウト時にリセット
    };

    const appStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
    };

    return (
        <Router>
            <div style={appStyle}>
                <Header />
                <Routes>
                    {/* ログイン画面 */}
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    {/* アカウント作成画面 */}
                    <Route path="/signup" element={<SignUpForm />} />
                    {/* ToDoホーム画面 */}
                    <Route
                        path="/home"
                        element={
                            isLoggedIn ? (
                                <TodoHome onLogout={handleLogout} username={username} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    {/* デフォルトはログイン画面へ */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
