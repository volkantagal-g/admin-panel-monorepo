import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: { width: '100%' },
    filterItem: { width: '100%' },
    formItem: { marginBottom: 0 },
    buttonContainer: { display: 'flex', justifyContent: 'flex-end', marginTop: '15px' },
  };
});
