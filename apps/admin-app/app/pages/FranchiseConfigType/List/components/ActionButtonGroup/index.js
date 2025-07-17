import { Button, Popconfirm, Space } from 'antd';

import { DeleteTwoTone } from '@ant-design/icons';

import { useSelector } from 'react-redux';

import { DetailButton } from '@shared/components/UI/List';
import { t } from '@shared/i18n';
import { getConfigTypeListSelector } from '../../redux/selectors';

const ActionButtonGroup = ({ hasAccessToDetailPage, hasDeleteConfigTypeAccess, id, path, deleteConfigType }) => {
  const isPending = useSelector(getConfigTypeListSelector.getIsPending);
  return (
    <Space>
      {hasAccessToDetailPage &&
      <DetailButton urlPath={path} _id={id} />}
      {hasDeleteConfigTypeAccess && (
      <Popconfirm
        disabled={isPending}
        title={t('franchiseConfigType:LIST.CONFIRM_POPUP')}
        placement="left"
        okText={t('OK')}
        cancelText={t('CANCEL')}
        onConfirm={() => deleteConfigType(id)}
        key="deleteConfigTypePopConfirm"
      >
        <Button type="ghost" disabled={isPending} icon={<DeleteTwoTone twoToneColor="#eb2f96" />} />
      </Popconfirm>
      )}
    </Space>
  );
};

export default ActionButtonGroup;
