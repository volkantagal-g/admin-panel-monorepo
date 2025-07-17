import axios from '@shared/axios/common';

type UpdateComponentData = { countries: ICountry[], hasGlobalAccess: boolean };

export const getComponents = ({ limit, offset }: { limit: number, offset: number }): Promise<ComponentType[]> => {
  return axios({
    method: 'POST',
    url: '/component/getComponents',
  }).then(response => {
    return response.data;
  });
};

export const getComponentById = ({ id }: { id: MongoIDType }): Promise<ComponentType> => {
  return axios({
    method: 'POST',
    url: '/component/getComponent',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createComponent = ({ body: data }: { body: Omit<ComponentType, '_id'> }): Promise<ComponentType> => {
  return axios({
    method: 'POST',
    url: '/component/createComponent',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateComponent = ({ id, updateData }: { id: MongoIDType, updateData: UpdateComponentData }): Promise<ComponentType> => {
  return axios({
    method: 'POST',
    url: '/component/updateComponent',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};
