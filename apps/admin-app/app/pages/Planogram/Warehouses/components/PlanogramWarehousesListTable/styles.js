import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  menu: {
    color: primary,
    fontSize: 22,
    fontWeight: 600,
  },
  listButton: { width: '90px !important' },
});
