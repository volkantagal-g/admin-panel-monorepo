import { createUseStyles } from 'react-jss';

import { guiTheme } from '../styles/guiThemes';

export default createUseStyles({
  button: props => ({
    color: guiTheme.colors[props.color].color,
    backgroundColor: guiTheme.colors[props.color].backgroundColor,
    borderColor: guiTheme.colors[props.color].borderColor,
    padding: (props.doesHaveOnlyIcon ? guiTheme.size[props.size].button.doesHaveOnlyIconPadding : guiTheme.size[props.size].button.padding),
    boxShadow: (props.color === 'defaultWithoutBorder' ? 'none' : undefined),
    border: (props.noBorder ? 'none' : undefined),
    borderRadius: '8px',
    fontSize: guiTheme.fontSize[props?.size] ?? '14px',
    fontWeight: 700,
    lineHeight: '20px',
    height: 'fit-content',
    width: 'fit-content',
    '&:hover, &:focus': {
      color: guiTheme.colors[props.color].color,
      backgroundColor: guiTheme.colors[props.color].backgroundColor,
      borderColor: guiTheme.colors[props.color].borderColor,
    },
    '& img[alt="edit-icon"]': { marginBottom: '2px', marginRight: '12px', width: '12px' },
    '& img[alt="add-icon"]': { marginBottom: '2px', marginRight: '12px', width: '12px' },
    ...(props.noBackground ? {
      border: 'none',
      boxShadow: 'none',
      background: 'none',
      backgroundColor: 'none',
      padding: 'none',
      '&.ant-btn[disabled]': { background: 'none' },
      '&:hover, &:focus, &:visited': {
        color: guiTheme.colors[props.color].color,
        border: 'none',
        boxShadow: 'none',
        background: 'none',
      },
    } : undefined),
  }),
});
