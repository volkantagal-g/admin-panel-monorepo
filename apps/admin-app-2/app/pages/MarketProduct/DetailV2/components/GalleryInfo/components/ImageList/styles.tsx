import { createUseStyles } from 'react-jss';

import { guiTheme, inactive, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  table: () => ({
    '&.ant-table-wrapper': {
      border: guiTheme.borders.divider,
      borderRadius: 8,
      overflow: 'auto',
    },
    '& table': {
      fontSize: '14px',
      '& th': {
        backgroundColor: inactive,
        color: primaryText,
        padding: '24px 16px',
        fontWeight: 400,
        '&:before': { display: 'none' },
        borderBottom: guiTheme.borders.divider,
      },
      '& .ant-table-tbody > tr > td': { borderBottom: guiTheme.borders.divider },
      '& .ant-table-tbody > tr:last-child > td': { borderBottom: 'none' },
      '& tr': {
        '& button': {
          marginLeft: '.2em',
          '&:first-of-type': { marginLeft: 0 },
        },
        '& td': {
          color: primaryText,
          fontWeight: 400,
          '&:before': { display: 'none' },
        },
      },
    },
  }),
});
