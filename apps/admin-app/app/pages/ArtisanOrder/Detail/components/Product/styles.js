import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  product: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 60,
    padding: 7,
    background: 'white',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 4,
    flexShrink: 0,
    '& img': {
      width: '100%',
      aspectRatio: 1,
      objectFit: 'contain',
    },
  },
  content: { minWidth: 0 },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '24px',
    color: theme.color.primary,
  },
  name: {
    fontSize: 14,
    lineHeight: '24px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));
