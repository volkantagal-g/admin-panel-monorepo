import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    modal: { '& .ant-modal-content, & .ant-modal-header': { borderRadius: '20px' } },
    form: {
      '& .ant-form-item': { marginBottom: 0 },
      '& .ant-divider': { margin: '8px 0' },
      '& .ant-form-item-label > label': {
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
      },
      '& textArea': { borderRadius: '6px' },
    },
    buttonStyle: {
      display: 'block',
      width: '100%',
      border: 'none',
      padding: '0 5px',
    },
    tooltip: { '& button': { border: 'none' } },
    optionGroup: {
      '& label': {
        margin: '4px 0',
        display: 'flex',
        alignItems: 'center',
        '& span:first-child': { top: 'unset' },
        '& span:last-child': {
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '18px',
        },
      },
      '& .ant-radio-inner': {
        width: '24px',
        height: '24px',
        '&::after': { transform: 'scale(0.9)' },
      },
    },
    optionGroupBlock: {
      display: 'flex',
      '& label': { flex: '1 1 auto' },
    },
    selectedRequest: { fontSize: '14px' },
    modalButtonContainer: {
      width: '100%',
      '& > div': { flex: '1 1 auto' },
      '& button': { borderRadius: '10px' },
    },
  };
});
