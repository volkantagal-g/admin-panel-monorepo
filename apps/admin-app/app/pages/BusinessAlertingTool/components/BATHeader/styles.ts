import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  header: {
    paddingBottom: '24px',
    fontSize: '22px',
    fontWeight: 600,
    color: theme.color.primary,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
