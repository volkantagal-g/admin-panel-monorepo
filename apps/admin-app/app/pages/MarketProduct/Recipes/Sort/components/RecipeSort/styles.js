import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    cardBorder: { border: `1px solid ${theme.color.primary} !important` },
    title: {
      fontSize: '14px',
      marginTop: '5px',
      textAlign: 'center',
      height: '80px',
      lineHeight: '20px',
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    buttonSpace: { marginTop: '35px' },
    button: { margin: '0px 5px' },
    image: { '& img': { height: '150px', objectFit: 'cover' } },
    sortableHelper: { zIndex: [10000, '!important'] },
  };
});
