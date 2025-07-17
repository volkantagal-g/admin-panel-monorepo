import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    col: { padding: '0 6px' },
    card: {
      '& .ant-card': { height: '100%' },
      '& .ant-card-body': { height: '100%' },
      height: '100%',
    },
    datePicker: { marginBottom: '24px' },
    tooltip: { marginLeft: '4px' },
    excelButtonColumn: { marginLeft: 'auto', marginTop: '12px' },
  };
});
