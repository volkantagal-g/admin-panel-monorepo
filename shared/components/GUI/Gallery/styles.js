import { createUseStyles } from 'react-jss';

import { guiTheme, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles(() => {
  return {
    galleryContainer: {
      padding: '24px !important',
      border: guiTheme.borders.galleryContainer,
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 600,
      '&:hover': { borderColor: primary },
    },
    textAlignCenter: { textAlign: 'center' },
    textAlignRight: { textAlign: 'right' },
    countryLanguageText: { ...guiTheme.common.countryLanguageText },
  };
});
