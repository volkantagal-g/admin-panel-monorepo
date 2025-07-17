import { createUseStyles } from 'react-jss';

import { primaryText, primary, disabledBg } from '../styles/guiThemes';

export default createUseStyles({
  numberInput: {
    height: '48px',
    borderRadius: '6px',
    width: '100%',
    paddingTop: props => (props?.label ? '20px' : '10px'),
    '& .ant-input-number-input': {
      padding: '0px 12px 6px',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      color: primaryText,
    },
    '& .ant-input-number-handler-wrap': {
      right: '2px',
      opacity: '1',
      flexDirection: 'column',
      display: 'inline-flex',
      gap: '2px',
      padding: '2px 0px',
      backgroundColor: disabledBg,
    },
    '& .ant-input-number-handler': {
      backgroundColor: disabledBg,
      border: 'none',
      borderRadius: '4px',
      '& .ant-input-number-handler-up-inner,.ant-input-number-handler-down-inner': { color: primary, fontSize: '9px' },
    },
  },
});
