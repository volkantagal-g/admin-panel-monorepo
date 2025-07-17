export const clusterLayerProps = ({ id, sourceId }) => {
  return ({
    id: `${id}-layer`,
    type: 'circle',
    source: `clusters-${sourceId}`,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#2b83ba', 30, '#b7e2a8', 50, '#feba6e', 250, '#d7191c'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 30, 30, 50, 40, 250, 50, 1000, 60],
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
    layout: { 'circle-sort-key': ['to-number', ['get', 'point_count']] },
  });
};

export const symbolProps = ({ id, sourceId }) => {
  return ({
    id: `${id}-count-layer`,
    type: 'symbol',
    source: `clusters-${sourceId}`,
    filter: ['has', 'point_count'],
    paint: { 'text-color': '#fff', 'text-halo-width': 4 },
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12,
      'text-font': ['Open Sans Bold'],
    },
  });
};

export const unclusteredProps = ({ id, sourceId }) => {
  return ({
    id: `unclustered-${id}`,
    type: 'circle',
    source: `clusters-${sourceId}`,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 5,
      'circle-stroke-width': 0.5,
      'circle-stroke-color': '#fff',
    },
  });
};
