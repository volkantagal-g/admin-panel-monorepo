import { useCallback, useEffect, useMemo, useState } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';

import { clusterLayerProps, symbolProps, unclusteredProps } from './utils';

const PointClusterLayer = ({
  id = 'clusters',
  sourceId = 'cluster-source',
  geoJsonData = {},
}) => {
  const mapRef = useMap();
  const map = mapRef.current;
  const [zoomLevel, setZoomLevel] = useState();

  const clusterLayer = clusterLayerProps({ id, sourceId });
  const clusterCountLayer = symbolProps({ id, sourceId });
  const unclusteredPointLayer = unclusteredProps({ id, sourceId });

  const clusterOptions = useMemo(() => {
    if (zoomLevel < 8) {
      return { clusterRadius: 100, clusterMaxZoom: 10 };
    }
    if (zoomLevel < 14) {
      return { clusterRadius: 60, clusterMaxZoom: 16 };
    }
    return { clusterRadius: 20, clusterMaxZoom: 20 };
  }, [zoomLevel]);

  const onClick = useCallback(() => {
    map.on('click', `${id}-layer`, mouse => {
      if (mouse.features) {
        const zoom = zoomLevel + 1;
        map.easeTo({ center: [mouse.lngLat.lng, mouse.lngLat.lat], zoom, duration: 500 });
        setZoomLevel(zoom);
      }
    });
  }, [id, map, zoomLevel]);

  useEffect(() => {
    map.on('zoomend', event => {
      const currentZoom = Math.round(event.viewState.zoom);
      setZoomLevel(currentZoom);
    });
    return setZoomLevel(Math.round(map.getZoom()));
  }, [map]);

  return (
    <Source
      id={`${id}-source`}
      type="geojson"
      data={geoJsonData}
      cluster
      {...clusterOptions}
    >
      <Layer {...clusterLayer} />
      <Layer {...unclusteredPointLayer} />
      <Layer {...clusterCountLayer} />
      {onClick()}
    </Source>
  );
};

export default PointClusterLayer;
