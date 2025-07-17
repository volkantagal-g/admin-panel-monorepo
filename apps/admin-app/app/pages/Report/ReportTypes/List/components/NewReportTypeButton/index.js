import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

export default function NewButton() {
  const { t } = useTranslation('reportsPage');

  return (
    <Link to={ROUTE.REPORT_TYPES_NEW.path}>
      <Button type="primary">{t('NEW_REPORT_TYPE_BUTTON')}</Button>
    </Link>
  );
}
