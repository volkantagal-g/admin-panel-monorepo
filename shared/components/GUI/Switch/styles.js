import { createUseStyles } from 'react-jss';

import { guiTheme } from '../styles/guiThemes';

export default createUseStyles({
  switch: {
    backgroundColor: props => guiTheme.colors[props.unCheckedColor].backgroundColor,
    minWidth: props => guiTheme.size[props.size].switch.minWidth,
    height: props => guiTheme.size[props.size].switch.height,
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '14px',
    '& .ant-switch-inner': {
      color: props => guiTheme.colors[props.unCheckedColor].color,
      margin: props => `0 2px 0 ${guiTheme.size[props.size].switch.circle}`,
      padding: '0 6px',
    },
    '&.ant-switch-checked': {
      backgroundColor: props => guiTheme.colors[props.checkedColor].backgroundColor,
      '& .ant-switch-handle': { left: props => `calc(100% - ${guiTheme.size[props.size].switch.circle} - 2px)` },
      '& .ant-switch-inner': {
        color: props => guiTheme.colors[props.checkedColor].color,
        margin: props => `0 ${guiTheme.size[props.size].switch.circle} 0 2px`,
      },
    },
    '& .ant-switch-handle': {
      width: props => guiTheme.size[props.size].switch.circle,
      height: props => guiTheme.size[props.size].switch.circle,
      '&::before': { borderRadius: '50%' },
    },
  },
});
