import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getPageByIdSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import useStyles from './styles';

export default function PageComponentList() {
  const { t } = useTranslation('pagePage');
  const page = useSelector(getPageByIdSelector.getData);
  const ownClasses = useStyles();
  const pageLoading = useSelector(getPageByIdSelector.getIsPending);

  const components = page.components || [];

  const columns = getTableColumns({ t });

  return (
    <AntCard
      title={t('PAGE_COMPONENTS')}
      className={ownClasses.antCard}
    >
      <AntTableV2
        bordered
        data={components}
        columns={columns}
        loading={pageLoading}
        className={ownClasses.table}
        scroll={{ y: 500 }}
      />
    </AntCard>
  );
}
