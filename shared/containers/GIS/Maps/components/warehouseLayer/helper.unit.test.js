import { getWarehouseMarkerIcon } from './helper';

const servingG10Properties = {
  domainTypes: [
    1,
  ],
  status: 100,
};

const servingG30Properties = {
  domainTypes: [
    3,
  ],
  status: 100,
};
const servingVoyagerProperties = {
  domainTypes: [
    4,
  ],
  status: 100,
};

const servingMergedProperties = {
  domainTypes: [
    1, 3,
  ],
  status: 100,
};

describe('Ban Polygon Requests', () => {
  it('should return warehouseIcons', () => {
    const g10Icon = getWarehouseMarkerIcon(servingG10Properties);
    const g30Icon = getWarehouseMarkerIcon(servingG30Properties);
    const voyagerIcon = getWarehouseMarkerIcon(servingVoyagerProperties);
    const mergedIcon = getWarehouseMarkerIcon(servingMergedProperties);

    expect(g10Icon).toEqual('IMAGE_MOCK');
    expect(g30Icon).toEqual('IMAGE_MOCK');
    expect(voyagerIcon).toEqual('IMAGE_MOCK');
    expect(mergedIcon).toEqual('IMAGE_MOCK');
  });
});
