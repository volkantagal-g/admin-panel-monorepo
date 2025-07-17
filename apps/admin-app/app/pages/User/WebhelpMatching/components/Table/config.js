import { Button, Popconfirm } from 'antd';
import { get } from 'lodash';

import { t } from '@shared/i18n';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { getUser } from '@shared/redux/selectors/auth';

export const getTableColumns = ({ handleShowSetWebhelpIdModal, handleRemoveWebhelpIdFromUser, hasPermissionToEditWebhelpId }) => {
  return [
    {
      title: t('global:EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('userPage:WEBHELP_ID'),
      dataIndex: 'webhelpAgentId',
      key: 'webhelpAgentId',
      render: webhelpAgentId => (
        <CopyToClipboard message={webhelpAgentId}>webhelpAgentId</CopyToClipboard>
      ),
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: record => {
        if (!hasPermissionToEditWebhelpId) {
          return undefined;
        }

        return (
          <>
            <Button
              type="default"
              size="small"
              onClick={() => {
                handleShowSetWebhelpIdModal({ user: record });
              }}
            >
              {t('global:EDIT')}
            </Button>
            {
              record.webhelpAgentId && (
                <Popconfirm
                  key="removeWebhelpId"
                  title={t('userPage:CONFIRM_REMOVE_WEBHELP_ID')}
                  okText={t('OK')}
                  cancelText={t('CANCEL')}
                  onConfirm={() => {
                    handleRemoveWebhelpIdFromUser({ user: record });
                  }}
                >
                  <Button
                    type="danger"
                    size="small"
                  >
                    {t('global:REMOVE')}
                  </Button>
                </Popconfirm>
              )
            }
          </>
        );
      },
    },
  ];
};

export const exampleCsv = {
  getirEmail: get(getUser(), 'email'),
  webhelpId: '5f462f3912',
};

export const maxUpdateLimit = 1000;
