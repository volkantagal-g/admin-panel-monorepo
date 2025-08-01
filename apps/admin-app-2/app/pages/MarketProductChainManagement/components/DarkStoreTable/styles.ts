import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export const useStyles = createUseStyles({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    padding: '24px',
    margin: '16px 0',
  },
  filtersContainer: {
    marginBottom: 24,
    backgroundColor: colors.filterBackground,
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
      border: `1px solid ${colors.borderGrayLight}`,
      transition: 'all 0.2s ease',
      backgroundColor: colors.backgroundWhite,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      '&:hover': { borderColor: colors.inputHover },
      '&:focus, &:active': {
        borderColor: colors.inputFocus,
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
    '& .ant-input': { '&::placeholder': { color: colors.inputHover } },
  },
  table: {
    '& .ant-table': {
      backgroundColor: colors.backgroundWhite,
      borderRadius: 12,
      overflow: 'hidden',
    },
    '& .ant-table-thead > tr > th': {
      backgroundColor: colors.filterBackground,
      borderBottom: `1px solid ${colors.borderGrayLight}`,
      color: colors.tableText,
      fontSize: 14,
      fontWeight: 500,
      padding: '12px 16px',
      textTransform: 'capitalize',
      '&::before': { display: 'none' },
    },
    '& .ant-table-tbody > tr > td': {
      borderBottom: `1px solid ${colors.borderGrayLight}`,
      padding: '12px 16px',
      fontSize: 14,
      color: colors.tableText,
      transition: 'background-color 0.2s ease',
    },
    '& .ant-table-tbody > tr:hover > td': { backgroundColor: colors.filterBackground },
    '& .ant-table-pagination': {
      margin: '24px 0 0',
      '& .ant-pagination-item': {
        borderRadius: 8,
        border: `1px solid ${colors.borderGrayLight}`,
        transition: 'all 0.2s ease',
        '&-active': {
          borderColor: colors.inputFocus,
          backgroundColor: colors.inputFocus,
          '& a': { color: colors.backgroundWhite },
        },
        '& a': {
          color: colors.tableText,
          '&:hover': { color: colors.inputHover },
        },
      },
      '& .ant-pagination-prev, & .ant-pagination-next': {
        '& button': {
          borderRadius: 8,
          border: `1px solid ${colors.borderGrayLight}`,
          color: colors.tableText,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: colors.inputFocus,
            color: colors.inputFocus,
          },
        },
      },
      '& .ant-pagination-options': {
        '& .ant-select:not(.ant-select-disabled):hover .ant-select-selector': { borderColor: colors.inputFocus },
        '& .ant-select-focused:not(.ant-select-disabled) .ant-select-selector': {
          borderColor: colors.inputFocus,
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
            '&:hover': { borderColor: colors.inputFocus },
            '&:focus': {
              borderColor: colors.inputFocus,
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
    color: colors.errorText,
    fontSize: 16,
  },
  // Domain Tag Stilleri
  domainTag: {
    display: 'inline-block',
    padding: '3px 8px',
    margin: '0 4px 4px 0',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '500',
    border: '1px solid transparent',
    backgroundColor: colors.tagBackground,
  },
  // Domain renk varyasyonları - Getir domain'leri için antrasit, gri ve mori tonları
  domainGetir10: { color: colors.darkerText, borderColor: colors.tagBorder },
  domainGetirMarket: { color: colors.davysGrey, borderColor: colors.tagBorder },
  domainGetirWater: { color: colors.slateGrey, borderColor: colors.tagBorder },
  domainDefault: { color: colors.taupeGrey, borderColor: colors.tagBorder },
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
    backgroundColor: colors.tagBackground,
  },
  demographyPremium: { color: colors.darkerText },
  demographyMetropol: { color: colors.davysGrey },
  demographyTraditional: { color: colors.slateGrey },
  demographyUpperPremium: { color: colors.darkerText },
  demographyUnknown: { color: colors.taupeGrey },
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
    backgroundColor: colors.tagBackground,
    borderColor: colors.tagBorder,
    border: `1px solid ${colors.tagBorder}`,
  },
  // Size varyasyonları - Antrasit ve gri tonları
  mini: { color: colors.darkerText },
  midi: { color: colors.davysGrey },
  maxi: { color: colors.slateGrey },
  scMini: { color: colors.darkerText },
  scMidi: { color: colors.davysGrey },
  scMaxi: { color: colors.slateGrey },
  extraMini: { color: colors.darkerText },
  gbMaxi: { color: colors.davysGrey },
  gbMidi: { color: colors.slateGrey },
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
