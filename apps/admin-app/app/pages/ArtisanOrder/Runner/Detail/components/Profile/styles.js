import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    profileContainer: {
      borderRadius: '8px',
      overflow: 'hidden',
    },
    sectionContainer: {
      backgroundColor: theme.color.white,
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      padding: '24px',
      paddingTop: '30px',
      overflow: 'hidden',
    },
    statusBadge: ({ color }) => ({
      backgroundColor: color,
      borderRadius: '6px',
      margin: '0',
      padding: '7px 10px',
      fontWeight: '600',
      lineHeight: '16px',
    }),
    imgContainer: () => ({
      backgroundColor: 'gray',
      height: '320px',
      padding: '26px 24px',
    }),
    title: {
      color: 'rgba(255, 255, 255, 0.94)',
      fontSize: '22px',
      lineHeight: '26px',
    },
    statusSelectBox: { width: '100%' },
    smallText: {
      color: 'rgba(28, 48, 74, 0.5)',
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
    },
  };
});
