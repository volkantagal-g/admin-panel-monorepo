import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  container: { padding: '24px 0' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: colors.backgroundWhite,
    borderRadius: '12px',
    border: `1px solid ${colors.borderGray}`,
    transition: 'all 0.2s ease',
    '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' },
  },
  infoCard: {
    backgroundColor: 'rgba(103, 80, 164, 0.02)',
    border: '1px solid rgba(103, 80, 164, 0.08)',
    padding: '12px 16px',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  icon: {
    fontSize: '20px',
    color: '#6750A4',
  },
  content: { flex: 1 },
  label: {
    fontSize: '12px',
    color: '#666666',
    fontWeight: 500,
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  value: {
    fontSize: '14px',
    color: '#1D1B20',
    fontWeight: 600,
  },
  // Timestamp styles
  timeInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  timeInfoItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px',
  },
  timeLabel: {
    color: '#666666',
    marginRight: '4px',
    opacity: 0.8,
  },
  timeValue: {
    color: '#1D1B20',
    opacity: 0.9,
  },
});
