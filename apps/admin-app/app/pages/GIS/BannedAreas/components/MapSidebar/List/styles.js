import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    listWrapper: {
      overflow: 'scroll',
      height: '40vh',
      minHeight: '250px',
    },
    cardWrapper: {
      padding: '0',
      '& .ant-card-body': { padding: '0' },
      '& .ant-card-head-title': { margin: '0', padding: '10px 0', fontWeight: 'bold' },
      '& .ant-card-head': { minHeight: '16px' },
    },
    deleteButton: { right: '0' },
    formItemWrapper: { margin: '0' },
  };
});
