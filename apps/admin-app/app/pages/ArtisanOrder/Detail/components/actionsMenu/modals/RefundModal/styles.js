import { createUseStyles } from 'react-jss';

export default createUseStyles({
  modal: { '& .ant-modal-footer': { display: 'none' } },
  table: {
    marginTop: 32,

    '& .ant-table-cell': { maxWidth: 0 },

    '& .ant-table-footer': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 24,
      fontSize: 14,
      lineHeight: '24px',
    },

    '& .ant-table-row-expand-icon': { display: 'none' },
  },
  product: { maxWidth: 220 },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  content: { width: '100%' },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  banner: { marginTop: 32, fontSize: 14 },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    padding: [12, 24],
    width: '100%',
    height: 80,
  },
  steps: {
    width: 396,
    userSelect: 'none',

    '& div[role="button"]': { cursor: 'unset !important' },
  },
  step2: {
    marginTop: 32,

    '& .ant-radio-wrapper': { fontSize: 13 },
  },
  labelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 21,

    '&:first-child': { marginTop: 0 },
  },
  label: {
    fontWeight: 600,
    fontSize: 14,
  },
  helperText: { marginTop: 12, fontSize: '14px !important' },
  timeSlotSelection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 21,
    marginTop: 21,
  },
  spacerV480: {
    width: 0,
    height: 100,
  },
});
