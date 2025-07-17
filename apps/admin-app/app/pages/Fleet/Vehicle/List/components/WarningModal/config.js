import { Tag } from 'antd';

import { BULK_OPERATION_FAILURE_TYPES } from './constant';

export const bulkUploadWarningColumns = ({ t }) => {
  return [
    {
      title: t('marketVehicle:FAILURE_REASON'),
      dataIndex: 'failureReason',
      width: '200px',
      render: failureReason => t(`marketVehicle:FAILURE_REASONS.${BULK_OPERATION_FAILURE_TYPES[failureReason]}`),
    },
    {
      title: t('marketVehicle:PLATE'),
      dataIndex: 'plates',
      width: '200px',
      render: failedPlates => {
        return failedPlates.map(plate => <Tag key={plate} color="purple">{plate}</Tag>);
      },
    },
  ];
};
