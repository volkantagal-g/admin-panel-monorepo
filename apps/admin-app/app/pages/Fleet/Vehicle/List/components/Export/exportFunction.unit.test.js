import { get } from 'lodash';

import axios from '@shared/axios/common';
import Excel from '@shared/utils/excel';
import { exportVehicleToExcel, exportVehicle, fields, VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT } from './exportFunction';
import { vehicleListRequestParams } from '../../../utils';

jest.mock('@shared/utils/excel');
jest.mock('@shared/axios/common');

const mockVehicles = [
  {
    _id: '5e998696316e7c17174fdc29',
    status: 2000,
    plate: '34COH025',
    constraint: {
      _id: '5daa2d6551cb0b0c4c22fcee',
      status: 100,
      name: 'Motor',
      type: 200,
      nameDescription: {
        en: 'Motorcycle',
        tr: 'Motosiklet',
        nl: 'Motor',
        de: 'Motorrad',
        fr: 'Moto',
        es: 'Motocicleta',
        it: 'Motociclo',
        pt: 'Motorizada',
        'en-US': 'Motorcycle',
      },
      constraints: {
        prohibitedProducts: [],
        weight: 29000,
        longestEdge: 45,
        volume: 90000,
        distance: 10000,
        duration: 3600,
        selectionPriority: 1000,
        polygonType: 0,
        batch: true,
        batchTaskLimit: 2,
        batchCostPerDistance: 100,
        batchCostPerDuration: 100,
        queue: true,
        queueMultiplier: 0,
        volumes: [],
        limitedProducts: [],
      },
      createdAt: '2019-10-18T21:23:49.352Z',
      updatedAt: '2022-01-25T12:21:17.636Z',
      country: '55999ad00000010000000000',
    },
    currentConstraints: {
      prohibitedProducts: [],
      weight: 29000,
      longestEdge: 45,
      volume: 90000,
      distance: 10000,
      duration: 3600,
      selectionPriority: 1000,
      polygonType: 0,
      batch: true,
      batchTaskLimit: 2,
      batchCostPerDistance: 100,
      batchCostPerDuration: 100,
      queue: true,
      queueMultiplier: 0,
      volumes: [],
      limitedProducts: [],
    },
    type: 200,
    country: '55999ad00000010000000000',
    warehouse: '55646fc47051560c00cc8398',
    courier: '619f3ee5bec00712bda06e3c',
    createdAt: '2020-04-17T10:36:06.874Z',
    updatedAt: '2022-01-17T12:32:53.158Z',
    franchise: '5b9928e4c102590004df6427',
    city: '55999ad00000010001000000',
    ownershipType: 1,
    licence: {
      licenceOwner: 'Getir Perakende Lojistik Anonim Şirketi',
      licenceImage:
        'https://drive.google.com/file/d/1cEAjx-Gme6HqSL3EJjIatRNDfFKtnHPv/view?usp=sharing',
      licenceSerial: 'ET',
      licenceNumber: 740095,
      firstRegistrationDate: '2020-01-21T00:00:00.000Z',
      registrationDate: '2020-01-21T00:00:00.000Z',
      tradeName: 'NSC1255WH',
      brand: 'Honda',
      modelYear: 2019,
      class: 'L3',
      kind: 'MOTOSİKLET (İKİ TEKERLİ)',
      color: 'Mor',
      engineNumber: 'JF75E5106173',
      identityNumber: 'LWBJF75A1K1106120',
      inspectionValidityDate: '2022-10-31T00:00:00.000Z',
    },
    tags: ['Dincer40', 'Dincer100'],
  },
];

describe('Fleet/Vehicle/List/components/Export', () => {
  afterEach(() => {
    Excel.mockClear();
    axios.mockClear();
  });

  describe('#exportVehicleToExcel', () => {
    it('should call Excel constructor and export method once', () => {
      const vehicleListResponse = { vehicles: mockVehicles };

      exportVehicleToExcel(vehicleListResponse);

      const manipulatedVehicleList = vehicleListResponse.vehicles.map(
        vehicle => {
          return {
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
            firstRegistrationDate: get(
              vehicle,
              'licence.firstRegistrationDate',
            ),
            registrationDate: get(vehicle, 'licence.registrationDate'),
            bodyType: get(vehicle, 'licence.kind'),
            color: get(vehicle, 'licence.color'),
            licencePicture: get(vehicle, 'licence.licenceImage'),
            model: get(vehicle, 'licence.tradeName'),
            licenceNumber: get(vehicle, 'licence.licenceNumber'),
            ownershipType: get(vehicle, 'ownershipType'),
          };
        },
      );
      expect(Excel).toHaveBeenCalledTimes(1);
      expect(Excel).toHaveBeenCalledWith({
        name: 'vehicleList',
        data: manipulatedVehicleList,
        fields,
      });
      const mockExcelInstance = Excel.mock.instances[0];
      const mockExportFunction = mockExcelInstance.export;
      expect(mockExportFunction).toHaveBeenCalledTimes(1);
      expect(mockExportFunction).toHaveBeenCalledWith({ asBase64: true });
    });
  });

  describe('#exportVehicle', () => {
    xit('should call filterVehicleList once', async () => {
      axios.mockResolvedValue({
        data: {
          totalCount: 1,
          vehicles: mockVehicles,
        },
      });

      await exportVehicle([1000, 2000], true);
      const params = vehicleListRequestParams({
        statuses: [1000, 2000],
        rowsPerPage: 10000,
        currentPage: 1,
        excel: true,
        withTotalCount: true,
      });
      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios).toHaveBeenCalledWith({
        method: 'POST',
        url: '/fleetManagement/filterVehicle',
        data: params,
      });
    });

    xit('should call filterVehicleList as much as TOTAL_COUNT_MULTIPLIER', async () => {
      const TOTAL_COUNT_MULTIPLIER = 5;
      const totalCount = VEHICLE_EXPORT_MAX_VEHICLE_PER_PAGE_COUNT * TOTAL_COUNT_MULTIPLIER;
      axios.mockResolvedValue({
        data: {
          totalCount,
          vehicles: mockVehicles,
        },
      });

      await exportVehicle([1000, 2000], true);
      expect(axios).toHaveBeenCalledTimes(TOTAL_COUNT_MULTIPLIER);
    });
  });
});
