import { createUseStyles } from 'react-jss';

import { grey, guiTheme, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  border: {
    border: guiTheme.borders.divider,
    borderRadius: '6px',
  },

  countryLanguage: {
    color: primary,
    fontWeight: 600,
  },

  divider: {
    backgroundColor: grey,
    marginTop: 0,
    marginBottom: 0,
  },

  borderedContainer: {
    border: guiTheme.borders.divider,
    borderRadius: '6px',
    padding: 13,
  },

  tableName: { fontSize: 15 },

  container: {
    '& .responsiveCol': { flexGrow: 3 },

    '&& .ant-tabs-nav::before': { border: 'none' },
    '&& .ant-tabs-nav-list': {
      ...guiTheme.colors.inactive,
      borderRadius: '6px',
    },
    '&& .ant-tabs-tab': {
      border: 'none',
      borderRadius: 'initial',
      backgroundColor: 'inherit',
    },

    '&&& .ant-tabs-tab-active': {
      ...guiTheme.colors.default,
      margin: 2,
      borderRadius: '6px',
    },

    '&& .ant-tabs-content': {
      ...guiTheme.common.inputStyles,
      height: 'initial',
      border: guiTheme.borders.divider,
    },
  },
});
