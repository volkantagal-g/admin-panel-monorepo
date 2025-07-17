import { useDispatch, useSelector } from 'react-redux';

import { Card } from 'antd';

import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { Creators } from '../../../redux/actions';
import { configDetailSelector, linkedConfigsSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import RelatedTableBase from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/RelatedTableBase';

const LinkedCustomConfigsTable = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const configData = useSelector(configDetailSelector.getData);
  const linkedConfigs = useSelector(linkedConfigsSelector.getData);
  const linkedConfigsIsPending = useSelector(linkedConfigsSelector.getIsPending);
  const configDetailIsPending = useSelector(configDetailSelector.getIsPending);

  useEffect(() => {
    if (configData?.isCustom) {
      dispatch(Creators.getLinkedConfigsRequest({ key: configData?.key, namespace: configData.namespace }));
    }
  }, [dispatch, configData]);

  return (
    <Card
      title={t('algorithmConfigPage:LINKED_CONFIGS')}
    >
      <RelatedTableBase
        data={linkedConfigs}
        isPending={configDetailIsPending || linkedConfigsIsPending}
      />
    </Card>
  );
};

export default LinkedCustomConfigsTable;
