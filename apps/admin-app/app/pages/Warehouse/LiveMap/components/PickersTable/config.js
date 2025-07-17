import { Typography } from 'antd';

import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import permKeys from '@shared/shared/permKey.json';

const { Text } = Typography;

export const getTableColumns = ({ t }) => {
  return [
    {
      title: t('PICKER'),
      dataIndex: 'name',
      key: 'name',
      render: name => <Text strong>{name}</Text>,
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: 50,
      render: id => {
        return (
          <RedirectButton
            to={`/picker/detail/${id}`}
            text={t('DETAIL')}
            permKey={permKeys.PAGE_PICKER_DETAIL}
            target="_blank"
            size="small"
          />
        );
      },
    },
  ];
};
