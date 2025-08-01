import { createUseStyles } from 'react-jss';

export default createUseStyles({
  form: { backgroundColor: 'white', padding: '6px 12px' },
  formItem: { '& label ': { fontWeight: 'bold' } },
  editModeButtons: { '& > *': { marginRight: '5px' } },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
});
