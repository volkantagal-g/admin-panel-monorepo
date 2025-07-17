import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';
import { Button, Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { ReloadOutlined, CopyOutlined } from '@ant-design/icons';

import { configDetailSelector, configValueSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import { Creators } from '@app/pages/Algorithm/Config/Detail/redux/actions';

const InheritedConfigValueCard = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();

  const configDetailData = useSelector(configDetailSelector.getData);
  const configValueData = useSelector(configValueSelector.getData);
  const configValueIsPending = useSelector(configValueSelector.getIsPending);

  const reloadData = useCallback(() => {
    dispatch(Creators.getConfigValueRequest({ key: configDetailData.key, namespace: configDetailData.namespace }));
  }, [dispatch, configDetailData]);

  return (
    <Card
      extra={(
        <>
          <Button
            onClick={() => {
              copy(JSON.stringify(configValueData));
              message.success(t('global:COPIED_TO_CLIPBOARD'), 1);
            }}
            type="success"
            icon={<CopyOutlined />}
            style={{ marginRight: 4 }}
            disabled={configValueIsPending}
          >
            {t('COPY')}
          </Button>
          <Button onClick={reloadData} type="info" icon={<ReloadOutlined />} loading={configValueIsPending}>{t('RELOAD')}</Button>
        </>
      )}
      title={t('algorithmConfigPage:INHERITED_CONFIG_VALUE')}
      loading={configValueIsPending}
    >
      <pre>{JSON.stringify(configValueData, null, 2)}</pre>
    </Card>
  );
};

export default InheritedConfigValueCard;
