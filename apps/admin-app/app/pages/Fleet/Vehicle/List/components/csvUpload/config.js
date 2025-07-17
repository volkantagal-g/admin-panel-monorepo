export const newVehicleListTableColumns = ({ t }) => {
  return [
    {
      title: `${t('marketVehicle:VEHICLE_TYPE')}*`,
      dataIndex: 'vehicleType',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:WAREHOUSE_ID')}*`,
      dataIndex: 'warehouseId',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:CITY')}*`,
      dataIndex: 'city',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:FIRST_REGISTRY')}*`,
      dataIndex: 'firstRegistry',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:PLATE')}*`,
      dataIndex: 'plate',
      width: '200px',
    },
    {
      title: t('marketVehicle:FRANCHISE_ID'),
      dataIndex: 'franchiseId',
      width: '200px',
    },
    {
      title: t('marketVehicle:INSPECTION_ON_DATE'),
      dataIndex: 'inspectionValidityDate',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:TAGS')}*`,
      dataIndex: 'tags',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:OWNERSHIP_STATUS')}*`,
      dataIndex: 'ownershipStatus',
      width: '200px',
    },
    {
      title: t('marketVehicle:COUNTRY_ID'),
      dataIndex: 'countryId',
      width: '200px',
    },
  ];
};

export const activeListTableColumns = ({ t }) => {
  return [
    {
      title: `${t('marketVehicle:PLATE')}*`,
      dataIndex: 'plate',
      width: '200px',
    },
    {
      title: `${t('marketVehicle:ACTIVE')}*`,
      dataIndex: 'active',
      width: '200px',
    },
  ];
};
