import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapper: {
    width: '300px',
    right: 0,
    borderRadius: '5px',
    boxShadow: '2px 2px 10px rgb(0 0 0 / 10%)',
    transition: 'all 0.4s cubic-bezier(0.65, 0.05, 0.36, 1)',
    position: 'relative',
    pointerEvents: 'auto',
  },
  courierCountAreaWrapper: {
    display: 'block',
    position: 'relative',
    zIndex: 200,
    background: '#f5f5f5',
    borderRadius: '5px',
    padding: '8px',
  },
  collapsed: { marginRight: '-302px', right: '-302px' },
  table: { backgroundColor: '#fafafa' },
  innerWrapper: {
    maxHeight: '501px',
    overflowY: 'scroll',
    margin: '2px 2px',
    '& > div:not(:last-child)': { marginBottom: '10px' },
  },
});
