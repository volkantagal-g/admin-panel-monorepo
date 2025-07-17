import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    selectItem: { width: '100%' },
    choicesListButton: { margin: '0px 3px' },
    choicesListButtonsWrapper: { display: 'flex', justifyContent: 'end', alignItems: 'center'  },
    choicesListWrapper: { display: 'flex', alignItems: 'baseline', margin: 'auto' },
    rowWrapper: { display: 'flex', alignItems: 'center' },
    submitButton: { display: 'flex', justifyContent: 'end' },
    infoAlert: { marginBottom: '10px' },
  };
});
