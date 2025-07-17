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
    indicators: {
      textAlign: 'right',
      '& span': {
        display: 'inline-block',
        marginLeft: '.2em',
        '&:first-of-type': { marginLeft: 0 },
      },
    },
    countryLanguageText: { ...guiTheme.common.countryLanguageText },
    failIndicator: { color: guiTheme.colors.danger.color },
  };
});
