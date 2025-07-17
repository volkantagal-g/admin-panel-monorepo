import { createUseStyles } from 'react-jss';

import { primaryText, white } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  collapse: {
    borderRadius: '20px',
    marginBottom: '8px',
  },
  panel: { backgroundColor: white, paddingBlock: '8px' },
  title: {
    color: primaryText,
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
  },
});
