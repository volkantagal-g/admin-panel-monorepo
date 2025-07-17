import { createUseStyles } from 'react-jss';

export default createUseStyles({
  form: {
    '& .ant-form-item-label': { fontWeight: 'bold' },
    '& .ant-divider-horizontal': { margin: '8px 0 12px 0' },
    '& .ant-form-item': { margin: '0' },
    '& .ant-input, & .ant-alert, & .ant-form-item-control-input-content, & .ant-input-number-affix-wrapper, & .ant-input-number':
      { borderRadius: '8px' },
    ' & .ant-select-selector': { borderRadius: '8px !important' },
    '& .ant-input-number:has(div.ant-input-number-group-addon)': {
      borderTopRightRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
    },
    '& .ant-input-number-prefix': { color: '#5D3EBC', fontWeight: 600 },
    '& .ant-form-item-explain': { marginTop: '4px' },
    '& .ant-col-24.ant-form-item-label': { padding: 0 },
    '& .ant-alert': { marginBottom: '12px' },
    '& .ant-alert-icon': { marginRight: '12px' },
    '& .ant-typography-info': { color: '#5D3EBC' },
    '& .ant-input-number-group-addon': { color: '#5D3EBC', fontWeight: 600, borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
    '& .ant-radio-group': { width: '100%' },
    '& .ant-radio-group-solid': {
      display: 'flex',
      borderRadius: '8px',
      backgroundColor: '#F6F6F6',
      '& .ant-radio-button-wrapper': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
        flex: 1,
        textAlign: 'center',
        overflowY: 'auto',
        border: 'none',
        padding: 0,
        color: '#697488',
        span: { padding: '7px 16px' },
      },
      '& .ant-radio-button-wrapper-checked': {
        '&, &:hover': {
          background: '#5D3EBC !important',
          borderColor: '#5D3EBC !important',
          color: '#FFFFFF !important',
        },
      },
    },
  },
  buttonStyle: {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: '0 5px',
  },
  radioButton: {
    '& .ant-radio-button-wrapper': {
      width: '155px',
      height: '70px',
      margin: '10px',
      textAlign: 'center',
      lineHeight: '60px',
      overflowY: 'auto',
      borderLeftWidth: '1px',
      '& span': {
        lineHeight: '1.5',
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    },
    '& .ant-radio-button-wrapper-checked': {
      '&:hover': {
        background: '#5D3EBC !important',
        borderColor: '#5D3EBC !important',
      },
    },
  },
  mainReason: {
    '& .ant-collapse-header': { fontSize: '16px' },
    '& .ant-collapse-content-box': { padding: '0' },
  },
});
