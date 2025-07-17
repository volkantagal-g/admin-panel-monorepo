import { createUseStyles } from 'react-jss';

export default createUseStyles({
  mapWrapper: {
    height: '100%',
    maxHeight: 'calc(100vh - 124px)',
  },
  mapFlex: {
    height: 'calc(100vh - 124px)',
    width: '100%',
  },
  popupWrapper: {
    maxHeight: '450px',
    maxWidth: '450px',
    '& .leaflet-popup-content-wrapper': { padding: '8px 8px' },
    '& .leaflet-popup-content': { width: '450px', height: '400px', overflow: 'auto' },
    '& .ant-descriptions-item-content': { width: '450px' },
  },
  badgeWrapper: {
    color: '#DC3644',
    fontSize: '13px',
    fontWeight: 'bold',
    '& .ant-scroll-number': { position: 'relative' },
    '& .ant-scroll-number-only-unit': { marginLeft: '25px', marginRight: '25px' },
  },
});
