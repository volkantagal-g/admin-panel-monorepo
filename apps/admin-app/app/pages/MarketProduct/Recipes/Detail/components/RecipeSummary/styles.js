import { createUseStyles } from 'react-jss';

import { guiTheme, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles(theme => {
  return {
    productName: {
      color: primaryText,
      fontWeight: 600,
      fontSize: 17,
    },
    image: {
      border: guiTheme.borders.imageBorder,
      padding: 5,
      height: '85px',
      width: '85px',
      objectFit: 'cover',
    },
    warningIcon: {
      color: theme.color.status.warning,
      fontSize: '24px',
    },
    errorIcon: {
      color: theme.color.status.danger,
      fontSize: '24px',
    },
    successIcon: {
      color: theme.color.status.success,
      fontSize: '24px',
    },
  };
});
