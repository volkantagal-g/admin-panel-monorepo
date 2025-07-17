import moment from 'moment';

export const courierListParams = ({ general, courierStarRating, totalOrderCount }) => {
  const params = {};

  params.cityIds = general?.city;
  params.warehouseIds = general?.warehouse;
  params.startDate = moment(general?.date[0]).toISOString();
  params.endDate = moment(general?.date[1]).toISOString();
  if (totalOrderCount?.orderCount > 0) {
    params.orderCountRange = totalOrderCount?.orderCount;
  }
  if (courierStarRating?.rating > 0) {
    params.starRatingRange = courierStarRating?.rating;
  }

  return params;
};

export const createSegmentParams = ({ name, segmentType, filter, targetIds, client }) => {
  const params = {};
  const criteria = {};
  if (filter?.courierStarRating?.rating > 0) {
    criteria.courierStarRating = filter?.courierStarRating;
  }
  if (filter?.totalOrderCount?.count !== null || filter?.totalOrderCount?.count > 0) {
    criteria.totalOrderCount = filter?.totalOrderCount;
  }

  if (filter?.general?.city.length > 0 && filter?.general?.warehouse.length > 0 && filter?.general?.date.length > 0) {
    const updated = filter?.general;
    updated.date = [moment(updated?.date[0]).toISOString(), moment(updated?.date[1]).toISOString()];
    criteria.general = updated;
  }

  params.name = name;
  params.targetIds = targetIds;
  params.type = segmentType;
  params.client = client;
  params.criteria = criteria;
  return params;
};
