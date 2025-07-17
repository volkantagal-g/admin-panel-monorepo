import { createUseStyles } from 'react-jss';

export default createUseStyles({
  uploadWrapper: {
    '& .ant-upload-select': {
      width: '32px',
      height: '32px',
      margin: '0',
      '& .anticon': { verticalAlign: 'bottom' },
    },
  },
});
