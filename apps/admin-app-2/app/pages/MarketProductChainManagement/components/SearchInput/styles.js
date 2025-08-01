import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  textInput: {
    height: '48px',
    width: '100%',
    borderRadius: '8px',
    padding: '0 12px',
    fontSize: '14px',
    '& input': {
      height: '100%',
      fontSize: '14px',
    },
    '&.ant-input-affix-wrapper': {
      padding: '0 12px',
      '& .ant-input-prefix': { marginRight: '8px' },
      '& .ant-input': { fontSize: '14px' },
    },
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 0,
    '& .ant-form-item-control-input': { minHeight: '48px' },
    '& .ant-input-affix-wrapper': { padding: '0 12px' },
    '& .ant-input::placeholder': {
      color: colors.textLight,
      fontSize: '14px',
    },
  },
  searchCol: { maxWidth: '300px' },
  filterCol: { maxWidth: '200px' },
});
