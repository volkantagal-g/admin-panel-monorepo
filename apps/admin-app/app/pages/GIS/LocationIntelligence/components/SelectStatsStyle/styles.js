import { createUseStyles } from 'react-jss';

export default createUseStyles({
  radioWrapper: { width: '100%' },
  radioButton: {
    width: '100%',
    marginBlock: '2px',
    height: '32px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '@media (max-width: 1600px)': {
      '&:hover': {
        textOverflow: 'unset',
        '& span': {
          animation: '$scrollText 2s linear infinite',
          position: 'relative',
          left: 0,
        },
      },
    },
  },
  '@keyframes scrollText': {
    '0%': { left: 0 },
    '100%': { left: '-50%' },
  },
});
