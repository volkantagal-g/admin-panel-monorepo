import { createUseStyles } from 'react-jss';

import { guiTheme } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  image: {
    border: guiTheme.borders.imageBorder,
    padding: 5,
    height: 85,
    width: 85,
  },
  productName: { margin: 20 },
});
