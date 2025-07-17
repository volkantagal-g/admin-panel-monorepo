import moment from 'moment';

import { DetailButton } from '@shared/components/UI/List';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { SEGMENT_TYPE_NAMES } from '../constants';

export const tableColumns = t => {
  return [
    {
      title: t('global:ID'),
      dataIndex: '_id',
      key: '_id',
      width: '200px',
      render: _id => <CopyToClipboard message={_id} />,
    },
    {
      title: t('warehouseSegmentPage:LIST.SEGMENT_TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: '120px',
      render: type => SEGMENT_TYPE_NAMES[type],
    },
    {
      title: t('warehouseSegmentPage:LIST.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '120px',
    },
    {
      title: t('warehouseSegmentPage:LIST.IS_DEFAULT'),
      dataIndex: 'isDefault',
      key: 'isDefault',
      width: '120px',
      render: isDefault => (isDefault ? t('global:YES') : t('global:NO')),
    },
    {
      title: t('warehouseSegmentPage:LIST.DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '120px',
      render: createdAt => moment(createdAt).format(getLocalDateTimeFormat()),
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      width: '120px',
      render: _id => <DetailButton _id={_id} urlPath="/warehouseSegment/detail/" />,
    },
  ];
};
