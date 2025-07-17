import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    spaceWrapper: {
      width: '100%',
      height: 'calc(100% - 10px)',
      background: '#fff',
      display: 'flex',
      '& .ant-space-item': {
        flex: 1,
        borderBottom: '1px solid #f0f0f0',
        margin: '0px !important',
        '& > div': { margin: '0px !important', height: '100%' },
        '& .ant-card-bordered': { border: '0 none' },
      },
    },
  };
});
