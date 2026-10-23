import React from 'react';
import { Layers, Activity, RefreshCw } from 'lucide-react';

const Navbar = ({ health, onRefreshHealth, isRefreshing }) => {
  const isHealthy = health?.status === 'healthy';

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="brand">
          <div className="brand-icon">
            <Layers size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-title">TaskFlow</span>
              <span className="brand-tag">3-Tier MERN</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
            }}
          >
            <Activity size={14} color={isHealthy ? '#10b981' : '#f43f5e'} />
            <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
            <span style={{ fontWeight: 600, color: isHealthy ? '#34d399' : '#fb7185' }}>
              {isHealthy ? 'Healthy' : 'Connecting...'}
            </span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onRefreshHealth}
            title="Refresh Health Status"
            disabled={isRefreshing}
          >
            <RefreshCw size={14} className={isRefreshing ? 'spinner' : ''} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
