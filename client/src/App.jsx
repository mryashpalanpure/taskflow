import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ArchitectureTiers from './components/ArchitectureTiers';
import TaskFilter from './components/TaskFilter';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import { checkHealth, fetchTasks, createTask, updateTask, deleteTask } from './api/api';
import { ClipboardList, AlertTriangle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Check health of Tier 2 (Backend) and Tier 3 (MongoDB)
  const loadHealth = useCallback(async () => {
    try {
      setIsRefreshingHealth(true);
      const data = await checkHealth();
      setHealth(data);
    } catch (err) {
      setHealth({
        status: 'unreachable',
        uptime: '0s',
        database: { status: 'disconnected' },
      });
    } finally {
      setIsRefreshingHealth(false);
    }
  }, []);

  // Fetch tasks
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const res = await fetchTasks(params);
      if (res.success) {
        setTasks(res.data);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(
        err.response?.data?.message ||
        'Unable to load tasks from backend. Check if Express server (Port 5000) and MongoDB are running.'
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  // Initial load
  useEffect(() => {
    loadHealth();
    loadTasks();

    // Health poll every 15s
    const interval = setInterval(loadHealth, 15000);
    return () => clearInterval(interval);
  }, [loadHealth, loadTasks]);

  // Handle Create / Edit Task
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save task.');
    }
  };

  // Handle Quick Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      loadTasks();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Handle Delete
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      alert('Failed to delete task.');
    }
  };

  return (
    <div>
      <Navbar
        health={health}
        onRefreshHealth={loadHealth}
        isRefreshing={isRefreshingHealth}
      />

      <main className="container" style={{ paddingBottom: '4rem' }}>
        {/* Tier Architecture Indicator */}
        <ArchitectureTiers health={health} />

        {/* Database notice if disconnected */}
        {health && health.database?.status !== 'connected' && (
          <div
            style={{
              padding: '0.9rem 1.25rem',
              marginBottom: '1.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.875rem',
              color: '#fcd34d',
            }}
          >
            <AlertTriangle size={20} color="#f59e0b" />
            <div>
              <strong>Tier 3 (MongoDB) is currently disconnected:</strong> Make sure your local MongoDB service is running on{' '}
              <code>mongodb://127.0.0.1:27017</code> or update <code>MONGO_URI</code> in <code>server/.env</code>.
            </div>
          </div>
        )}

        {/* Controls & Search */}
        <TaskFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onOpenCreateModal={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        />

        {/* Error message */}
        {error && (
          <div
            style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#fda4af',
              fontSize: '0.9rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Tasks List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading tasks from backend...</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => {
                  setEditingTask(t);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel empty-state">
            <ClipboardList size={48} className="empty-state-icon" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              No tasks found
            </h3>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
              {search || statusFilter || priorityFilter
                ? 'Try adjusting your search criteria or clearing active filters.'
                : 'Create your first task to see the 3-Tier MERN stack in action!'}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
            >
              Add First Task
            </button>
          </div>
        )}
      </main>

      {/* Modal Dialog */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
}

export default App;
