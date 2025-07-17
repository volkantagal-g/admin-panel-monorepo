import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'default',
    fontSize: 12,

    '& svg': { flexShrink: 0 },
  },
  primary: { color: theme.color.primary },
}));
