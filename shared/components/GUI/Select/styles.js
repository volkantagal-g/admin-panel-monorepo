import { createUseStyles } from 'react-jss';

import { primaryText, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  select: {
    minWidth: props => (props?.usage === 'table' ? '0px' : '150px'),
    color: primaryText,
    '& .ant-select-selector': {
      borderRadius: '6px !important',
      minHeight: '48px !important',
      '& .ant-select-selection-item': {
        borderRadius: '6px',
        fontSize: props => (props?.mode ? '12px' : '14px'),
        fontWeight: props => (props?.mode ? 600 : 400),
        lineHeight: '18px !important',
        marginTop: '0px',
        marginBottom: '0px',
        padding: props => (props?.mode ? '2px 6px' : '24px 0px 0px'),
        '& .ant-select-selection-item-content, .ant-select-selection-item-remove': {
          display: 'inline-flex',
          alignItems: 'center',
          '& .anticon-close': { display: 'flex' },
        },
        '& svg ': {
          fontSize: '10px',
          color: primaryText,
        },
      },
      '& .ant-select-selection-overflow':
        {
          paddingTop: props => (props?.label ? '20px' : '0px'),
          '& .ant-select-selection-overflow-item':
            { alignSelf: 'baseline' },
        },
      '& .ant-select-selection-search': { marginTop: props => (props?.mode ? '0px' : '18px') },
    },
    '& .ant-select-arrow': { color: primary },
  },
});
