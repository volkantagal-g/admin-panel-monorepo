import { createUseStyles } from 'react-jss';

import { primary, primaryText, placeholder, grey, secondary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  wrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: 0,
  },
  formItem: {
    margin: 0,
    flex: 1,
    position: 'relative',
    '& .ant-form-item-control': {
      width: '100%',
      position: 'relative',
    },
  },
  selectWrapper: {
    position: 'relative',
    width: '100%',
    '& .ant-select': {
      width: '100%',
      '& .ant-select-selector': {
        border: `1px solid ${grey}`,
        height: 'initial !important',
        minHeight: '48px !important',
        display: 'flex',
        padding: '5px 30px 4px 12px !important',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        alignItems: 'flex-start',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        '&:hover': { borderColor: primary },
        '& .ant-select-selection-search': {
          position: 'relative',
          inset: 'auto !important',
          margin: '0 !important',
          padding: '0',
          marginTop: '16px',
          '& .ant-select-selection-search-input': {
            height: '24px',
            lineHeight: '24px',
          },
        },
        '& .ant-select-selection-placeholder': {
          position: 'absolute',
          top: '12px',
          left: '12px',
          color: placeholder,
          fontSize: '14px',
          lineHeight: '24px',
          transition: 'all 0.2s',
          margin: 0,
        },
        '& .ant-select-selection-overflow': {
          gap: '4px',
          display: 'flex',
          padding: '15px 0 0 0',
          flexWrap: 'wrap',
          '& .ant-select-selection-overflow-item': {
            flex: 'none',
            maxWidth: '100%',
          },
        },
        '& .ant-select-selection-item': {
          backgroundColor: secondary,
          borderRadius: '4px',
          color: primary,
          fontSize: '12px',
          lineHeight: '20px',
          height: '24px',
          padding: '2px 8px',
          margin: 0,
          display: 'inline-flex',
          alignItems: 'center',
          '& .anticon-close': {
            color: primary,
            fontSize: '10px',
            marginLeft: '6px',
          },
        },
      },
      '& .ant-select-arrow': {
        color: primary,
        fontSize: '12px',
        width: '12px',
        height: '12px',
        marginTop: -6,
        right: 12,
        top: '24px',
        transition: 'transform 0.2s',
      },
      '&.ant-select-focused, &.ant-select-open': {
        '& .ant-select-selector': {
          borderColor: `${primary} !important`,
          boxShadow: `0 0 0 2px ${secondary}`,
        },
      },
      '&.ant-select-open .ant-select-arrow': { transform: 'rotate(180deg)' },
    },
  },
  error: {
    '& .ant-select .ant-select-selector': { borderColor: '#ff4d4f !important' },
    '& .ant-select-focused .ant-select-selector': { boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2) !important' },
  },
  floatingLabel: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: placeholder,
    fontSize: '14px',
    lineHeight: '20px',
    pointerEvents: 'none',
    transition: 'all 0.2s',
    transformOrigin: 'left top',
    zIndex: 1,
  },
  floatingLabelActive: {
    top: 4,
    transform: 'scale(0.85)',
    color: primary,
  },
});
