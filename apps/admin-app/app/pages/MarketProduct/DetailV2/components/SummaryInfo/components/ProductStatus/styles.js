import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  title: {
    color: primaryText,
    fontSize: '17px',
    fontWeight: 600,
    textAlign: 'end',
  },
});
