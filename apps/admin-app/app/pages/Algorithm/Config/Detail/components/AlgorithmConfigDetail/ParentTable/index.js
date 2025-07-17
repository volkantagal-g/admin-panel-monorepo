import { useSelector } from 'react-redux';

import { useMemo } from 'react';

import { Card } from 'antd';

import { useTranslation } from 'react-i18next';

import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import { getNestedParents } from '@app/pages/Algorithm/Config/utils';
import RelatedTableBase from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/RelatedTableBase';

const ParentTable = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const configDetailData = useSelector(configDetailSelector.getData);
  const configDetailIsPending = useSelector(configDetailSelector.getIsPending);

  const parentData = useMemo(() => {
    return getNestedParents(configDetailData).reverse();
  }, [configDetailData]);

  return (

    <Card title={t('algorithmConfigPage:PARENTS')}>
      <RelatedTableBase
        data={parentData}
        isPending={configDetailIsPending}
      />
    </Card>
  );
};

export default ParentTable;
