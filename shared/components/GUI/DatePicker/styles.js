import { createUseStyles } from 'react-jss';

import { guiTheme, placeholder, primary, primaryText } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  datepicker: {
    ...guiTheme.common.inputStyles,
    minWidth: '160px',
    width: '100%',
    padding: props => (props?.label ? '24px 12px 6px' : '6px 12px'),
    '& .ant-picker-input': {
      '& input': {
        '&::placeholder': { color: placeholder },
        order: 2,
        color: primaryText,
        ...guiTheme.common.inputStyles,
      },
      '& .ant-picker-suffix': { order: 1, marginLeft: 0, marginRight: '10px' },
    },
  },
  icon: { color: primary, fontSize: '16px' },
});
