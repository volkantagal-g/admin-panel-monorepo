import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: { width: '100%' },
  refundChecked: { marginBottom: '10px' },
  refundSection: { marginTop: '16px', '& .ant-radio-group': { paddingLeft: '32px' } },
  refundTypeSection: { marginBottom: '12px' },
  partialRefundAmount: {
    '& .ant-form-item-label': { display: 'none' },
    '& .ant-form-item': { marginBottom: '12px' },
    '& .ant-form-item-has-error': { marginBottom: '0px' },
    '& .ant-input-number-group-wrapper': {
      width: '90px',
      marginRight: '8px',
    },
    display: 'flex',
  },
  maxAmountInfo: { fontSize: '14px', lineHeight: '32px', marginLeft: '8px' },
  errorMessageRight: { '& .ant-form-item-explain-error': { textAlign: 'right' } },
  refundRadioInput: {
    display: 'flex',
    justifyContent: 'space-between',
    '& label': {
      flex: '0 0 48%',
      background: '#F6F6F6',
      borderRadius: '8px',
      padding: '8px 12px !important',
      '&.ant-radio-wrapper-checked': {
        background: '#F3F0FE',
        color: '#5D3EBC',
      },
      '& span:not(.ant-radio)': {
        fontSize: '14px',
        fontWeight: 600,
      },
    },
  },
});
