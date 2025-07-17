import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { generaInfo: { '& > div': { '& .ant-card': { height: '100%' } } } };
});
