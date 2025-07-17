export const mockedGeouBoundaryType = ['polygons'];
export const availableStats = {
  dateRangeTypes: [
    'monthly',
  ],
  analyticTypes: [
    {
      type: 'appOpen',
      styles: {
        type: 'fill',
        paint: {
          'fill-outline-color': '#000000',
          'fill-color': '#777777',
          'fill-opacity': 0.5,
        },
      },
    },
    {
      type: 'order',
      styles: {
        type: 'fill',
        paint: {
          type: 'fill',
          paint: {
            'fill-outline-color': '#000000',
            'fill-color': '#777777',
            'fill-opacity': 0.5,
          },
        },
      },
    },
  ],
};
export const polygonWithStats = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '64391a3027d1b9253ecc2100',
        totalStats: [
          {
            type: 'order',
            value: 9,
          },
          {
            type: 'downloads',
            value: 450,
          },
          {
            type: 'missedOrder',
            value: 250,
          },
          {
            type: 'appOpen',
            value: 1662,
          },
        ],
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [
                38.336452113,
                38.23222146,
              ],
              [
                38.239945951,
                38.350359729,
              ],
              [
                38.226152426,
                38.371416116,
              ],
              [
                38.221325715,
                38.379739694,
              ],
              [
                38.206848161,
                38.378972903,
              ],
              [
                38.186618139,
                38.375682619,
              ],
              [
                38.147387416,
                38.359071184,
              ],
              [
                38.142839015,
                38.312957901,
              ],
              [
                38.188440965,
                38.255046954,
              ],
              [
                38.336452113,
                38.23222146,
              ],
            ],
          ],
        ],
      },
    },
  ],
};
