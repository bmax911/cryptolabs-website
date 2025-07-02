
import React from 'react';
import { FaHome, FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ onLogout, expanded, onToggle }) => (
  <aside className={`sidebar-menu-fixed${expanded ? ' expanded' : ''}`} style={{ width: expanded ? 200 : 64 }}>
    <button
      className="sidebar-toggle-btn"
      onClick={onToggle}
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      style={{ position: 'absolute', top: 16, right: expanded ? 8 : -20, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#00fff7' }}
    >
      {expanded ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
    <ul>
      <li><FaHome title="Home" />{expanded && <span style={{marginLeft:12}}>Home</span>}</li>
      <li><FaMoneyBillWave title="Trading Fee Cashback" />{expanded && <span style={{marginLeft:12}}>Cashback</span>}</li>
      <li><FaUserFriends title="Referral" />{expanded && <span style={{marginLeft:12}}>Referral</span>}</li>
      <li><FaUser title="Profile" />{expanded && <span style={{marginLeft:12}}>Profile</span>}</li>
      <li><FaChartLine title="Research" />{expanded && <span style={{marginLeft:12}}>Research</span>}</li>
      <li onClick={onLogout} className="logout-link"><FaSignOutAlt title="Logout" />{expanded && <span style={{marginLeft:12}}>Logout</span>}</li>
    </ul>
  </aside>
);

export default Sidebar;
