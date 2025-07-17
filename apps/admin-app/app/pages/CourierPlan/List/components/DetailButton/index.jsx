import { Button, Popconfirm, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

export default function ActionButtons({
  id,
  isPending = false,
  handleDelete = () => null,
}) {
  const { t } = useTranslation('courierPlanPage');

  const urlPath = ROUTE.E2E_COURIER_PLAN_PROCEED.path;
  const urlPathWithId = urlPath.replace(':id', id);

  return (
    <Space>
      <Button
        id={id}
        size="small"
        variant="contained"
        type="default"
        disabled={isPending}
      >
        <Link to={urlPathWithId}>{t('PROCEED')}</Link>
      </Button>
      <Popconfirm
        title={t('DELETE_QUESTION')}
        onConfirm={() => handleDelete({ id })}
        okText={t('global:YES')}
        cancelText={t('global:NO')}
        disabled={isPending}
      >
        <Button
          id={id}
          size="small"
          variant="contained"
          type="danger"
          disabled={isPending}
        >
          {t('DELETE')}
        </Button>
      </Popconfirm>
    </Space>
  );
}
