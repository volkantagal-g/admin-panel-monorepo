import { createUseStyles } from 'react-jss';

import { guiTheme, inactive, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  table: props => ({
    '& .ant-table-title': {
      background: props.title && !props.isBorderRounded ? guiTheme.colors.page_background.backgroundColor : 'inherit',
      padding: '16px 0',
    },
    '& .ant-table-title + .ant-table-container table > thead > tr:first-child th:last-child': { borderTopRightRadius: props.isBorderRounded ? 8 : 0 },
    '& .ant-table-title + .ant-table-container table > thead > tr:first-child th:first-child': { borderTopLeftRadius: props.isBorderRounded ? 8 : 0 },
    '& .ant-table-footer': { background: props.isBEPaginationAvailable ? guiTheme.colors.page_background.backgroundColor : 'inherit' },
    '& table': {
      border: guiTheme.borders.divider,
      borderRadius: props.isBorderRounded ? 8 : 0,
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
          padding: guiTheme.size[props.size]?.table ?? '8px 12px',
          fontWeight: 400,
          '&:before': { display: 'none' },
        },
      },
    },
  }),
});
