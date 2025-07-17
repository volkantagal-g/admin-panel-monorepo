import { createUseStyles } from 'react-jss';

import { guiTheme, inactive, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  table: {
    '& table': {
      border: guiTheme.borders.divider,
      fontSize: '14px',
      '& th': {
        backgroundColor: inactive,
        color: primaryText,
        borderBottom: 'none',
        padding: '24px 12px',
        fontWeight: 400,
        '&:before': { display: 'none' },
      },
      '& .ant-table-tbody > tr > td': { borderBottom: guiTheme.borders.divider },
      '& .ant-table-tbody > tr:last-child > td': { borderBottom: 'none' },
      '& tr': {
        '& td': {
          color: primaryText,
          padding: '16px 12px',
          fontWeight: 400,
          '&:before': { display: 'none' },
        },
      },
    },
  },
});
