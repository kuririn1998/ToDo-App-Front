import React, { useState } from 'react';

function TaskItem({ task = {}, onDelete, onUpdate, onToggleComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title || '');
    const [editedDetails, setEditedDetails] = useState(task.details || '');
    
    const handleSave = () => {
        if (typeof onUpdate === 'function') {
            onUpdate(task.id, editedTitle, editedDetails);
        } else {
            console.error('onUpdate is not a function');
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        debugger;
        if (typeof onDelete === 'function') {
            onDelete(task.id);
        } else {
            console.error('onDelete is not a function');
        }
    };

    const handleToggleComplete = () => {
        if (typeof onToggleComplete === 'function') {
            onToggleComplete(task.id);
        } else {
            console.error('onToggleComplete is not a function');
        }
    };

    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    };

    const textStyle = {
        whiteSpace: 'pre-wrap',
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? '#28a745' : '#000',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
    };

    const buttonStyle = {
        padding: '5px 10px',
        fontSize: '14px',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
    };

    if (!task || !task.id) return null;

    return (
        <li style={itemStyle}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={inputStyle}
                        aria-label="タイトル編集"
                    />
                    <textarea
                        value={editedDetails}
                        onChange={(e) => setEditedDetails(e.target.value)}
                        style={{ ...inputStyle, height: '80px' }}
                        aria-label="詳細編集"
                    />
                    <button onClick={handleSave} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
                        保存
                    </button>
                </>
            ) : (
                <>
                    <h3
                        style={textStyle}
                        onClick={handleToggleComplete}
                        role="button"
                        aria-label="タスク完了の切り替え"
                    >
                        {task.title}
                    </h3>
                    <p
                        style={textStyle}
                        onClick={handleToggleComplete}
                        role="button"
                        aria-label="タスク詳細完了の切り替え"
                    >
                        {task.details}
                    </p>
                    <small>作成日時: {new Date(task.created_at).toLocaleString() || 'N/A'}</small>
                    <br />
                    <small>更新日時: {new Date(task.updated_at).toLocaleString() || 'N/A'}</small>
                    <br />
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ ...buttonStyle, backgroundColor: '#007bff' }}
                        aria-label="タスク編集"
                    >
                        編集
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                        aria-label="タスク削除"
                    >
                        削除
                    </button>
                </>
            )}
        </li>
    );
}

export default TaskItem;
