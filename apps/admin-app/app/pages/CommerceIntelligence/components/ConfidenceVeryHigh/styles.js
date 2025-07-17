import { createUseStyles } from 'react-jss';

import { borderRadius, colors, fontSizes, fontWeights, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  tableContainer: {
    background: colors.backgroundWhite,
    borderRadius: borderRadius.md,
    boxShadow: `0 2px 8px ${colors.boxShadowLight}`,
    padding: `${spacing.md} 0`,
    fontSize: fontSizes.sm,
  },
  table: { width: '100%' },
  filtersContainer: {
    marginBottom: spacing.lg,
    padding: `0 ${spacing.md}`,
  },
  formItem: { marginBottom: 0 },
  expandableTableContainer: {
    maxHeight: '785px',
    overflowY: 'auto',
    '& .ant-table': {
      background: colors.backgroundWhite,
      borderRadius: borderRadius.md,
      overflow: 'hidden',
    },
    '& .ant-table-thead > tr > th': {
      background: colors.badgeGray,
      color: colors.textDark,
      fontWeight: 500,
      fontSize: fontSizes.sm,
      padding: '12px 16px',
      borderBottom: `1px solid ${colors.borderGray2}`,
      '&::before': { display: 'none' },
      '&.ant-table-column-has-sorters': {
        position: 'relative',
        '& .ant-table-column-sorters': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          '& .ant-table-column-title': { flex: 'none' },
          '& .ant-table-column-sorter': {
            marginLeft: '8px',
            position: 'static',
            color: colors.inputBlack,
            '& .ant-table-column-sorter-up, & .ant-table-column-sorter-down': { color: colors.inputBlack },
          },
        },
      },
    },
    '& .ant-table-tbody > tr > td': {
      padding: 16,
      color: colors.textDark,
      fontSize: fontSizes.sm,
    },
    '& .ant-table-tbody > tr.selectedRow > td': {
      backgroundColor: `${colors.lightPurple} !important`,
      borderBottom: `1px solid ${colors.darkGray} !important`,
    },
    '& .ant-table-tbody > tr.selectedChildRow > td': {
      backgroundColor: `${colors.lightPurple} !important`,
      borderBottom: `1px solid ${colors.darkGray} !important`,
    },
    '& .ant-table-row-expand-icon-cell': { padding: 0 },
    '& .ant-table-expanded-row': {
      '& > td': { padding: '0 !important' },
      '& .ant-table-container': {
        padding: '0 36px 36px',
        backgroundColor: colors.lightBackgroundGray,

        '& .ant-table-content': {
          background: colors.backgroundWhite,
          border: `1px solid ${colors.darkGray}`,
          borderBottom: 'none',
        },
        '& .ant-table-tbody > tr.selectedChildRow > td': {
          backgroundColor: `${colors.lightPurple} !important`,
          borderBottom: `1px solid ${colors.darkGray} !important`,
        },
      },
    },
  },
  customExpandIcon: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    background: colors.lightPurple,
    borderRadius: borderRadius.md,
    width: '32px',
    height: '32px',
    '& img': {
      width: '20px',
      height: '20px',
      transition: 'transform 0.3s ease',
    },
    '& img.expanded': { transform: 'rotate(-180deg)' },
  },
  expandedContent: {
    overflow: 'hidden',
    transition: 'all 0.5s ease-in-out',
    animation: '$expandAnimation 0.5s ease-in-out',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 2,
      left: 17,
      top: 0,
      bottom: 92,
      width: 1,
      backgroundColor: colors.borderGray2,
    },
    '& .ant-table-tbody > tr': {
      '& > td:first-child': {
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -20,
          top: '50%',
          width: 20,
          height: 20,
          borderBottom: `1px solid ${colors.borderGray2}`,
          borderLeft: `1px solid ${colors.borderGray2}`,
          borderBottomLeftRadius: 8,
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
        },
      },
    },
  },
  '@keyframes expandAnimation': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sd,
    justifyContent: 'flex-end',
    minWidth: 110,
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    '& img': { width: '100%', height: '100%' },
    '&:last-child': {
      position: 'relative',
      marginLeft: spacing.sm,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '-12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 1,
        height: 60,
        backgroundColor: colors.borderGray2,
      },
    },
  },
  indirectMatchButton: {
    background: colors.lightRed,
    '&:hover': { background: colors.lightRed },
  },
  directMatchButton: {
    background: colors.lightGreen,
    '&:hover': { background: colors.lightGreen },
  },
  deleteButton: {
    background: colors.badgeGray,
    '&:hover': { background: colors.badgeGray },
  },
  tooltip: { '& .ant-tooltip-inner': { borderRadius: borderRadius.md } },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 0,
    '& .ant-pagination-total-text': { display: 'none !important' },
    '& .ant-pagination-options': { display: 'none !important' },
    '& .ant-pagination-item': {
      borderRadius: 8,
      border: 'none',
      transition: 'all 0.2s ease',
      fontSize: fontSizes.sm,
      '&-active': {
        backgroundColor: colors.lightPurple,
        '& a': {
          color: colors.purple,
          fontWeight: fontWeights.semibold,
          '&:hover': { color: colors.purple },
        },
      },
      '& a': {
        color: colors.textDark,
        '&:hover': {
          color: colors.purple,
          fontWeight: fontWeights.semibold,
        },
      },
    },
    '& .ant-pagination-prev:not(.ant-pagination-disabled):hover': { backgroundColor: `${colors.lightPurple} !important` },
    '& .ant-pagination-next:not(.ant-pagination-disabled):hover': { backgroundColor: `${colors.lightPurple} !important` },
    '& .ant-pagination-prev.ant-pagination-disabled': {
      cursor: 'not-allowed !important',
      opacity: '0.5 !important',
      '& .prev-icon': { opacity: '0.5 !important' },
    },
    '& .ant-pagination-next.ant-pagination-disabled': {
      cursor: 'not-allowed !important',
      opacity: '0.5 !important',
      '& .next-icon': { opacity: '0.5 !important' },
    },
    '& .ant-pagination-prev, & .ant-pagination-next': {
      borderRadius: borderRadius.sm,
      border: 'none',
      color: colors.textDark,
      transition: 'all 0.2s ease',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      background: 'transparent',
    },
    '& .prev-icon': {
      transform: 'rotate(90deg)',
      width: 20,
      height: 20,
    },
    '& .next-icon': {
      transform: 'rotate(-90deg)',
      width: 20,
      height: 20,
    },
    '& .jump-prev-icon': {
      width: 21,
      height: 20,
    },
    '& .jump-next-icon': {
      width: 21,
      height: 20,
    },
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    position: 'relative',
    flexDirection: 'row-reverse',
  },
  paginationCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  customPaginationWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  paginationButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.sm,
    transition: 'all 0.2s ease',
    '&:hover:not(:disabled)': { backgroundColor: colors.lightPurple },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '& .jump-prev-icon, & .jump-next-icon': {
      width: 21,
      height: 20,
    },
  },
  limitContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    marginRight: spacing.lg,
  },
  limitLabel: {
    color: colors.purple,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    pointerEvents: 'none',
    userSelect: 'none',
    marginRight: spacing.sd,
  },
  limitSelect: {
    minWidth: '60px',
    '& .ant-select-selector': {
      borderRadius: `${borderRadius.md} !important`,
      backgroundColor: `${colors.lightPurple} !important`,
      color: `${colors.purple} !important`,
      '&:hover': { backgroundColor: `${colors.lightPurple} !important` },
    },
    '& .ant-select-selection-item': {
      color: colors.purple,
      fontWeight: fontWeights.semibold,
    },
    '& .ant-select-arrow': {
      color: colors.purple,
      '& .anticon': { display: 'none' },
    },
    '&.ant-select-focused .ant-select-selector': {
      borderColor: colors.purple,
      boxShadow: `0 0 0 2px ${colors.lightPurple}`,
    },
  },
  checkbox: {
    '& .ant-checkbox-inner': {
      width: 24,
      height: 24,
      borderRadius: borderRadius.xs,
      '&::after': {
        width: 8,
        height: 12,
      },
    },
    '& .ant-checkbox-indeterminate .ant-checkbox-inner': {
      backgroundColor: colors.purple,
      borderColor: colors.purple,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 10,
        height: 2,
        backgroundColor: `${colors.backgroundWhite} !important`,
        border: 'none',
        borderRadius: 1,
        zIndex: 2,
      },
    },
    '& .ant-checkbox-disabled': {
      '& .ant-checkbox-inner': {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
      },
      '&.ant-checkbox-checked .ant-checkbox-inner': {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
        '&::after': { borderColor: colors.backgroundWhite },
      },
    },
  },
  selectedRow: {
    backgroundColor: `${colors.lightPurple} !important`,
    '& > td': {
      backgroundColor: `${colors.lightPurple} !important`,
      borderBottom: `1px solid ${colors.darkGray} !important`,
    },
  },
  selectedChildRow: {
    backgroundColor: `${colors.lightPurple} !important`,
    '& > td': {
      backgroundColor: `${colors.lightPurple} !important`,
      borderBottom: `1px solid ${colors.darkGray} !important`,
    },
  },
});
