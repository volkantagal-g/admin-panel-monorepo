import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    filterWrapper: { width: '100%' },
    filterItem: { width: '100%' },
    buttonContainer: { display: 'flex', justifyContent: 'flex-end' },
    error: { borderColor: theme.color.error },
  };
});
