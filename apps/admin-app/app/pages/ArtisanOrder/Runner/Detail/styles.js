import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    sectionContainer: {
      backgroundColor: theme.color.white,
      borderRadius: '8px',
      padding: '24px',
      paddingTop: '30px',
      overflow: 'hidden',
    },
    sectionTitle: {
      color: '#192434',
      fontWeight: 'bolder',
    },
    label: {
      color: theme.color.primary,
      fontSize: '12px',
      lineHeight: '16px',
    },
    inputText: {
      color: 'rgba(24, 39, 57, 0.94)',
      fontSize: '14wpx',
      lineHeight: '16px',
    },
  };
});
