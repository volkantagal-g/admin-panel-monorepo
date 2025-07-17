import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  radio: {
    fontSize: '14px',
    // alignItems: 'self-end',
    alignItems: 'center',
    color: primaryText,
    '& .ant-radio-inner': {
      width: '24px',
      height: '24px',
      '&::after': {
        width: '32px',
        height: '32px',
        marginTop: '-16px',
        marginLeft: '-16px',
      },
    },
  },
});
