import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.color.lightGray,
    borderBottom: theme.border.type1,
    alignItems: 'center',
    padding: '4px',
  },
  headerText: {
    fontSize: '12px',
    fontWeight: '600',
  },
  headerTextLight: { fontSize: '12px' },
}));
