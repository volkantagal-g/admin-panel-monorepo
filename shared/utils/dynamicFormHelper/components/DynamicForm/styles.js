import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  formContainer: { display: 'flex' },
  row: {
    flex: '1',
    margin: '10px',
    '&>div.ant-form-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '&>div>div.ant-form-item-label': {
      whiteSpace: 'unset',
      textAlign: 'left',
    },
    '&>div>div.ant-form-item-control': { width: '100%' },
    '&>div>div.ant-form-item-label>label': { fontWeight: '600' },
  },
  header: { padding: '10px' },
  buttonContainer: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
  button: { margin: '10px' },
  inputNumber: { width: '100% !important' },
}));
