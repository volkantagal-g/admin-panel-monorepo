import { createUseStyles } from 'react-jss';

import { guiTheme, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  rangepicker: {
    ...guiTheme.common.inputStyles,
    minWidth: '160px',
    width: '100%',
    padding: props => (props?.label ? '24px 12px 6px' : '6px 12px'),
  },
  icon: { color: primary, fontSize: '16px' },
});
