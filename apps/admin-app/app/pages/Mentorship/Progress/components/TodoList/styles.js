import { createUseStyles } from 'react-jss';

import { guiTheme } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  root: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  todoItem: {
    cursor: 'pointer',
    border: guiTheme.borders.divider,
    borderRadius: 8,
    padding: '16px 16px 12px 16px !important',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontWeight: 'normal',
    overflow: 'hidden',
  },
  checkbox: {
    alignItems: 'flex-start',
    width: '100%',
    '& span:nth-child(2)': {
      fontSize: 16,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  deadline: {
    marginLeft: 32,
    marginTop: -16,
    display: 'block',
    fontSize: 12,
  },
});
