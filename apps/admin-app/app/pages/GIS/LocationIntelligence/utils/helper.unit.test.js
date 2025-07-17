import {
  getEvaluatedFeatureCollection,
  getNormalizedValues,
  getPolygonReqBody,
  getPolygonsGeojson,
  getStyledGeojson,
} from './helper';

const mockPolygonFilters = {
  city: '55999ad00000010001000000',
  domainType: 1,
  polygonType: 1,
  subregionIntervalType: 1100,
};

const mockPolygonRequestBody = {
  city: '55999ad00000010001000000',
  domainTypes: [1],
  polygonTypes: [1],
  subregionIntervalTypes: [1100],
};

const mockBanPolygonFilters = {
  city: '5fd60fe00000010007000000',
  subregionIntervalType: 1100,
  polygonType: 2,
  domainType: 1,
};

const mockBanPolygonRequestBody = {
  domainTypes: [1],
  polygonTypes: [2],
};

const mockPolygonsData =
[
  {
    id: '647993ccba945a3d900f4caf',
    type: 1,
    metadata: {
      vehicleTypes: [],
      warehouse: { id: '60ffaeae6a502313205113fd' },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            43.3730149269104,
            38.51513142571809,
          ],
          [
            43.375375270843506,
            38.512864818208506,
          ],
          [
            43.37859392166138,
            38.51736438407478,
          ],
          [
            43.37395906448364,
            38.51759942829374,
          ],
          [
            43.3730149269104,
            38.51513142571809,
          ],
        ],
      ],
    },
    domainTypes: [
      1,
    ],
    availableTimes: [
      {
        startMin: 0,
        endMin: 60,
      },
      {
        startMin: 541,
        endMin: 1500,
      },
      {
        startMin: 1981,
        endMin: 2940,
      },
      {
        startMin: 3421,
        endMin: 4380,
      },
      {
        startMin: 4861,
        endMin: 5820,
      },
      {
        startMin: 6301,
        endMin: 7260,
      },
      {
        startMin: 7741,
        endMin: 8700,
      },
      {
        startMin: 9181,
        endMin: 10080,
      },
    ],
    location: {
      centerGeometry: {
        type: 'Point',
        coordinates: [
          38.51271370850396,
          43.411102294921875,
        ],
      },
      country: { id: '55999ad00000010000000000' },
      city: {
        id: '5fd60fe00000010008300000',
        timezone: 'Europe/Istanbul',
      },
      region: { id: '5fd60fe00000010008300001' },
    },
    createdAt: '2023-06-02T07:01:32.959Z',
    updatedAt: '2023-06-02T07:01:32.959Z',
  },
];

const mockPolygonsGeoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '647993ccba945a3d900f4caf',
        type: 1,
        metadata: {
          vehicleTypes: [],
          warehouse: { id: '60ffaeae6a502313205113fd' },
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [
                43.3730149269104,
                38.51513142571809,
              ],
              [
                43.375375270843506,
                38.512864818208506,
              ],
              [
                43.37859392166138,
                38.51736438407478,
              ],
              [
                43.37395906448364,
                38.51759942829374,
              ],
              [
                43.3730149269104,
                38.51513142571809,
              ],
            ],
          ],
        },
        domainTypes: [
          1,
        ],
        availableTimes: [
          {
            startMin: 0,
            endMin: 60,
          },
          {
            startMin: 541,
            endMin: 1500,
          },
          {
            startMin: 1981,
            endMin: 2940,
          },
          {
            startMin: 3421,
            endMin: 4380,
          },
          {
            startMin: 4861,
            endMin: 5820,
          },
          {
            startMin: 6301,
            endMin: 7260,
          },
          {
            startMin: 7741,
            endMin: 8700,
          },
          {
            startMin: 9181,
            endMin: 10080,
          },
        ],
        location: {
          centerGeometry: {
            type: 'Point',
            coordinates: [
              38.51271370850396,
              43.411102294921875,
            ],
          },
          country: { id: '55999ad00000010000000000' },
          city: {
            id: '5fd60fe00000010008300000',
            timezone: 'Europe/Istanbul',
          },
          region: { id: '5fd60fe00000010008300001' },
        },
        createdAt: '2023-06-02T07:01:32.959Z',
        updatedAt: '2023-06-02T07:01:32.959Z',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              43.3730149269104,
              38.51513142571809,
            ],
            [
              43.375375270843506,
              38.512864818208506,
            ],
            [
              43.37859392166138,
              38.51736438407478,
            ],
            [
              43.37395906448364,
              38.51759942829374,
            ],
            [
              43.3730149269104,
              38.51513142571809,
            ],
          ],
        ],
      },
    },
  ],
};

