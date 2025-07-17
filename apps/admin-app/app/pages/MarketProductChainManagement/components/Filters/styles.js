import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  form: {
    padding: '24px',
    background: colors.backgroundWhite,
    borderRadius: '12px',
    boxShadow: `0 2px 8px ${colors.boxShadowLight}`,
    border: `1px solid ${colors.borderGray}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { boxShadow: `0 4px 12px ${colors.boxShadowLight}` },
  },
  filterRow: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
    margin: '0',
    '& > *': { padding: '0' },
  },
  searchCol: {
    flex: '2 1 320px !important',
    '& .ant-form-item': {
      margin: '0 !important',
      width: '100% !important',
    },
    '& .ant-input-affix-wrapper': {
      height: '48px !important',
      padding: '0 16px !important',
      borderRadius: '8px !important',
      border: `1px solid ${colors.borderGray}`,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderColor: `${colors.purple}`,
        boxShadow: `0 0 0 2px ${colors.purple}10`,
      },
      '&:focus, &-focused': {
        borderColor: `${colors.purple} !important`,
        boxShadow: `0 0 0 2px ${colors.purple}20 !important`,
      },
    },
    '& .ant-input': {
      height: '100% !important',
      fontSize: '14px !important',
      '&::placeholder': { color: `${colors.textLight} !important` },
    },
    '& .ant-form-item-control-input': { minHeight: '48px !important' },
  },
  filterCol: {
    flex: '1 1 200px !important',
    '& .ant-form-item': {
      margin: '0 !important',
      width: '100% !important',
    },
    '& .ant-select': {
      width: '100% !important',
      '& .ant-select-selector': {
        height: '48px !important',
        padding: '0 16px !important',
        borderRadius: '8px !important',
        display: 'flex !important',
        alignItems: 'center !important',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: colors.purple,
          boxShadow: `0 0 0 2px ${colors.purple}10`,
        },
      },
      '& .ant-select-selection-search': {
        height: '46px !important',
        display: 'flex !important',
        alignItems: 'center !important',
      },
      '& .ant-select-selection-overflow': { paddingTop: '10px !important' },
    },
  },
  tableControl: {
    marginLeft: 'auto',
    flex: '0 0 auto !important',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '48px !important',
    padding: '0 16px !important',
    borderRadius: '8px !important',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${colors.boxShadowLight}`,
    },
    '&:active': { transform: 'translateY(0)' },
  },
  menu: {
    boxShadow: `0 4px 16px ${colors.boxShadowLight}`,
    borderRadius: '12px',
    padding: '8px',
    border: `1px solid ${colors.borderGray}`,
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    color: colors.textDark,
    padding: '12px 16px',
    borderRadius: '6px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: `${colors.purple}10`,
      color: colors.purple,
    },
  },
  image: {
    width: '20px',
    height: '20px',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { transform: 'scale(1.1)' },
  },
});
