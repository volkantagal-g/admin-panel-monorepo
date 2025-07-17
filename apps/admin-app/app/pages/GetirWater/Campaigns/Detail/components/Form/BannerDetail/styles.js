import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { imageUploader: { '& .ant-upload': { width: '100%' } } };
});
