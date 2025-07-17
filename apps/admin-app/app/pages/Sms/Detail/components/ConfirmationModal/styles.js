import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collapse: {
    '& .ant-collapse-item': { marginBottom: '20px' },
    '& .ant-collapse-header ': { padding: '0px !important' },
    '& .ant-collapse-content-box': { padding: '15px 0px !important' },
  },
  '@keyframes slideRight': {
    '0%,40%,100%': { transform: 'translateY(0)' },
    '20%': { color: 'red', transform: 'translateY(-3px)' },
  },
  vawe: {
    display: 'inline-block',
    animation: '$slideRight 1500ms infinite ease',
    animationDelay: 'calc(.1s * var(--i))',
  },

});
