import React from 'react';
import { Monitor, Server, Database } from 'lucide-react';

const ArchitectureTiers = ({ health }) => {
  const isBackendUp = health?.status === 'healthy';
  const dbStatus = health?.database?.status || 'disconnected';
  const isDbConnected = dbStatus === 'connected';

  return (
    <div className="glass-panel tiers-banner">
      {/* Tier 1: Presentation */}
      <div className="tier-item">
        <div className="tier-badge-icon tier-1-icon">
          <Monitor size={22} />
        </div>
        <div className="tier-info">
          <div className="tier-name">Tier 1: Presentation</div>
          <div className="tier-title">React UI (Port 5173)</div>
          <div className="tier-status">
            <span className="status-dot online"></span>
            <span style={{ color: '#38bdf8' }}>Active Client</span>
          </div>
        </div>
      </div>

      {/* Tier 2: Application */}
      <div className="tier-item">
        <div className="tier-badge-icon tier-2-icon">
          <Server size={22} />
        </div>
        <div className="tier-info">
          <div className="tier-name">Tier 2: Application</div>
          <div className="tier-title">Express API (Port 5000)</div>
          <div className="tier-status">
            <span className={`status-dot ${isBackendUp ? 'online' : 'offline'}`}></span>
            <span style={{ color: isBackendUp ? '#818cf8' : '#fb7185' }}>
              {isBackendUp ? `Up (${health?.uptime})` : 'Offline / Unreachable'}
            </span>
          </div>
        </div>
      </div>

      {/* Tier 3: Database */}
      <div className="tier-item">
        <div className="tier-badge-icon tier-3-icon">
          <Database size={22} />
        </div>
        <div className="tier-info">
          <div className="tier-name">Tier 3: Data Layer</div>
          <div className="tier-title">MongoDB (Port 27017)</div>
          <div className="tier-status">
            <span
              className={`status-dot ${
                isDbConnected ? 'online' : dbStatus === 'connecting' ? 'connecting' : 'offline'
              }`}
            ></span>
            <span
              style={{
                color: isDbConnected ? '#34d399' : dbStatus === 'connecting' ? '#f59e0b' : '#fb7185',
                textTransform: 'capitalize',
              }}
            >
              {dbStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureTiers;
