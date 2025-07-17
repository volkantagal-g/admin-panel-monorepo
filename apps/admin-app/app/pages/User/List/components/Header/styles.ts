import { createUseStyles } from 'react-jss';

export default createUseStyles({
  export: { marginLeft: '10px' },
  departmentSelect: { width: '160px' },
  actionButtons: {
    justifyContent: 'end',
    marginTop: '4rem',
    marginBottom: '0',

    '& .ant-form-item-control-input-content': {
      display: 'flex',
      justifyContent: 'end',
    },

    '& button': { marginLeft: '10px' },
  },
});
