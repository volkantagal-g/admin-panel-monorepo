import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { inputWrapper: { width: '100%', '& .ant-col div.ant-select': { width: '100% !important' } } };
});
