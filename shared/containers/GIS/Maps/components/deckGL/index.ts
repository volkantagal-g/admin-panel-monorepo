import { useControl } from 'react-map-gl';

import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';

const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};
export default DeckGLOverlay;
