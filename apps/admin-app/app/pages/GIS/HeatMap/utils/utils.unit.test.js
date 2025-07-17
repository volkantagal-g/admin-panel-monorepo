import { getPolygonReqBody } from './helpers';

const polygonFilters = {
  domainTypes: 1,
  polygonTypes: 1,
  subregionIntervalType: 1100,
  city: '55999ad00000010001000000',
};

const polygonRequestBody = {
  domainTypes: [1],
  polygonTypes: [1],
  subregionIntervalTypes: [1100],
  city: '55999ad00000010001000000',
};

const banPolygonFilters = {
  domainTypes: 1,
  polygonTypes: 2,
  subregionIntervalType: 1100,
  city: '55999ad00000010001000000',
};

const banPolygonRequestBody = {
  domainTypes: [1],
  polygonTypes: [2],
};

describe('Polygon Filters', () => {
  it('should return correct polygon request body', () => {
    const filteredPolygon = getPolygonReqBody({ filters: polygonFilters });
    expect(filteredPolygon).toEqual(polygonRequestBody);
  });
  it('should return correct polygon request for ban polygon types', () => {
    const filteredBanPolygon = getPolygonReqBody({ filters: banPolygonFilters });
    expect(filteredBanPolygon).toEqual(banPolygonRequestBody);
  });
});
