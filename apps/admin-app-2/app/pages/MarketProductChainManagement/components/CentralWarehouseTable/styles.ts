import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export const useStyles = createUseStyles({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    padding: '24px',
    margin: '16px 0',
    width: '100%',
  },
  filtersContainer: {
    marginBottom: 24,
    backgroundColor: colors.filterBackground,
    borderRadius: 8,
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
      backgroundColor: colors.backgroundWhite,
      '&:hover': { borderColor: colors.inputHover },
      '&:focus, &:active': {
        borderColor: colors.inputFocus,
        boxShadow: '0 0 0 2px rgba(122, 107, 153, 0.1)',
      },
    },
    '& .ant-select-selector': {
      height: 40,
      '& .ant-select-selection-search-input': { height: 38 },
    },
    '& .ant-input': {
      height: 40,
      '&::placeholder': { color: colors.inputHover },
    },
  },

  domainTagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  domainTag: {
    display: 'inline-block',
    padding: '4px 10px',
    margin: '3px',
    borderRadius: 6,
    fontSize: '12px',
    lineHeight: '1.4',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    color: colors.darkerText,
    fontWeight: '500',
    border: '1px solid transparent',
    backgroundColor: colors.tagBackground,
  },

  getir10: {
    backgroundColor: colors.tagBackground,
    color: colors.darkerText,
  },
  getirMore: {
    backgroundColor: colors.lightPurple,
    color: colors.purple,
  },
  getirWater: {
    backgroundColor: colors.lightBlue,
    color: colors.waterBlue,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
  activeStatus: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#52c41a',
  },
  inactiveStatus: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#f5222d',
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
