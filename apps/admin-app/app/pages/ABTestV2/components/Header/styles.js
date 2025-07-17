import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  title: {
    color: primary,
    fontSize: 22,
    paddingTop: 5,
    fontWeight: 600,
  },
  wrapper: { marginBottom: '1rem !important' },
  contentStartPlacement: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    fontSize: '18px',
  },
  infoIcon: { color: '#5D3EBC' },
  link: { fontSize: 14, fontWeight: 700, margin: 5, textDecorationLine: 'underline' },
});
