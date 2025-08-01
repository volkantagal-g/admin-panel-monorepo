import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export const useStyles = createUseStyles({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    padding: '24px',
    margin: '16px 0',
  },
  filtersContainer: {
    marginBottom: 24,
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    padding: '24px 28px',
  },
  formItem: {
    marginBottom: '8px',
    height: '100%',
    '& .ant-form-item-label': {
      padding: 0,
      marginBottom: 4,
    },
    '& .ant-input, & .ant-select-selector': {
      borderRadius: 8,
      border: '1px solid #d2d2d7',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      '&:hover': { borderColor: '#86868b' },
      '&:focus, &:active': {
        borderColor: '#7a6b99',
        boxShadow: '0 0 0 2px rgba(122, 107, 153, 0.1)',
      },
    },
    '& .ant-select-selector': {
      '& .ant-select-selection-search-input': { height: 38 },
      '& .ant-select-selection-item': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '& .ant-input': { '&::placeholder': { color: '#86868b' } },
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
      padding: '12px 16px',
      textTransform: 'capitalize',
      '&::before': { display: 'none' },
    },
    '& .ant-table-tbody > tr > td': {
      borderBottom: '1px solid #f5f5f7',
      padding: '12px 16px',
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
  // Domain Tag Stilleri
  domainTag: {
    display: 'inline-block',
    padding: '4px 10px',
    margin: '3px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '500',
    border: '1px solid transparent',
    backgroundColor: colors.tagBackground,
  },
  // Domain renk varyasyonları - Getir domain'leri için antrasit, gri ve mori tonları
  domainGetir10: { color: colors.darkerText },
  domainGetirMarket: { color: colors.darkerText },
  domainGetirMore: { color: colors.purple, backgroundColor: colors.lightPurple },
  domainGetirWater: { color: colors.waterBlue, backgroundColor: colors.lightBlue },
  domainDefault: { color: colors.darkerText },
  // Demography Badge - Soft görünümlü badge'ler
  demographyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 8px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: '0.1px',
    textAlign: 'center',
    backgroundColor: '#F1F1F5',
  },
  demographyPremium: { color: '#353840' },
  demographyMetropol: { color: '#545559' },
  demographyTraditional: { color: '#6E7987' },
  demographyUpperPremium: { color: '#353840' },
  demographyUnknown: { color: '#8E8E93' },
  // Size Badge
  sizeBadge: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: '0.1px',
    textAlign: 'center',
    backgroundColor: '#F1F1F5',
    borderColor: '#E5E5EA',
    border: '1px solid #E5E5EA',
  },
  // Size varyasyonları - Antrasit ve gri tonları
  mini: { color: '#353840' },
  midi: { color: '#545559' },
  maxi: { color: '#6E7987' },
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
      '& .ant-table-thead > tr > th': { padding: '10px 12px' },
      '& .ant-table-tbody > tr > td': { padding: '10px 12px' },
    },
  },
});
