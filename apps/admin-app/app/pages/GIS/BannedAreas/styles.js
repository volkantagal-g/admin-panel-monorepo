import { createUseStyles } from 'react-jss';
import 'leaflet/dist/leaflet.css';

export default createUseStyles(() => {
  return {
    mapWrapper: {
      height: '100%',
      maxHeight: 'calc(100vh - 124px)',
    },
    mapFlex: {
      height: 'calc(100vh - 124px)',
      width: '100%',
    },
    cardWrapper: { height: 'calc(100vh - 124px)' },
  };
});
