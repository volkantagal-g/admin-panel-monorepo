import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getPersonalPromoSelector } from '../../redux/selectors';
import tableColumns from './config';

const PersonalPromoTable = props => {
  const { showFooter, handleDisable } = props;

  const { t } = useTranslation('personalPromoPage');
  const columns = tableColumns({ t, handleDisable });
  const personalPromo = useSelector(getPersonalPromoSelector.getData);
  const isDiscountCodePending = useSelector(getPersonalPromoSelector.getIsPending);

  return (
    <AntTableV2
      columns={columns}
      data={personalPromo}
      loading={isDiscountCodePending}
      total={personalPromo.length}
      showFooter={showFooter}
    />
  );
};

export default PersonalPromoTable;
