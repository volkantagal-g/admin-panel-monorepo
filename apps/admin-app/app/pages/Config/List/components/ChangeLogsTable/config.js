import { Button, Tag } from 'antd';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { isMobile } from '@shared/utils/common';

export const getTableColumns = ({
  t,
  onClickShowJSONModalBtn: handleClickShowJSONModalBtn,
}) => {
  return [
    {
      title: t('KEY'),
      dataIndex: 'uniqueIdentifier',
      key: 'uniqueIdentifier',
      width: isMobile() ? 300 : 450,
      render: val => {
        return <CopyToClipboard message={val} />;
      },
    },
    {
      title: t('TYPE'),
      dataIndex: 'actionType',
      key: 'actionType',
      width: 80,
      render: (val, { isChild }) => {
        if (isChild) {
          return undefined;
        }
        return <Tag>{val}</Tag>;
      },
    },
    {
      title: t('VALUE'),
      render: (_, config) => (
        <Button
          size="small"
          onClick={() => handleClickShowJSONModalBtn(config)}
          disabled={config.actionType === 'delete'}
        >
          {t('global:SHOW_AS_JSON')}
        </Button>
      ),
    },
    {
      title: t('TIMESTAMP_UTC'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 200,
    },
    {
      title: t('ACTION_TAKEN_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
      width: isMobile() ? 200 : 280,
    },
  ];
};
