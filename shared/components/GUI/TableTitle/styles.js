import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles(theme => {
  return {
    title: {
      color: primaryText,
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      margin: 0,
    },
    subTitle: { color: theme.color.secondaryText },
    tableHeaderControl: { margin: 'auto 0' },
    iconButton: theme.iconButton.type1,
  };
});
