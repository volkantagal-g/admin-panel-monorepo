import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  columChild: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: '10px',
  },
  title: { lineHeight: '32px', color: primaryText },
  row: { '& .ant-row': { marginBottom: '16px' } },
});
