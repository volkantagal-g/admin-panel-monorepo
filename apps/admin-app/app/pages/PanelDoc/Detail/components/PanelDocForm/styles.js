import { createUseStyles } from 'react-jss';

export default createUseStyles({
  form: {
    width: '100%',
    padding: '2px 4px',
    backgroundColor: '#fff',
    '& label': { fontWeight: 'bold' },
    '@media (max-width: 768px)': { '& .ant-form-item': { marginBottom: '5px' } },
  },
  buttonWrapper: { margin: '25px 3px' },
  card: {
    border: '1px solid #c4b9b9',
    borderRadius: '2px',
    margin: '2px auto',
    '& .ant-card-head-title': { fontWeight: 'bold' },
    '& .ql-container.ql-snow': { border: 'none' },
  },
  pageTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > span': {
      padding: '16px 24px',
      color: '#58666E',
      fontWeight: 500,
      fontSize: 14,
    },
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'end',
    '& > *': { margin: '0 8px' },
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    alignItems: 'center',
  },
  filesRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '2px',
    padding: '0.5rem',
  },
  faqsRow: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '2px',
    padding: '0.5rem',
    width: '100%',
    marginBottom: '5px',
    '& .ant-form-item': { marginBottom: '8px' },
  },
  question: {
    display: 'flex',
    '& > *': { margin: '0 5px' },
  },
  fileFormItem: {
    '&  .ant-form-item-control-input-content': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  formFileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  formFileInput: {
    height: 32,
    padding: '2.6px 11px',
  },
  tableFileName: {
    maxHeight: '3.4rem',
    overflow: 'hidden',
    display: 'block',
  },
  buttonTableRow: {
    border: 'none',
    padding: '0!important',
  },
  addTableRowButton: {
    borderRadius: '50%',
    position: 'absolute',
    left: -24,
    padding: '1.6px 5px',
  },
  highlightContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  highlightButton: {
    background: '#FFD10D',
    color: '#5D3EBC',
    border: 'none',
    '&:hover': { background: '#FFE886' },
  },
  highlightExpiryDate: {
    fontSize: 11,
    marginBottom: -15,
  },
});
