import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  dragOverlayCell: {
    padding: '12px 16px',
    background: colors.backgroundWhite,
    border: `1px solid ${colors.borderGray}`,
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    cursor: 'grabbing',
  },
  menu: {
    '& .ant-btn': {
      border: 'none',
      boxShadow: 'none',
    },
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    fontWeight: 700,
    '& .image-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    transition: 'transform 0.3s ease',
    '& img': {
      width: '20px',
      height: '20px',
      transition: 'transform 0.3s ease',
    },
  },
  rotateIcon: { '& img': { transform: 'rotate(90deg)' } },
  actionsColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    position: 'relative',
    padding: '4px 0',
  },
  tickContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tickIcon: {
    width: '20px',
    height: '20px',
  },
  tickCell: {
    color: colors.textDark,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  redActionLine: { color: colors.red },
  trueLabel: {
    color: colors.successGreen,
    fontWeight: 500,
    backgroundColor: colors.successBackground,
    padding: '6px 12px',
    borderRadius: 6,
  },
  falseLabel: {
    color: colors.errorRed,
    fontWeight: 500,
    backgroundColor: colors.errorBackground,
    padding: '6px 12px',
    borderRadius: 6,
  },
  rightAligned: { textAlign: 'right' },
  detailButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#5936F2',
    fontWeight: '500',
    padding: '8px 12px',
    height: '36px',
    borderRadius: '6px',
    background: 'rgba(89, 54, 242, 0.05)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(89, 54, 242, 0.1)',
    border: 'none',
    cursor: 'pointer',
    willChange: 'transform, opacity, box-shadow',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
    width: '100%',
    justifyContent: 'flex-start',

    '&:hover': {
      transform: 'translate3d(2px, 0, 0) scale3d(1.02, 1.02, 1)',
      background: 'rgba(89, 54, 242, 0.1)',
      boxShadow: '0 4px 8px rgba(89, 54, 242, 0.15)',

      '& $detailIcon': { transform: 'translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotate3d(0, 1, 0, 360deg)' },

      '&:after': {
        transform: 'translate3d(150%, 0, 0) skewX(45deg)',
        opacity: '1',
      },
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
      transform: 'translate3d(-150%, 0, 0) skewX(45deg)',
      opacity: '0',
      transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s linear',
      willChange: 'transform, opacity',
      pointerEvents: 'none',
    },

    '&:active': {
      transform: 'translate3d(0, 1px, 0) scale3d(0.98, 0.98, 1)',
      boxShadow: '0 4px 8px rgba(89, 54, 242, 0.15)',
      transition: 'all 0.1s cubic-bezier(0.2, 0, 0, 1)',
    },
  },

  configButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#00875A',
    fontWeight: '500',
    padding: '8px 12px',
    height: '36px',
    borderRadius: '6px',
    background: 'rgba(0, 135, 90, 0.05)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 135, 90, 0.1)',
    border: 'none',
    cursor: 'pointer',
    willChange: 'transform, opacity, box-shadow',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
    width: '100%',
    justifyContent: 'flex-start',

    '&:hover': {
      transform: 'translate3d(2px, 0, 0) scale3d(1.02, 1.02, 1)',
      background: 'rgba(0, 135, 90, 0.1)',
      boxShadow: '0 4px 8px rgba(0, 135, 90, 0.15)',

      '& $detailIcon': { transform: 'translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotate3d(0, 1, 0, 360deg)' },

      '&:after': {
        transform: 'translate3d(150%, 0, 0) skewX(45deg)',
        opacity: '1',
      },
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
      transform: 'translate3d(-150%, 0, 0) skewX(45deg)',
      opacity: '0',
      transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s linear',
      willChange: 'transform, opacity',
      pointerEvents: 'none',
    },

    '&:active': {
      transform: 'translate3d(0, 1px, 0) scale3d(0.98, 0.98, 1)',
      boxShadow: '0 4px 8px rgba(0, 135, 90, 0.15)',
      transition: 'all 0.1s cubic-bezier(0.2, 0, 0, 1)',
    },
  },

  detailIcon: {
    width: '16px',
    height: '16px',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)',
    animation: '$pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  '@keyframes pulse': {
    '0%': { transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' },
    '50%': { transform: 'translate3d(0, 0, 0) scale3d(1.08, 1.08, 1)' },
    '100%': { transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' },
  },

  table: {
    '& .ant-table': {
      background: colors.backgroundWhite,

      '& .ant-table-container': {
        borderRadius: '8px',
        overflow: 'hidden',
      },
      '& .ant-tag': { marginBottom: '4px' },
      '& .ant-table-cell': {
        fontSize: '14px',
        color: colors.textDark,
        padding: '16px',
        textAlign: 'left !important',

        '& .ant-table-cell-fix-left': {
          backgroundColor: colors.backgroundLight,
          '&::before': { backgroundColor: colors.backgroundLight },
          '&.ant-table-cell-fix-left-last': {
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s',
            },
          },
        },
      },
      '&.ant-table-ping-right': { '& .ant-table-cell-fix-right-first::after': { boxShadow: 'none !important' } },
      '& .ant-table-thead': {
        '& > tr > th': {
          backgroundColor: colors.tableHeaderBackground,
          fontWeight: 500,
          color: colors.textDark,
          borderBottom: `1px solid ${colors.borderGray}`,

          '&.ant-table-cell-fix-right': { position: 'relative !important' },

          '&.ant-table-cell-fix-left': {
            backgroundColor: colors.backgroundLight,
            '&::before': { backgroundColor: colors.backgroundLight },
          },
        },
      },

      '& .ant-table-tbody': {
        '& > tr': {
          '&:hover': {
            '& > td': {
              backgroundColor: `${colors.backgroundLight} !important`,
              '&.ant-table-cell-fix-left': {
                backgroundColor: `${colors.backgroundGrey} !important`,
                '&::before': { backgroundColor: `${colors.backgroundGrey} !important` },
              },
            },
          },

          '& > td': {
            borderBottom: `1px solid ${colors.borderGray}`,
            transition: 'background-color 0.2s',

            '&.ant-table-cell-fix-left': {
              backgroundColor: colors.backgroundLight,
              '&::before': { backgroundColor: colors.backgroundLight },
            },
            '&.ant-table-cell-fix-right': { backgroundColor: 'transparent !important' },
          },
        },
      },
    },
  },
  scrollContainer: {
    maxHeight: '600px',
    overflow: 'auto',
  },
});
