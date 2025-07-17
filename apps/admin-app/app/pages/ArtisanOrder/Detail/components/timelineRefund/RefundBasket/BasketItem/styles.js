import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  basketItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
  },
  itemImg: {
    border: '1px solid rgba(26, 57, 96, 0.1)',
    padding: '7px',
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: '4px',
    background: '#FFFFFF',
    overflow: 'hidden',
  },
  itemPrice: {
    display: 'block',
    color: theme.color.primary,
  },
  itemText: { display: 'block' },
}));
