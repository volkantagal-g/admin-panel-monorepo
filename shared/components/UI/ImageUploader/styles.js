import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { uploaderCard: { '& .ant-upload-select-picture-card': { width: '100%', height: 300 } } };
});
