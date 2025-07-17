import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  headerWrapper: {
    width: '100%',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { color: primary },
});
