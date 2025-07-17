import axios from '@shared/axios/common';

export type Placeholder = {
  en?: string;
  tr?: string;
  _id: string;
};

export type Title = {
  en: string;
  tr: string;
};

export type TagPayload = {
  _id?: string;
  title?: Title;
  priority?: number;
  reason?: string;
  name?: Title;
};

export type RatingTag = {
  placeholder: Placeholder;
  rating: number;
  tags: TagPayload[];
};
export type Tag = {
  priority: number;
  rating: number;
  title: Title;
  reason: string;
  id?: string;
  domainType: number;
};

export type PlaceholderPayload = {
  title: Title;
  rating: number;
  domainType: number;
};
export const getRatingTags = ({ domainType }: {
  domainType: string;
}): Promise<RatingTag[]> => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/getRatingTags',
    data: { domainType },
  }).then(response => {
    return response.data;
  });
};
export const createRatingTag = ({ body }: { body: Tag }) => {
  const data = { ...body };
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/createRatingTag',
    data,
  }).then(response => {
    return response.data;
  });
};
export const multiUpdateRatingTags = ({ body: data }: {
  body: Tag[];
}) => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/multiUpdateRatingTags',
    data,
  }).then(response => {
    return response.data;
  });
};
export const updateRatingTag = ({ body: data }: { body: Tag }) => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/updateRatingTag',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateRatingPlaceholder = ({ body: data }: {
  body: PlaceholderPayload;
}) => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/updateRatingPlaceholder',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createRatingPlaceholder = ({ body: data }: {
  body: PlaceholderPayload;
}) => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/createRatingPlaceholder',
    data,
  }).then(response => {
    return response.data;
  });
};
export const deleteRatingTag = ({ id }: { id: string }) => {
  return axios({
    method: 'POST',
    url: '/marketOrderRatings/deleteRatingTag',
    data: { id },
  }).then(response => {
    return response.data;
  });
};
