import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    customTableWrapper: {
      padding: '10px 0',
      '& .ant-table-title': {
        padding: '8px',
        backgroundColor: theme.color.background,
        borderBottom: theme.border.type1,
      },
      '& .ant-table-row:nth-child(odd)': { backgroundColor: theme.color.offWhite },
      '& .ant-table-footer': { backgroundColor: theme.color.background },
    },
  };
});
