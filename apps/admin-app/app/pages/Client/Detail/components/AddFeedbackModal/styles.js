import { createUseStyles } from 'react-jss';

export default createUseStyles({
  sourceBtn: {
    width: '100%',
    height: '70px',
  },
  feedbackBtn: {
    width: '100%',
    height: '70px',
    whiteSpace: 'initial',
  },
  btnGreen: {
    backgroundColor: '#23AD44',
    borderColor: '#23AD44',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#23AD44',
      borderColor: '#23AD44',
      color: '#FFF',
    },
  },
  resetFormItemMargin: { '&>.ant-row>.ant-col>.ant-form-item': { marginBottom: '0 !important' } },
});
