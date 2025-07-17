import { createUseStyles } from 'react-jss';

export default createUseStyles({
  marginBottom: { marginBottom: '24px' },
  rangepicker: {
    width: '100%',
    minHeight: '48px !important',
    borderRadius: '6px',
  },
  row: { marginBottom: '16px', display: 'flex', alignItems: 'flex-start' },
  label: { fontSize: '12px !important' },
  experimentMotivation: {
    borderRadius: '6px !important',
    marginBottom: '0px !important',
  },
  addNewTestDomain: { fontSize: 13, fontWeight: 700, color: 'green' },
});
