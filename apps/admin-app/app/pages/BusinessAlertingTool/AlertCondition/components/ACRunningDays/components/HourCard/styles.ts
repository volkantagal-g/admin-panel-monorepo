import { createUseStyles } from 'react-jss';

export default createUseStyles({
  hourCard: {
    background: '#F0F1F3',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90px',
    height: '30px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none',

    '&:active': {
      background: '#F3F0FE',
      border: '1px solid #5D3EBC',
      color: '#5D3EBC',
    },
  },
  disabled: { pointerEvents: 'none' },
  cursorNotAllowed: { cursor: 'not-allowed', opacity: 0.7 },
});
