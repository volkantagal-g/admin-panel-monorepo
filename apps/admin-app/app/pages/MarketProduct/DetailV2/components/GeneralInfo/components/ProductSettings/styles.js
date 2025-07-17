import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  title: {
    color: primaryText,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    margin: 0,
  },
});
