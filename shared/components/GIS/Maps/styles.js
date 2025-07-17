import { createUseStyles } from 'react-jss';

export default createUseStyles({
  mapFlex: {
    height: 'calc(100vh - 124px)',
    width: '100%',
  },
  popupWrapper: {
    maxHeight: 'auto',
    '& .leaflet-popup-content': { overflow: 'auto' },
  },
  tooltipWrapper: {
    backgroundColor: 'transparent !important',
    color: '#5D3EBC !important',
    border: 'none !important',
    boxShadow: 'none !important',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
});
