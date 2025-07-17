import { TFunction } from 'react-i18next';
import { Tag, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import { isEmpty, isNil } from 'lodash';

import RedirectText from '@shared/components/UI/RedirectText';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import {
  CONTROL_NEEDED_AFTER_DAYS,
  VEHICLE_COMPLIANCE_RECORD_TYPES,
  DEFAULT_DATE_FORMAT, ASSET_STATUSES,
  VEHICLE_TABLE_TABS,
} from '@app/pages/Employee/AssetManagement/constants';
import { IEmployee } from '@app/pages/Employee/types';

export const getTableColumns = ({
  t,
  moduleClasses,
  activeTabKey,
}: {
  t: TFunction,
  moduleClasses: { [key: string]: string },
  activeTabKey: string,
}) => {
  const isControlNeededVehiclesTab = activeTabKey === VEHICLE_TABLE_TABS.CONTROL_NEEDED_VEHICLES;
  return [
    {
      title: t('assetManagement:LICENCE_NUMBER'),
      key: 'uniqueIdentifier',
      width: 90,
      render: (data: Asset) => {
        return (
          <RedirectText
            to={ROUTE.ASSET_MANAGEMENT_DETAIL.path.replace(':id', data?._id)}
            text={data?.uniqueIdentifier}
            permKey={permKey.PAGE_ASSET_MANAGEMENT_DETAIL}
            target="_blank"
            isIconVisible={false}
          />
        );
      },
    },
    {
      title: t('assetManagement:VEHICLE_IS_COMMON_CAR'),
      dataIndex: ['fieldValues', 'vehicleIsCommonCar'],
      key: 'vehicleIsCommonCar',
      width: 70,
      align: 'center',
      render: (isCommonCar: boolean) => (
        <Tag
          color={isCommonCar ? 'green' : 'red'}
          className={moduleClasses.tableTag}
        >
          {isCommonCar ? t('YES') : t('NO')}
        </Tag>
      ),
    },
    {
      title: t('assetManagement:VEHICLE_BRAND'),
      dataIndex: ['fieldValues', 'vehicleBrand'],
      key: 'vehicleBrand',
      width: 80,
      render: (vehicleBrand: number) => t(`VEHICLE_BRANDS.${vehicleBrand}`),
    },
    {
      title: t('assetManagement:VEHICLE_MODEL'),
      dataIndex: ['fieldValues', 'vehicleModel'],
      key: 'vehicleModel',
      width: 120,
      render: (vehicleModel: number) => (
        <Tooltip title={t(`VEHICLE_MODELS.${vehicleModel}`)}>
          <Text ellipsis>{t(`VEHICLE_MODELS.${vehicleModel}`)}</Text>
        </Tooltip>
      ),
    },
    {
      title: t('assetManagement:VEHICLE_MODEL_YEAR'),
      dataIndex: ['fieldValues', 'vehicleModelYear'],
      key: 'vehicleModelYear',
      width: 100,
      align: 'center',
    },
    {
      title: t('assetManagement:VEHICLE_INSPECTION_VALIDATION_END'),
      dataIndex: ['vehicleComplianceRecords', VEHICLE_COMPLIANCE_RECORD_TYPES.INSPECTION, 'endDate'],
      key: 'vehicleInspectionValidationEnd',
      width: 190,
      align: 'center',
      render: (endDate: string) => {
        const isFiveDaysLeft = moment(endDate).diff(moment(), 'days') <= CONTROL_NEEDED_AFTER_DAYS;
        return !isNil(endDate) ? (
          <div
            className={(isFiveDaysLeft && isControlNeededVehiclesTab) ? moduleClasses.controlNeededTableCell : ''}
          >
            {moment(endDate).format(DEFAULT_DATE_FORMAT) }
          </div>
        ) : null;
      },
    },
    {
      title: t('assetManagement:TRAFFIC_INSURANCE_VALIDATION_END'),
      dataIndex: ['vehicleComplianceRecords', VEHICLE_COMPLIANCE_RECORD_TYPES.INSURANCE, 'endDate'],
      key: 'vehicleInsuranceValidationEnd',
      align: 'center',
      width: 190,
      render: (endDate: string) => {
        const isFiveDaysLeft = moment(endDate).diff(moment(), 'days') <= CONTROL_NEEDED_AFTER_DAYS;
        return !isNil(endDate) ? (
          <div
            className={(isFiveDaysLeft && isControlNeededVehiclesTab) ? moduleClasses.controlNeededTableCell : ''}
          >
            {moment(endDate).format(DEFAULT_DATE_FORMAT) }
          </div>
        ) : null;
      },
    },
    {
      title: t('assetManagement:FINANCIAL_LEASING_END_DATE'),
      dataIndex: ['fieldValues', 'financialLeasingValidationEndDate'],
      key: 'financialLeasingValidationEndDate',
      align: 'center',
      width: 190,
      render: (endDate: string) => {
        return endDate ? moment(endDate).format(DEFAULT_DATE_FORMAT) : null;
      },
    },
    {
      title: t('assetManagement:SHORT_LONG_TERM_RENTING_END_DATE'),
      dataIndex: ['fieldValues', 'shortLongTermRentingValidationEndDate'],
      key: 'shortLongTermRentingValidationEndDate',
      align: 'center',
      width: 220,
      render: (endDate: string) => {
        return endDate ? moment(endDate).format(DEFAULT_DATE_FORMAT) : null;
      },
    },
    {
      title: t('assetManagement:ASSIGNED_TO'),
      dataIndex: 'assignees',
      key: 'assignees',
      align: 'center',
      width: 180,
      render: (assignees: IEmployee[]) => (!isEmpty(assignees) ? (assignees || [])?.map((employee: IEmployee) => employee?.workEmail)
        : t(`assetManagement:ASSET_STATUSES.${ASSET_STATUSES.ASSIGNABLE}`)),
    },
  ];
};
