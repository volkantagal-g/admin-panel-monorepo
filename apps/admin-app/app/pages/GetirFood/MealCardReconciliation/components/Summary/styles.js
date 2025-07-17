import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { 
    textCenter: { textAlign: 'center' },
    container: { marginBottom: 0, height: '100%', '& .ant-card': { height: '100%' } },
    innerContainer: { width: '375px', margin: 'auto' },
  };
});
