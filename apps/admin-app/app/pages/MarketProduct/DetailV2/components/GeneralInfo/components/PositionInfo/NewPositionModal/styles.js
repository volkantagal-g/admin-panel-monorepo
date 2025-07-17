import { createUseStyles } from 'react-jss';

import categoryActiveness from '@shared/styles/categoryActiveness';
import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles(theme => {
  return {
    ...categoryActiveness(theme),
    title: {
      color: primaryText,
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      margin: 0,
    },
  };
});
