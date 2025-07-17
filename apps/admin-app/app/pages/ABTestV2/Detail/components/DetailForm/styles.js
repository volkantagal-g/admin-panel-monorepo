import { createUseStyles } from 'react-jss';

export default createUseStyles({
  marginBottom: { marginBottom: '24px' },
  button: { marginRight: '8px' },
  cardHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  dividerHorizontal: {
    margin: '10px 0 !important',
    '& .ant-divider-horizontal': { margin: '10px 0 !important' },
  },
  selectTitle: {
    marginBottom: '5px important',
    width: '120px',
    fontSize: '12px',
    fontWeight: 600,
  },
  conclusionDescriptionAlert: { marginBottom: '10px', fontSize: '13px' },
  excludeDateButton: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0px !important',
  },
  spin: { textAlign: 'center', margin: '50px' },
  alert: {
    padding: '2px 10px !important',
    marginBottom: '10px',
    width: 'fit-content',
  },
  tooltip: { marginLeft: '10px' },
  row: { marginBottom: '16px', display: 'flex', alignItems: 'flex-start' },
  label: { fontSize: '12px !important' },
  rangepicker: {
    width: '100%',
    minHeight: '48px !important',
    borderRadius: '6px',
  },
  userSelect: {
    '& .ant-select-selector': {
      minHeight: '40px !important',
      borderRadius: '6px !important',
    },
  },
  editSaveCancelButtonsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  addButton: { marginLeft: '0px !important' },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0px !important',
    marginRight: '30px !important',
  },
  experimentMotivation: {
    borderRadius: '6px !important',
    marginBottom: '0px !important',
    '& .ql-toolbar': { paddingTop: '10px !important' },
  },
  completeEditor: { marginBottom: '10px', '& .flabel': { fontSize: '15px !important' } },
  completeEditorWrapper: { display: 'flex', flexDirection: 'column' },
  disabledTextEditor: { '& .ql-editor': { paddingTop: '12px !important' } },
});
