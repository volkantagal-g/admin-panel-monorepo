import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    wrapper: { marginBottom: 10 },
    card: {
      '& .ant-card-head': {
        backgroundColor: theme.color.lightGray,
        padding: `0 ${theme.spacing(3)}px`,
        minHeight: 'unset',
        height: theme.height.headerAndFooter,
      },
      '& .ant-card-head-wrapper': { height: 'inherit' },
      '& .ant-card-head-title': {
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px 0px`,
      },
      '& .ant-card-body': { padding: theme.spacing(3) },
    },
    cardFooter: {
      borderTop: theme.border.type1,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: `0 ${theme.spacing(3)}px`,
      backgroundColor: theme.color.lightGray,
      minHeight: theme.height.headerAndFooter,
    },
  };
});
