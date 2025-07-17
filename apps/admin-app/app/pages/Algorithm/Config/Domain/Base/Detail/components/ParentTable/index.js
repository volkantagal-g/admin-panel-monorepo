import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Button, Card, Table, Tag } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import { getNestedParents } from '@app/pages/Algorithm/Config/utils';
import { DOMAIN_DETAIL_ROUTES_BY_NAMESPACES } from '@app/pages/Algorithm/Config/Domain/constants';

const ParentTable = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const configDetailData = useSelector(algorithmDomainConfigDetailSelector.getData);
  const configDetailIsPending = useSelector(algorithmDomainConfigDetailSelector.getIsPending);

  const parentData = useMemo(() => {
    return getNestedParents(configDetailData).reverse();
  }, [configDetailData]);

  const cols = useMemo(() => {
    return [
      {
        title: t('algorithmConfigPage:ALIAS'),
        key: 'alias',
        dataIndex: 'alias',
      },
      {
        title: t('algorithmConfigPage:TYPE'),
        key: 'type',
        dataIndex: 'type',
        render: type => (<Tag color="purple">{type}</Tag>),
      },
      {
        title: t('algorithmConfigPage:KEY'),
        key: 'key',
        dataIndex: 'key',
      },
      {
        title: t('global:ACTION'),
        key: 'action',
        fixed: 'left',
        render: record => {
          const action = {
            onDetailClick: () => {
              const configObjectId = get(record, 'key', '');
              const route = get(DOMAIN_DETAIL_ROUTES_BY_NAMESPACES, record?.namespace);
              const path = route.path.replace(':key', configObjectId);
              window.open(path, '_blank');
            },
          };

          return (
            <Button type="default" size="small" onClick={action.onDetailClick}>
              {t('global:DETAIL')}
            </Button>
          );
        },
      },
    ];
  }, [t]);

  return (

    <Card title={t('algorithmConfigPage:PARENTS')}>
      <Table
        loading={configDetailIsPending}
        dataSource={parentData}
        columns={cols}
        pagination={false}
      />
    </Card>
  );
};

export default ParentTable;
