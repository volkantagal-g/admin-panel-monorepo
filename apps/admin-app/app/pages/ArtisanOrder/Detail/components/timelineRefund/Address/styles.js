import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  cardTitle: {
    display: 'block',
    marginBottom: '16px',
    color: theme.color.primary,
  },

  address: {
    display: 'grid',
    gridTemplateColumns: 'auto fit-content(182px)',
    gap: '16px',
  },
}));
