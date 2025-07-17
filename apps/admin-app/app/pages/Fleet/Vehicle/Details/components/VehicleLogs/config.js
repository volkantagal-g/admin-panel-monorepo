import { get, find } from 'lodash';
import { Popover, Button } from 'antd';
import moment from 'moment';

import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';

export const tableColumns = ({ t, cities, warehouses }) => {
  const getJsonContent = jsonObj => (
    <div>
      <pre>{JSON.stringify(jsonObj, null, 2)}</pre>
    </div>
  );

  return [
    {
      title: t('VEHICLE_LOGS_DETAIL.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: createdAt => {
        return createdAt ? moment(createdAt).format('YYYY-MM-DD HH:mm') : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_CITY'),
      dataIndex: 'oldCity',
      key: 'oldCity',
      width: 200,
      render: oldCity => {
        return oldCity ? cities.find(({ _id }) => _id === oldCity)?.name[getLangKey()] ?? '' : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_CITY'),
      dataIndex: 'newCity',
      key: 'newCity',
      width: 200,
      render: newCity => {
        return newCity ? cities.find(({ _id }) => _id === newCity)?.name[getLangKey()] ?? '' : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_WAREHOUSE'),
      dataIndex: 'oldWarehouse',
      key: 'oldWarehouse',
      width: 200,
      render: oldWarehouse => {
        return oldWarehouse ? get(find(warehouses, { id: oldWarehouse }), 'name') : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_WAREHOUSE'),
      dataIndex: 'newWarehouse',
      key: 'newWarehouse',
      width: 200,
      render: newWarehouse => {
        const warehouseName = get(find(warehouses, { id: newWarehouse }), 'name');
        return warehouseName;
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_FRANCHISE'),
      dataIndex: 'oldFranchise',
      key: 'oldFranchise',
      width: 200,
      render: oldFranchise => (
        oldFranchise ?
          (
            <RedirectButtonV2
              text={oldFranchise}
              to={ROUTE.MARKET_FRANCHISE_DETAIL.path.replace(':id', oldFranchise)}
              permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL}
              target="_blank"
              type="link"
              size="small"
              iconComponent
            />
          ) : ''
      ),
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_FRANCHISE'),
      dataIndex: 'newFranchise',
      key: 'newFranchise',
      width: 200,
      render: newFranchise => (
        newFranchise ? (
          <RedirectButtonV2
            text={newFranchise}
            to={ROUTE.MARKET_FRANCHISE_DETAIL.path.replace(':id', newFranchise)}
            permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL}
            target="_blank"
            type="link"
            size="small"
            iconComponent
          />
        ) : ''
      ),
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_LICENCE'),
      dataIndex: 'oldLicence',
      key: 'oldLicence',
      width: 100,
      render: oldLicence => {
        return oldLicence ? (
          <Popover content={getJsonContent(oldLicence)} title="Title" trigger="click">
            <Button size="small">{t('VEHICLE_LOGS_DETAIL.OLD_LICENCE')}</Button>
          </Popover>
        ) : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_LICENCE'),
      dataIndex: 'newLicence',
      key: 'newLicence',
      width: 100,
      render: newLicence => {
        return newLicence ? (
          <Popover content={getJsonContent(newLicence)} title="Title" trigger="click">
            <Button size="small">{t('VEHICLE_LOGS_DETAIL.NEW_LICENCE')}</Button>
          </Popover>
        ) : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_PLATE'),
      dataIndex: 'oldPlate',
      key: 'oldPlate',
      width: 100,
      render: oldPlate => {
        return oldPlate || '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_PLATE'),
      dataIndex: 'newPlate',
      key: 'newPlate',
      width: 100,
      render: newPlate => {
        return newPlate || '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.OLD_TAGS'),
      dataIndex: 'oldTags',
      key: 'oldTags',
      width: 200,
      render: oldTags => {
        return oldTags?.length > 0 ? (
          oldTags.map(oldTag => <li key={oldTag}>{oldTag}</li>)
        ) : '';
      },
    },
    {
      title: t('VEHICLE_LOGS_DETAIL.NEW_TAGS'),
      dataIndex: 'newTags',
      key: 'newTags',
      width: 200,
      render: newTags => {
        return newTags?.length > 0 ? (
          newTags.map(newTag => <li key={newTag}>{newTag}</li>)
        ) : '';
      },
    },
  ];
};
