import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles({
  root: {
    position: 'fixed',
    width: '100%',
    left: 0,
    right: 0,
    zIndex: SIDEBAR_Z_INDEX + 1,
  },
});
