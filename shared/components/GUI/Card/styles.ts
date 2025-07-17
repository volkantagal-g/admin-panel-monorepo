import { createUseStyles } from 'react-jss';

import { white, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  card: {
    backgroundColor: white,
    borderRadius: '8px',
    marginBottom: '12px',
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
  },
  title: {
    color: primaryText,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    margin: 0,
  },
});
