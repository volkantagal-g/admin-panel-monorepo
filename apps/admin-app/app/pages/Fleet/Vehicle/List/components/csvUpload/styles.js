import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    container: { width: '100%' },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      outline: '2px solid black',
      width: '80%',
      padding: '4px',
      margin: '0 auto',
      gap: 5,
    },
    label: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      margin: '0 auto',
      width: '100%',
    },
    span: { whiteSpace: 'nowrap' },
    uploadButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fileName: { margin: 'auto 10px', width: '75%' },
    uploadInput: { height: 0, width: 0, border: 'none', outline: 'none' },
    value: {
      height: 30,
      border: '1px solid gray',
      width: '100%',
    },
    modal: { '& .ant-modal-body': { minHeight: '80%' } },
    tabItemContainer: { marginTop: '1%' },
  };
});
