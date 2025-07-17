import { Modal, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { Creators } from '@app/pages/Algorithm/Config/Detail/redux/actions';
import { configDetailSelector, configSchemaSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import useStyles from './styles';

const ConfigSchemaModal = ({ visible, setVisible }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const configSchemaData = useSelector(configSchemaSelector.getData);
  const configSchemaIsPending = useSelector(configSchemaSelector.getIsPending);
  const namespace = useSelector(configDetailSelector.getNamespace);

  useEffect(() => {
    dispatch(Creators.getConfigSchemaRequest({ namespace }));
  }, [dispatch, namespace]);

  return (
    <Modal
      title={t('algorithmConfigPage:CONFIG_SCHEMA')}
      visible={visible}
      onCancel={() => setVisible(false)}
      centered
      footer={null}
    >
      <Skeleton
        loading={configSchemaIsPending}
      >
        <pre className={classes.configSchemaModalContent}>{JSON.stringify(configSchemaData, null, 2)}</pre>
      </Skeleton>
    </Modal>
  );
};

export default ConfigSchemaModal;
