import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  title: {
    color: primary,
    fontSize: 22,
    paddingTop: 5,
    fontWeight: 600,
  },
  subTitle: {
    color: primary,
    fontSize: 20,
    paddingTop: 5,
    fontWeight: 500,
  },
});
