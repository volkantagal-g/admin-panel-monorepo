import { createUseStyles } from 'react-jss';

import { guiTheme } from '../styles/guiThemes';

export default createUseStyles({
  tagItem: {
    color: props => guiTheme.colors[props.color].color,
    backgroundColor: props => guiTheme.colors[props.color].backgroundColor,
    padding: props => guiTheme.size[props.size].tag.padding,
    borderColor: props => guiTheme.colors[props.color].borderColor,
    borderRadius: '6px',
    fontSize: props => guiTheme.fontSize[props?.size]?.tag?.fontSize ?? '12px',
    fontWeight: 600,
    lineHeight: '16px',
  },
});
