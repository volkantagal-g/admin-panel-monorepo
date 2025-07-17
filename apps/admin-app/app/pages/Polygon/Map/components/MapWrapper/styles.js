import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    drawerWrapper: {
      '& > .ant-drawer-content-wrapper': {
        minWidth: '400px',
        width: '400px',
      },
    },
    mapWrapper: {
      '@media (min-width: 768px)': { height: 'calc(100vh - 124px)', width: '100%' },
      '@media (max-width: 768px)': { height: 'calc(50vh - 124px)', width: '100%' },
    },
  };
});
