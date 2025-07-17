import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  form: {
    margin: '16px',
    paddingTop: '16px',
    '& .ant-select-arrow': { top: '38%', right: '18px' },
    '& .ant-select-selector': { borderRadius: '8px' },
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textInput: {
    padding: '12px',
    height: '48px',
    borderRadius: '8px',
  },
  inputWrapper: {
    marginBottom: 0,
    '& .ant-input::placeholder': {
      color: colors.textLight,
      fontSize: '14px',
    },
  },
  button: {
    display: 'flex',
    gap: '8px',
    backgroundColor: colors.backgroundImage,
    padding: '12px',
    borderRadius: '8px',
    height: 'auto',
    width: 'auto',
    justifySelf: 'flex-end',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.textDark,
    background: 'none',
    fontSize: '12px',
    padding: 0,
  },
  menu: {
    boxShadow: `0px 2px 6px -1px ${colors.boxShadowLight}, 0px 8px 24px -4px ${colors.boxShadowDark}`,
    borderRadius: '8px',
    padding: '4px',
    width: '220px',
    '& .ant-dropdown-menu-item': { padding: '12px' },
  },
  image: {
    height: '18px',
    width: '18px',
  },
  tableControl: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
  },
  searchCol: { maxWidth: '300px' },
  filterCol: { maxWidth: '200px' },
});
