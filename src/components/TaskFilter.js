import React from 'react';

function TaskFilter({ filter, setFilter }) {
    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        color: '#fff',
        flex: '1',
        textAlign: 'center',
        marginRight: '10px',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
    };

    const inactiveButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d',
    };

    const containerStyle = {
        display: 'flex',
        marginTop: '20px',
    };

    return (
        <div style={containerStyle}>
            <button onClick={() => setFilter('all')} style={filter === 'all' ? activeButtonStyle : inactiveButtonStyle}>
                すべて
            </button>
            <button onClick={() => setFilter('completed')} style={filter === 'completed' ? activeButtonStyle : inactiveButtonStyle}>
                完了
            </button>
            <button onClick={() => setFilter('incomplete')} style={filter === 'incomplete' ? activeButtonStyle : inactiveButtonStyle}>
                未完了
            </button>
        </div>
    );
}

export default TaskFilter;
