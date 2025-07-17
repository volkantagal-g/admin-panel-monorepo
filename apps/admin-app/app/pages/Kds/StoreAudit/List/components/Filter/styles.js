import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: { width: '100%' },
    rangePicker: { width: '100%' },
    selectWrapper: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
