import { useTranslation } from 'react-i18next';

import useParentStyle from '../../styles';

export default function Header() {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useParentStyle();

  return (
    <header className={parentClasses.pageHeader}>
      {t('employeePage:EMPLOYEE_LOGS')}
    </header>
  );
}
