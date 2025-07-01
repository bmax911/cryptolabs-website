import { useEffect } from 'react';

const NewsRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://cryptolabs.zephyrboost.com/';
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a202c', color: 'white' }}>
      <p style={{ fontSize: '1.2rem' }}>Redirecting to our news site...</p>
    </div>
  );
};

export default NewsRedirect;
