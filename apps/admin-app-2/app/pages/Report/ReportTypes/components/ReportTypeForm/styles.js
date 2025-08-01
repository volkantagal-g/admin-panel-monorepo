import { createUseStyles } from 'react-jss';

export default createUseStyles({
  form: {
    backgroundColor: 'white',
    padding: '6px 12px',
    '&  .ant-form-item': { marginBottom: '12px' },
    '& .ant-checkbox': { outline: '2px solid gray' },
  },
  formItem: { '& label ': { fontWeight: 'bold' } },
  editModeButtons: { '& > *': { marginRight: '5px' } },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  parametersHeader: { width: '100%' },
  parameterBox: {
    padding: '2px',
    border: '2px solid gray',
    borderRadius: '4px',
    '& .ant-form-item': { marginBottom: '12px' },
  },
  parameterHeader: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  addParameterBox: {
    border: '2px dashed gray',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  dropDownOptionsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
