import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, Table, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';

const LinkedConfigsTable = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const configDetailData = useSelector(algorithmDomainConfigDetailSelector.getData);
  const configDetailIsPending = useSelector(algorithmDomainConfigDetailSelector.getIsPending);

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
    ];
  }, [t]);

  return (

    <Card title={t('algorithmConfigPage:LINKED_CONFIGS')}>
      <Table
        loading={configDetailIsPending}
        dataSource={configDetailData?.customConfigs}
        columns={cols}
        pagination={false}
      />
    </Card>
  );
};

export default LinkedConfigsTable;
