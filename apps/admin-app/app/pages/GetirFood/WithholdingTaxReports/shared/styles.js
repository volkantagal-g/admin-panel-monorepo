import { createUseStyles } from 'react-jss';

export default createUseStyles({
  card: {
    '& .ant-card-head-title': {
      fontWeight: 600,
      color: '#000',
    },
    '& .ant-divider-horizontal': { margin: '12px 0' },
  },
  formItem: { width: '300px' },
  categoryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'black',
  },
  categoryLabel: {
    fontSize: '14px',
    color: 'black',
  },
  categoryValue: {
    fontSize: '14px',
    color: '#667085',
  },
  skeletonSummaryTitle: {
    width: '100%',
    height: '24px',
    '& .ant-skeleton-input': {
      width: '100%',
      height: '24px',
    },
  },
  skeletonSummaryValue: {
    width: '50px',
    height: '24px',
    '& .ant-skeleton-input': {
      width: '50px',
      height: '24px',
    },
  },
  skeletonSummaryButton: {
    width: '100%',
    height: '32px',
    '& .ant-skeleton-button': {
      width: '100%',
      height: '32px',
    },
  },
  skeletonCategoryTitle: {
    width: '60%',
    height: '24px',
    marginBottom: '16px',
    '& .ant-skeleton-input': {
      width: '100%',
      height: '24px',
    },
  },
  skeletonCategoryLabel: {
    width: '100%',
    height: '20px',
    '& .ant-skeleton-input': {
      width: '100%',
      height: '20px',
    },
  },
  skeletonCategoryValue: {
    width: '70px',
    height: '20px',
    '& .ant-skeleton-input': {
      width: '70px',
      height: '20px',
    },
  },
  tableActionReportButton: {
    border: '1px solid #5D3EBC',
    color: '#5D3EBC',
    borderRadius: '4px',
    padding: '4px 12px',
    fontSize: '14px',
    fontWeight: 700,
  },
  filterButton: {
    borderRadius: '4px',
    padding: '4px 12px',
    fontSize: '14px',
    fontWeight: 600,
  },
  exportSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f3f0fe',
    borderRadius: '8px',
  },
  exportFilterSelect: { width: '100%' },
  summaryDescription: {
    fontSize: '14px',
    color: '#667085',
  },
  exportButtonGroup: {
    display: 'flex',
    gap: '12px',
    width: '100%',
    '& > button': { width: '100%' },
  },
});
