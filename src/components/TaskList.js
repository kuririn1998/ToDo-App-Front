import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDelete, onUpdate }) {
    const listStyle = {
        marginTop: '20px',
        listStyle: 'none',
        padding: 0,
    };

    return (
        <ul style={listStyle}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete} // 完了状態の切り替え
                    onDelete={onDelete} // タスク削除用
                    onUpdate={onUpdate} // タスク更新用
                />
            ))}
        </ul>
    );
}

export default TaskList;
