import { createUseStyles } from 'react-jss';

import { primaryText, primary, disabledBg } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  percentageInput: {
    borderRadius: '6px',
    width: '100%',
    '& .ant-input-number': {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      color: primaryText,
      '& .ant-input-number-input-wrap': { paddingTop: props => (props?.label ? '16px' : '10px') },
    },
    '& .ant-input-number-handler-wrap': { display: 'none', backgroundColor: disabledBg },
    '& .ant-input-number-prefix': {
      padding: '0px 14px',
      color: primary,
      fontSize: '14px',
      fontWeight: 600,
      order: 1,
    },
  },
});
