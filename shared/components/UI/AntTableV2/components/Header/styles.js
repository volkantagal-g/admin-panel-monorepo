import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    header: ({ loading, title, totalBadge }) => {
      return {
        height: theme.height.headerAndFooter,
        display: 'flex',
        justifyContent: title || totalBadge ? 'space-between' : 'flex-end',
        backgroundColor: theme.color.lightGray,
        borderBottom: theme.border.type1,
        alignItems: 'center',
        padding: `0 ${theme.spacing(3)}px`,
        opacity: loading ? 0.3 : 1,
        pointerEvents: loading ? 'none' : null,
      };
    },
    leftContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    rightContainer: { marginTop: 3 },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      width: '100%',
    },
    totalBadge: ({ title }) => {
      return { marginLeft: title ? 7 : null };
    },
    totalLabel: { marginLeft: 3 },
    iconButton: theme.iconButton.type1,
  };
});
