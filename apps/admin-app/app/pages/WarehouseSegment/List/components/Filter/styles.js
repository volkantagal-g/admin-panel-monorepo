import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    filterWrapper: { width: '100%' },
    filterItem: { width: '100%' },
    labelItem: { display: 'block' },
    buttonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
