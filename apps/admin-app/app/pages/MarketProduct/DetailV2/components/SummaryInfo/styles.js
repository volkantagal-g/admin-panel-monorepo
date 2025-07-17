import { createUseStyles } from 'react-jss';

import { guiTheme, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  productName: {
    color: primaryText,
    fontWeight: 600,
    fontSize: 17,
  },
  image: {
    border: guiTheme.borders.imageBorder,
    padding: 5,
    height: 85,
    width: 85,
  },
});
