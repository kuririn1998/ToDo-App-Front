import React, { useState } from 'react';
import apiClient from '../api/client';
import { useNavigate } from 'react-router-dom';

function LoginForms({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // ログイン処理
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/login', { username, password });
            const { token } = response.data;

            // トークンをローカルストレージに保存
            localStorage.setItem('token', token);

            // ログイン成功後の処理
            onLogin(username);
            navigate('/home'); // ToDoホーム画面に遷移
        } catch (err) {
            setError('ログインに失敗しました。ユーザー名またはパスワードを確認してください。');
        }
    };

    // アカウント作成画面への遷移処理
    const handleNavigateToSignUp = () => {
        navigate('/signup'); // `/signup` パスに遷移
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '400px',
        margin: '20px auto',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };

    const linkButtonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'transparent',
        color: '#007bff',
        border: 'none',
        textDecoration: 'underline',
        cursor: 'pointer',
        textAlign: 'center',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
    };

    return (
        <form style={formStyle} onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button type="submit" style={buttonStyle}>
                ログイン
            </button>
            <button type="button" style={linkButtonStyle} onClick={handleNavigateToSignUp}>
                アカウント作成はこちら
            </button>
        </form>
    );
}

export default LoginForms;
