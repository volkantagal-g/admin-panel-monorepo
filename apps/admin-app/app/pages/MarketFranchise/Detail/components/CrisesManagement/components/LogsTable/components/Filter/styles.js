import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: { width: '100%' },
    buttonWrapper: { display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingBottom: '8px' },
  };
});
