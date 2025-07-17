import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    rangePicker: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
    rowContainer: { marginTop: '-25px' },
  };
});
