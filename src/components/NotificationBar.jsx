import React from 'react';

const NotificationBar = ({ notifications }) => (
  <div className="notification-bar">
    {notifications && notifications.length > 0 ? (
      notifications.map((note, idx) => (
        <div className={`notification notification-${note.type || 'info'}`} key={idx}>
          {note.message}
        </div>
      ))
    ) : (
      <div className="notification notification-info">No new notifications</div>
    )}
  </div>
);

export default NotificationBar;
