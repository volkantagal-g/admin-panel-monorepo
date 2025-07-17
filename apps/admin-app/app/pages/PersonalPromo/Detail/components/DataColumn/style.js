import { createUseStyles } from 'react-jss';

export default createUseStyles({
  columnGroup: {
    '&:first-of-type': { paddingTop: 0 },
    display: 'flex',
    alignItems: 'center',
    padding: '12px 8px',
    borderBottom: '1px solid #f0f2f5',
  },
  fieldTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '20px',
    flex: '0.1',
  },
  fieldValue: {
    fontSize: '14px',
    flex: '0.2',
    '& .ant-tag': {
      fontSize: '14px',
      padding: '6px 11px',
    },
  },
  actionsContainer: {
    display: 'flex',
    gap: '6px',
    flex: '0.2',
  },
});
