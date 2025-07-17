import { createUseStyles } from 'react-jss';

import { primaryText, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  search: {
    height: '48px',
    borderRadius: '6px',
    '& .ant-input-prefix': {
      padding: ' 0px 4px 0px 0px',
      color: primary,
      '& svg': {
        width: '16px',
        height: '16px',
      },
    },
    '& input': {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      color: primaryText,
    },
  },
});
