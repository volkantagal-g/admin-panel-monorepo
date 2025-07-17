import { createUseStyles } from 'react-jss';

import { primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  checkbox: {
    display: props => !props?.centerForm && 'flex',
    alignItems: 'end',
    '& span:nth-child(2)': { fontSize: '14px', color: primaryText, lineHeight: '18px' },
    '& .ant-checkbox-inner': {
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      '&::after': { left: '27.75%' },
    },
    '& .ant-checkbox-checked::after': { borderRadius: '4px' },
  },
});
