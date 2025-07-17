import { Button, Popconfirm, Table, Tag, Typography } from 'antd';
import { useMemo } from 'react';
import { get } from 'lodash';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';

import { Creators } from '../../../redux/actions';
import { ROUTE } from '@app/routes';
import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import { usePermission } from '@shared/hooks';
import { getPermKeyByNamespace } from '@app/pages/Algorithm/Config/utils';

const { Title } = Typography;

const expandedRow = (row, t) => (
  <div>
    <Title level={5}>{t('algorithmConfigPage:CONFIG_VALUE')}</Title>
    <pre>
      {JSON.stringify(row?.value, null, 2)}
    </pre>
    {row?.customConfigs?.length > 0 ? (
      <>
        <Title level={5}>{t('algorithmConfigPage:CUSTOM_CONFIGS')}</Title>
        <RelatedTableBase data={row.customConfigs} expandButton={false} />
      </>
    ) : null}
  </div>
);

const RelatedTableBase = ({
  data,
  isPending,
  unlinkButton = false,
  expandButton = true,
}) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { Can } = usePermission();
  const configDetailData = useSelector(configDetailSelector.getData);
  const namespace = useSelector(configDetailSelector.getNamespace);

  const cols = useMemo(() => {
    return [
      {
        title: t('algorithmConfigPage:ALIAS'),
        key: 'alias',
        dataIndex: 'alias',
        ellipsis: true,
      },
      {
        title: t('algorithmConfigPage:TYPE'),
        key: 'type',
        dataIndex: 'type',
        ellipsis: true,
        render: type => (<Tag color="purple">{type}</Tag>),
      },
      {
        title: t('algorithmConfigPage:KEY'),
        key: 'key',
        dataIndex: 'key',
        ellipsis: true,
      },
      {
        title: t('global:ACTION'),
        key: 'action',
        fixed: 'right',
        render: record => {
          const action = {
            onDetailClick: () => {
              const configObjectId = get(record, 'key', '');
              const path = ROUTE.ALGORITHM_CONFIG_DETAIL.path.replace(':key', configObjectId).replace(':namespace', namespace);
              window.open(path, '_blank');
            },
            unlinkClick: () => {
              dispatch(Creators.unlinkCustomConfigRequest({ namespace, leftKey: configDetailData.key, rightKey: record.key }));
            },
          };

          return (
            <>
              <Button type="default" size="small" onClick={action.onDetailClick}>
                {t('global:DETAIL')}
              </Button>
              {(unlinkButton) && (
                <Can permKey={getPermKeyByNamespace({ namespace })}>
                  <Popconfirm
                    title={t('algorithmConfigPage:COMMON_CONFIRM_TEXT')}
                    okText={t('OK')}
                    cancelText={t('CANCEL')}
                    onConfirm={action.unlinkClick}
                    key="addRoleModalConfirmButtonPopConfirm"
                  >
                    <Button
                      size="small"
                      type="danger"
                      className={classes.removeButton}
                    >
                      {t('global:REMOVE')}
                    </Button>
                  </Popconfirm>
                </Can>
              )}
            </>
          );
        },
      },
    ];
  }, [dispatch, classes, t, unlinkButton, configDetailData, namespace]);

  return (
    <Table
      loading={isPending}
      dataSource={data}
      columns={cols}
      pagination={false}
      expandable={expandButton ? {
        expandedRowRender: row => {
          return expandedRow(row, t);
        },
        expandIconColumnIndex: 3,
      } : null}
    />
  );
};

export default RelatedTableBase;
