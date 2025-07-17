import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: { width: '100%' },
  marginBottom: { marginBottom: '24px' },
  alignToMiddle: {
    marginBottom: '0px',
    marginTop: 'auto',
  },
  uploadWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& *': { cursor: 'no-drop' }, // overwrite csv importer mouse css
  },
});
