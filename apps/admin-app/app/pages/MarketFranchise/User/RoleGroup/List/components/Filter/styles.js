import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: { width: '100%' },
    inputWrapper: { width: '100%' },
    switchWrapper: { paddingTop: '4px', paddingLeft: '0px !important' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
