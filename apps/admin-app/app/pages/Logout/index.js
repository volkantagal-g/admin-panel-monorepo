import { Spin } from 'antd';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearLocalStorage } from '@shared/utils/localStorage';

export default function Logout() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // to give a feeling of loading
    setTimeout(() => {
      clearLocalStorage();
      navigate('/login');
    }, 500);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Spin />
    </div>
  );
}
