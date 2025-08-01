import { createUseStyles } from 'react-jss';

import theme from '@shared/jssTheme';

export default createUseStyles({
  commonTableContainer: {
    '& .ant-table-cell': {
      padding: '0px 8px',
      '@media (max-width: 1440px)': { fontSize: '14px' },
      '@media (min-width: 1441px) and (max-width: 1680px)': { fontSize: '16px' },
      '@media (min-width: 1681px)': { fontSize: '18px' },
    },
    '& .ant-table-footer': {
      '& *':
      {
        '@media (max-width: 1440px)': { fontSize: '14px' },
        '@media (min-width: 1441px)': { fontSize: '16px' },
      },
    },
  },
  tableTag: {
    '@media (max-width: 1440px)': { fontSize: '14px' },
    '@media (min-width: 1441px) and (max-width: 1680px)': { fontSize: '16px' },
    '@media (min-width: 1681px)': { fontSize: '18px' },
  },
  manipulatedDailyStatIcon: { color: theme.color.primary },
});
