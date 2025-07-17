import { createUseStyles } from 'react-jss';

export default createUseStyles({
  cardWrapper: {
    marginLeft: '5px',
    '& .ant-card-body': { padding: '8px 0' },
    '& .ant-space-vertical': { marginLeft: 'inherit' },
  },
  buttonWrapper: {
    marginBlock: '5px',
    height: 'auto',
    whiteSpace: 'normal',
  },
});
