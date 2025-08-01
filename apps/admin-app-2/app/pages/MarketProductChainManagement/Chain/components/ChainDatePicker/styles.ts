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
  pickerWrapper: {
    position: 'relative',
    width: '100%',
    '& .ant-picker': {
      width: '100%',
      border: `1px solid ${grey}`,
      height: '48px !important',
      display: 'flex',
      padding: '5px 30px 4px 12px !important',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      alignItems: 'center',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      '&:hover': { borderColor: primary },
      '& .ant-picker-input': {
        flex: 1,
        '& input': {
          fontSize: '14px',
          color: primaryText,
          height: '28px',
          lineHeight: '24px',
          padding: '16px 0 0 0',
          '&::placeholder': { color: 'transparent' },
        },
      },
      '& .ant-picker-suffix': {
        color: primary,
        fontSize: '16px',
      },
      '&.ant-picker-focused': {
        borderColor: `${primary} !important`,
        boxShadow: `0 0 0 2px ${secondary}`,
      },
    },
  },
  datePicker: { width: '100%' },
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
