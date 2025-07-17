import { get } from 'lodash';

import Excel from '@shared/utils/excel';
import { filterVehicleListV2 } from '@shared/api/fleet';
import { vehicleListRequestParams } from '../../../utils';

export const fields = [
  {
    key: 'warehouse',
    title: 'Warehouse',
    default: '',
  },
  {
    key: 'franchise',
    title: 'Franchise',
    default: '',
  },
  {
    key: 'city',
    title: 'City',
    default: '',
  },
  {
    key: 'vehicleType',
    title: 'Vehicle Type',
    default: '',
  },
  {
    key: 'plate',
    title: 'Plate',
    default: '',
  },
  {
    key: 'brand',
    title: 'Brand',
    default: '',
  },
  {
    key: 'licenceNumber',
    title: 'Licence Number',
    default: '',
  },
  {
    key: 'chasisNumber',
    title: 'Chasis Number',
    default: '',
  },
  {
    key: 'licenceSeries',
    title: 'Licence Series',
    default: '',
  },
  {
    key: 'engineNumber',
    title: 'Engine Details',
    default: '',
  },
  {
    key: 'color',
    title: 'Color',
    default: '',
  },
  {
    key: 'modelYear',
    title: 'Model Year',
    default: '',
  },
  {
    key: 'grade',
    title: 'Grade',
    default: '',
  },
  {
    key: 'bodyType',
    title: 'Body Type',
    default: '',
  },
  {
    key: 'inspectionDate',
    title: 'Inspection Date',
    default: '',
  },
  {
    key: 'firstRegistrationDate',
    title: 'First Registration Date',
    default: '',
  },
  {
    key: 'registrationDate',
    title: 'Registration Date',
    default: '',
  },
  {
    key: 'tags',
    title: 'Tags',
    default: '',
  },
  {
    key: 'licenceOwner',
    title: 'Licence Owner',
    default: '',
  },
  {
    key: 'licencePicture',
    title: 'Licence Picture',
    default: '',
  },
  {
    key: 'model',
    title: 'Model',
    default: '',
  },
  {
    key: 'ownershipType',
    title: 'Ownership Type',
    default: '',
  },
];

export const exportVehicleToExcel = res => {
  const vehicleList = [];
  res?.vehicles?.forEach(vehicle => {
    const newVehicle = {
      vehicleType: get(vehicle, 'constraint.name'),
      plate: get(vehicle, 'plate'),
      warehouse: get(vehicle, 'warehouse'),
      franchise: get(vehicle, 'franchise'),
      city: get(vehicle, 'city'),
      licenceOwner: get(vehicle, 'licence.licenceOwner'),
      licenseSeries: get(vehicle, 'licence.licenceSerial'),
      tags: get(vehicle, 'tags'),
      brand: get(vehicle, 'licence.brand'),
      engineNumber: get(vehicle, 'licence.engineNumber'),
      chasisNumber: get(vehicle, 'licence.identityNumber'),
      modelYear: get(vehicle, 'licence.modelYear'),
      grade: get(vehicle, 'licence.class'),
      inspectionDate: get(vehicle, 'licence.inspectionValidityDate'),
      firstRegistrationDate: get(vehicle, 'licence.firstRegistrationDate'),
      registrationDate: get(vehicle, 'licence.registrationDate'),
      bodyType: get(vehicle, 'licence.kind'),
      color: get(vehicle, 'licence.color'),
      licencePicture: get(vehicle, 'licence.licenceImage'),
      model: get(vehicle, 'licence.tradeName'),
      licenceNumber: get(vehicle, 'licence.licenceNumber'),
      ownershipType: get(vehicle, 'ownershipType'),
    };
    vehicleList.push(newVehicle);
  });
  return new Excel({
    name: 'vehicleList',
    data: vehicleList,
    fields,
  }).export({ asBase64: true });
};

export const VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT = 10000;

export const exportVehicle = async (filters, excel) => {
  const allVehicles = [];
  const pageNumber = 1;

  const firstRequestParameters = vehicleListRequestParams({
    ...filters,
    rowsPerPage: VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT,
    currentPage: pageNumber,
    excel,
    withTotalCount: true,
  });
  const firstResponse = await filterVehicleListV2(firstRequestParameters);

  const { totalCount, vehicles } = firstResponse;
  allVehicles.push(vehicles);

  if (totalCount > VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT) {
    const nextPromises = [];
    const totalPageCount = Math.ceil(totalCount / VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT);
    for (let currentPage = pageNumber + 1; currentPage <= totalPageCount; ++currentPage) {
      const parameters = vehicleListRequestParams({
        ...filters,
        rowsPerPage: VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT,
        currentPage,
        excel,
      });
      const promise = new Promise(resolve => {
        const res = filterVehicleListV2(parameters);
        resolve(res);
      });
      nextPromises.push(promise);
    }

    const allResponses = await Promise.all(nextPromises);
    allVehicles.push(allResponses.map(page => page.vehicles).flat());
  }

  exportVehicleToExcel({ vehicles: allVehicles.flat() });
};
