import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  const maxWidth = 1600;

  return {
    form: {
      width: '250px',
      height: '100%',
      margin: '0 4px',
      backgroundColor: 'white',
      padding: '2px 4px',
      borderRadius: '4px',
      '& .ant-form-item': { marginBottom: '4px' },
    },
    [`@media (max-width:${maxWidth}px)`]: {
      form: {
        width: '180px',
        height: '100%',
      },
    },
    listForm: {
      composes: '$form',
      '& > *': { marginBottom: '15px' },
    },
    jsonView: {
      width: '100%',
      overflow: 'auto',
      minHeight: '200px !important',
      maxHeight: '300px !important',
    },
    label: { fontWeight: 'bold' },
    formTitle: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#5d3ebc' }, // getir purple
    goBackLink: { color: '#5d3ebc' },
    fullWidth: { width: '100%' },
    rightFloat: { position: 'relative', left: '20px' },
    addNewSaa: { display: 'block', margin: '0 auto 15px auto' },
    copyButton: { marginLeft: '10px' },
    searchContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
    },
    togglesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    searchButtonWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      '& > span': { fontSize: '12px' },
      '& > span > *': { marginRight: '2px' },
    },
  };
});
