import { createUseStyles } from 'react-jss';

import { primaryText, guiTheme } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  textInput: {
    ...guiTheme.common.inputStyles,
    padding: props => (props?.label ? '24px 12px 6px' : '6px 12px'),
    color: primaryText,
  },
});
