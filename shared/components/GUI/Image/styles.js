import { createUseStyles } from 'react-jss';

import { guiTheme } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  imageBox: {
    border: guiTheme.borders.imageBorder,
    padding: '8px',
    borderRadius: '8px',
    width: 'fit-content',
  },
});
