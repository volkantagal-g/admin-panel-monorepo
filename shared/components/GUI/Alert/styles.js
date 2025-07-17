import { createUseStyles } from 'react-jss';

import { danger, active, primary, ternary } from '../styles/guiThemes';

const typeColorMap = {
  success: active,
  info: primary,
  warning: ternary,
  error: danger,
};

export default createUseStyles({
  root: props => ({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
    borderWidth: 0,
    borderRadius: 8,
    padding: '8px 16px 8px 24px',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 8,
      height: '100%',
      backgroundColor: typeColorMap[props.type],
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
  }),
});
