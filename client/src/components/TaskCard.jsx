import React from 'react';
import { Calendar, Trash2, Edit2, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-completed">Completed</span>;
      case 'in-progress':
        return <span className="badge badge-in-progress">In Progress</span>;
      default:
        return <span className="badge badge-pending">Pending</span>;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const formattedDate = new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="glass-panel task-card">
      <div>
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          {getStatusBadge(task.status)}
        </div>

        {task.description && <p className="task-desc">{task.description}</p>}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            <AlertCircle size={14} className={getPriorityClass(task.priority)} />
            <span style={{ textTransform: 'capitalize', fontWeight: 600 }} className={getPriorityClass(task.priority)}>
              {task.priority || 'medium'} priority
            </span>
          </div>

          {/* Quick status cycle */}
          <select
            className="select-filter"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
          >
            <option value="pending">Mark Pending</option>
            <option value="in-progress">Mark In-Progress</option>
            <option value="completed">Mark Completed</option>
          </select>
        </div>

        <div className="task-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>

          <div className="task-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(task)}
              title="Edit Task"
            >
              <Edit2 size={13} />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(task._id)}
              title="Delete Task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