const mockEvaluatedPolygons = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '64303af76555ff9d412b6432',
        appOpen: 174,
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [
                35.041763758,
                40.256592219,
              ],
              [
                35.090300721,
                37.17820709,
              ],
              [
                33.636726164,
                37.156104567,
              ],
              [
                33.636726164,
                40.256592219,
              ],
              [
                35.041763758,
                40.256592219,
              ],
            ],
          ],
        ],
      },
    },
  ],
};

const mockRawGeojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '64303af76555ff9d412b6432',
        totalStats: [
          {
            type: 'appOpen',
            value: 174,
          },
        ],
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [
                35.041763758,
                40.256592219,
              ],
              [
                35.090300721,
                37.17820709,
              ],
              [
                33.636726164,
                37.156104567,
              ],
              [
                33.636726164,
                40.256592219,
              ],
              [
                35.041763758,
                40.256592219,
              ],
            ],
          ],
        ],
      },
    },
  ],
};

const mockRawStyle = {
  type: 'appOpen',
  styles: {
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          10000,
        ],
        '#2b83ba',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          20000,
        ],
        '#80BFAC',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          30000,
        ],
        '#ed6e43',
        '#d7191c',
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': '#000000',
    },
  },
};

const newTypeMockData = {
  type: 'appOpen',
  styles: {
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          2333,
        ],
        '#2b83ba',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          4667,
        ],
        '#80BFAC',
        [
          '<=',
          [
            'get',
            'appOpen',
          ],
          7000,
        ],
        '#ed6e43',
        '#d7191c',
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': '#000000',
    },
  },
};

const mockStartDateString = '2023-02-01';
const mockEndDateString = '2023-02-07';
const mockcolorRange = ['#fee0d2', '#fc9272', '#de2d26'];
const mockClassificationType = ['neutral', 'equalInterval'];
const mockStatType = 'appOpen';

describe('Polygon Filters', () => {
  it('should return correct polygon request body', () => {
    const polygonFilters = getPolygonReqBody({ filters: mockPolygonFilters });
    expect(polygonFilters).toEqual(mockPolygonRequestBody);
  });
  it('should return correct polygon request for ban polygon types', () => {
    const banPolygonFilters = getPolygonReqBody({ filters: mockBanPolygonFilters });
    expect(banPolygonFilters).toEqual(mockBanPolygonRequestBody);
  });
  it('jsonPolygonsData should return correct geojsonPolygonsData', () => {
    const polygonsObject = getPolygonsGeojson(mockPolygonsData);
    expect(polygonsObject).toEqual(mockPolygonsGeoJsonData);
  });
  it('getEvaluatedFeatureCollection should return correct featureCollection', () => {
    const evaluatedData = getEvaluatedFeatureCollection(mockRawGeojson);
    expect(evaluatedData).toEqual(mockEvaluatedPolygons);
  });
  it('getNormalizedValues should return new object with normalized values', () => {
    const normalizedValues = getNormalizedValues({
      type: mockRawStyle,
      startDate: mockStartDateString,
      endDate: mockEndDateString,
    });
    expect(normalizedValues).toEqual(newTypeMockData);
  });
  it('getStyledGeojson should return neutrally classificated new object classificated with neutral', () => {
    const styledGeojson = getStyledGeojson({
      data: mockEvaluatedPolygons,
      colorRange: mockcolorRange,
      classificationType: mockClassificationType[0],
      statType: mockStatType,
    });

    const mockStyledPolygon = mockEvaluatedPolygons;
    mockStyledPolygon.features[0].properties.color = '#de2d26';

    expect(styledGeojson).toEqual(mockStyledPolygon);
  });
  it('getStyledGeojson should return new object classificated with equal intervals', () => {
    const styledGeojson = getStyledGeojson({
      data: mockEvaluatedPolygons,
      colorRange: mockcolorRange,
      classificationType: mockClassificationType[1],
      statType: mockStatType,
    });

    const mockStyledPolygon = mockEvaluatedPolygons;
    mockStyledPolygon.features[0].properties.color = 'rgb(252, 146, 114)';

    expect(styledGeojson).toEqual(mockStyledPolygon);
  });
});
