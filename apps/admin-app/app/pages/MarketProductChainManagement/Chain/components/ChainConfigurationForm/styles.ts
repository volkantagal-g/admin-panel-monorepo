import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: { padding: '24px' },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#1D1B20',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#49454F',
    marginBottom: '32px',
  },
  form: { width: '100%' },
  section: {
    marginBottom: '32px',
    '&:last-child': { marginBottom: 0 },
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#1D1B20',
    marginBottom: '16px',
  },
  dateInputs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  datePicker: { width: '100%' },
  configInputs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    '& .ant-form-item': { marginBottom: 0 },
    '& .ant-input-number': { width: '100%' },
  },
  alert: { marginBottom: '24px' },
  statusAlert: {
    marginBottom: '24px',
    borderRadius: '4px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    minHeight: '200px',
  },
  successIcon: {
    color: '#52c41a',
    fontSize: '16px',
    marginRight: '8px',
  },
  emptyState: {
    marginTop: '32px',
    padding: '24px',
  },
  errorMessage: {
    padding: '12px',
    background: '#fff2f0',
    border: '1px solid #ffccc7',
    borderRadius: '4px',
    color: '#ff4d4f',
    marginBottom: '16px',
  },
  successMessage: {
    padding: '12px',
    background: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: '4px',
    color: '#52c41a',
    marginBottom: '16px',
  },
});
