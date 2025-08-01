import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  modal: {
    '& .ant-modal-content': {
      borderRadius: '12px',
      padding: '24px',
    },
    '& .ant-modal-header': {
      padding: 0,
      marginBottom: '16px',
      border: 'none',
    },
    '& .ant-modal-body': {
      padding: 0,
      marginBottom: '24px',
    },
    '& .ant-modal-footer': {
      padding: 0,
      border: 'none',
      marginTop: '24px',
    },
    '& .ant-checkbox-group': {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      '& .ant-checkbox-wrapper': {
        marginLeft: 0,
        marginInlineStart: 0,
        '& + .ant-checkbox-wrapper': { marginLeft: 0 },
      },
    },
    '& .ant-modal-title': {
      color: colors.purple,
      fontSize: '16px',
      fontWeight: 700,
      textAlign: 'center',
    },
  },
  modalSubtitle: {
    fontSize: '14px',
    color: colors.iconGray,
    marginBottom: '24px',
  },
  modalColumnsCheckboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '& .ant-checkbox-wrapper': {
      marginInlineStart: '0',
      marginLeft: '0',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  cancelButton: {
    padding: '14px',
    height: 'auto',
    borderRadius: '8px',
    fontWeight: 400,
  },
  submitButton: {
    padding: '14px',
    height: 'auto',
    borderRadius: '8px',
    fontWeight: 400,
    backgroundColor: colors.purple,
    '&:hover': { backgroundColor: colors.purpleHover },
    '&:active': { backgroundColor: colors.purpleActive },
  },
  deleteButton: {
    padding: '14px',
    height: 'auto',
    borderRadius: '8px',
    fontWeight: 400,
    backgroundColor: colors.red,
    '&:hover': { backgroundColor: colors.redHover },
    '&:active': { backgroundColor: colors.redActive },
  },
  input: {
    padding: '12px',
    height: '48px',
    borderRadius: '8px',
  },
});
