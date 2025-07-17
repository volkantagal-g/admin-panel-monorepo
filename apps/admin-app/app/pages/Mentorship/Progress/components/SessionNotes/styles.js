import { createUseStyles } from 'react-jss';

import { guiTheme, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  root: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sessionNoteItem: {
    cursor: 'pointer',
    border: guiTheme.borders.divider,
    borderRadius: 8,
    padding: '12px 16px 12px 16px !important',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'normal',
    gap: 8,
  },
  icon: { fontSize: 24 },
  textWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    overflow: 'hidden',
  },
  note: {
    margin: 0,
    fontSize: 16,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: primaryText,
    width: '100%',
  },
  date: {
    display: 'block',
    fontSize: 12,
  },
});
