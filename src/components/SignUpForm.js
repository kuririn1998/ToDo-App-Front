import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

function SignUpForm() {
    debugger;
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/auth/signup', formData);
            alert('アカウントが作成されました！ログイン画面に進んでください。');
            navigate('/login');
        } catch (err) {
            debugger;
            // バックエンドのエラーメッセージを利用
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                // その他のエラー用メッセージ
                setError('アカウント作成に失敗しました。入力内容を確認してください。');
            }
        }
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

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto' }}>
            <input
                type="text"
                name="username"
                placeholder="ユーザー名"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
                type="password"
                name="password"
                placeholder="パスワード"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ padding: '10px', fontSize: '16px' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                アカウント作成
            </button>
            <button
                type="button"
                onClick={() => navigate('/login')}
                style={linkButtonStyle}
            >
                ログイン画面に戻る
            </button>
        </form>
    );
}

export default SignUpForm;

