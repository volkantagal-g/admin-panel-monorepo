import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  card: {
    '& .ant-card-body': {
      padding: '0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textAlign: 'center',
  },
}));
