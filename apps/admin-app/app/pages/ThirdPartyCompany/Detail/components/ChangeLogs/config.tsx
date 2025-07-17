import { Button } from 'antd';

import moment, { MomentInput } from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

export const getTableColumns = ({
  t,
  onClickShowJSONModal,
}: { t: Function, onClickShowJSONModal: Function }) => {
  return [
    {
      title: t('thirdPartyCompany:CHANGE_LOG_TABLE.UNIQUE_IDENTIFIER'),
      dataIndex: 'uniqueIdentifier',
      key: 'uniqueIdentifier',
      render: (uniqueIdentifier: String) => {
        return <CopyToClipboard message={uniqueIdentifier} />;
      },
    },
    {
      title: t('thirdPartyCompany:CHANGE_LOG_TABLE.ACTION_TYPE'),
      dataIndex: 'actionType',
      key: 'actionType',
    },
    {
      title: t('thirdPartyCompany:CHANGE_LOG_TABLE.OLD_AND_NEW_VALUE'),
      key: 'oldAndNewValue',
      render: (_: any, changeLog: DynamicObjectType) => {
        return (
          <Button size="small" onClick={() => onClickShowJSONModal(changeLog)}>
            {t('global:SHOW_AS_JSON')}
          </Button>
        );
      },
    },
    {
      title: t('thirdPartyCompany:CHANGE_LOG_TABLE.TIMESTAMP_UTC'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (createdAt: MomentInput) => moment.utc(createdAt).toISOString(),
    },
    {
      title: t('thirdPartyCompany:CHANGE_LOG_TABLE.ACTION_TAKEN_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
    },
  ];
};
