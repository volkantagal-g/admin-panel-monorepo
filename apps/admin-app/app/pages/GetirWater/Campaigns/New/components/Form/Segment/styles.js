import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { fileUploader: { '& .ant-upload': { width: '100%' } } };
});
