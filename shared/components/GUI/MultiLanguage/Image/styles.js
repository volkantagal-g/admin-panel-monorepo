import { createUseStyles } from 'react-jss';

import { guiTheme } from '../../styles/guiThemes';

export default createUseStyles({
  borderedContainer: {
    border: guiTheme.borders.divider,
    borderRadius: '6px',
    padding: 13,
  },

  countryLanguage: { ...guiTheme.common.countryLanguageText },
});
