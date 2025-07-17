import { createUseStyles } from 'react-jss';

export default createUseStyles({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .ant-upload-list-item-card-actions-btn': { display: 'none' },
  },
});
