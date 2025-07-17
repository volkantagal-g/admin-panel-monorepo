import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    padding: '24px',
    margin: '16px 0',
  },
  filtersContainer: {
    marginBottom: 24,
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: '20px',
  },
  formItem: {
    marginBottom: '16px',
    '& .ant-form-item-label': {
      padding: 0,
      marginBottom: 4,
    },
    '& .ant-input, & .ant-select-selector': {
      borderRadius: 8,
      border: '1px solid #d2d2d7',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      '&:hover': { borderColor: '#86868b' },
      '&:focus, &:active': {
        borderColor: '#7a6b99',
        boxShadow: '0 0 0 2px rgba(122, 107, 153, 0.1)',
      },
    },
    '& .ant-select-selector': {
      height: 40,
      '& .ant-select-selection-search-input': { height: 38 },
    },
    '& .ant-input': {
      height: 40,
      '&::placeholder': { color: '#86868b' },
    },
  },
  table: {
    '& .ant-table': {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
    },
    '& .ant-table-thead > tr > th': {
      backgroundColor: '#f5f5f7',
      borderBottom: '1px solid #d2d2d7',
      color: '#1d1d1f',
      fontSize: 14,
      fontWeight: 500,
      padding: '16px',
      '&::before': { display: 'none' },
    },
    '& .ant-table-tbody > tr > td': {
      borderBottom: '1px solid #f5f5f7',
      padding: '16px',
      fontSize: 14,
      color: '#1d1d1f',
      transition: 'background-color 0.2s ease',
    },
    '& .ant-table-tbody > tr:hover > td': { backgroundColor: '#f5f5f7' },
    '& .ant-table-pagination': {
      margin: '24px 0 0',
      '& .ant-pagination-item': {
        borderRadius: 8,
        border: '1px solid #d2d2d7',
        transition: 'all 0.2s ease',
        '&-active': {
          borderColor: '#7a6b99',
          backgroundColor: '#7a6b99',
          '& a': { color: '#ffffff' },
        },
        '& a': {
          color: '#1d1d1f',
          '&:hover': { color: '#7a6b99' },
        },
      },
      '& .ant-pagination-prev, & .ant-pagination-next': {
        '& button': {
          borderRadius: 8,
          border: '1px solid #d2d2d7',
          color: '#1d1d1f',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#7a6b99',
            color: '#7a6b99',
          },
        },
      },
      '& .ant-pagination-options': {
        '& .ant-select:not(.ant-select-disabled):hover .ant-select-selector': { borderColor: '#7a6b99' },
        '& .ant-select-focused:not(.ant-select-disabled) .ant-select-selector': {
          borderColor: '#7a6b99',
          boxShadow: '0 0 0 2px rgba(122, 107, 153, 0.1)',
        },
        '& .ant-select-selector': {
          borderRadius: 8,
          transition: 'all 0.2s ease',
        },
        '& .ant-pagination-options-quick-jumper': {
          '& input': {
            borderRadius: 8,
            transition: 'all 0.2s ease',
            '&:hover': { borderColor: '#7a6b99' },
            '&:focus': {
              borderColor: '#7a6b99',
              boxShadow: '0 0 0 2px rgba(122, 107, 153, 0.1)',
            },
          },
        },
      },
    },
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '24px',
  },
  errorMessage: {
    color: '#ff3b30',
    fontSize: 16,
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '16px',
      margin: '12px 0',
    },
    filtersContainer: {
      padding: '16px',
      marginBottom: 16,
    },
    formItem: { marginBottom: '12px' },
    table: {
      '& .ant-table-thead > tr > th': { padding: '12px' },
      '& .ant-table-tbody > tr > td': { padding: '12px' },
    },
  },
});
