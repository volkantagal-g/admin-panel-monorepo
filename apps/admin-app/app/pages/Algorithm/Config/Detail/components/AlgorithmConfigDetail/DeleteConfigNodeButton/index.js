import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { Creators } from '../../../redux/actions';
import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';

const DeleteConfigNodeButton = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();

  const namespace = useSelector(configDetailSelector.getNamespace);
  const configData = useSelector(configDetailSelector.getData);
  const configDeleting = useSelector(configDetailSelector.configDeleting);

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: t('CONFIG_DELETE'),
      icon: <ExclamationCircleFilled />,
      okText: t('DELETE'),
      okType: 'danger',
      cancelText: t('NO'),
      onOk() {
        dispatch(Creators.deleteConfigNodeRequest({ namespace, key: configData?.key }));
      },
    });
  };

  return (
    <Button
      onClick={showDeleteConfirm}
      type="danger"
      icon={<DeleteOutlined />}
      style={{ marginRight: 4 }}
      loading={configDeleting}
    />
  );
};

export default DeleteConfigNodeButton;
