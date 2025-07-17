import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    iconButton: theme.iconButton.type1,
    container: { marginBottom: 10 },
    table: {
      touchAction: 'none',
      width: '100%',
      '& table': { width: '100% !important' },
      '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    },
  };
});
