import { createUseStyles } from 'react-jss';

import { primaryText, white, danger } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  space: props => {
    return {
      position: 'relative',
      backgroundColor: white,
      borderRadius: '8px',
      boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      rowGap: '24px',
      padding: '24px',
      marginBottom: '24px',
      '& .ant-badge': {
        position: 'absolute',
        right: '-8px',
        top: '-8px',
      },
      ...(props.hasDangerBorder ? { border: `2px solid ${danger}` } : undefined),
    };
  },
  title: {
    color: primaryText,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    margin: 0,
  },
});
