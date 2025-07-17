import { createUseStyles } from 'react-jss';

import { getLangKey } from '@shared/i18n';

export default createUseStyles(() => {
  const langKey = getLangKey();
  return {
    pageContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    topRightCornerContainer: {
      position: 'absolute',
      top: 15,
      right: 0,
      zIndex: 999,
      width: 280,
    },
    collapseButton: {
      // this is for only urgent release, we will change it asap
      left: langKey === 'tr' ? 110 : 155,
      top: -5,
      height: 29,
    },
    noMarginBottom: { marginBottom: '0 !important' },
    smallPaddingTable: {
      '& td.ant-table-cell, th.ant-table-cell': { padding: '2px 4px !important' },
      '& .ant-tag': { lineHeight: '17px' },
    },
    totalCourier: {
      fontWeight: 'bold !important',
      color: '#58666E !important',
    },
    freeCourier: {
      fontWeight: 'bold !important',
      color: '#1C8C04 !important',
    },
    onDutyCourier: {
      fontWeight: 'bold !important',
      color: '#5D3EBC !important',
    },
    returningCourier: {
      fontWeight: 'bold !important',
      color: '#FF974A !important',
    },
    busyCourier: {
      fontWeight: 'bold !important',
      color: '#F05050 !important',
    },
    utilization: {
      fontWeight: 'bold !important',
      color: '#24B7E6 !important',
    },
  };
});
