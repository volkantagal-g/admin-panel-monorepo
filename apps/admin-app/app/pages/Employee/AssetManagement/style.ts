import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  pageContainer: { padding: '24px' },
  cardContainer: {
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
    borderRadius: '8px',
    padding: '22px',
    '& .ant-card-head': {
      padding: '2px',
      fontSize: 18,
      lineHeight: '24px',
      marginBottom: 12,
      '& .ant-card-head-title': { paddingTop: '2px' },
    },
    '& .ant-card-body': { padding: '4px' },
  },
  inputContainer: {
    borderRadius: '6px',
    '& .ant-select-selector': { borderRadius: '6px !important' },
  },
  buttonContainer: { borderRadius: '6px' },
  pageHeader: {
    paddingBottom: '24px',

    '& svg': {
      // @ts-ignore
      color: theme?.color?.primary,
      fontSize: '18px',
    },

    '& h4': {
      // @ts-ignore
      color: theme?.color?.primary,
      marginBottom: '6px',
      fontWeight: 600,
    },

    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
    '& button': { borderRadius: '6px', marginLeft: '12px' },
  },
  flexButton: { display: 'flex', alignItems: 'center' },
  tableContainer: { marginTop: '24px' },
  tableTag: { width: 50, textAlign: 'center' },
  controlNeededTableCell: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    color: 'white',
  },
  assignmentStatusTag: {
    height: 32,
    padding: '5px 16px',
    borderRadius: 6,
    marginLeft: 10,
  },
}));
