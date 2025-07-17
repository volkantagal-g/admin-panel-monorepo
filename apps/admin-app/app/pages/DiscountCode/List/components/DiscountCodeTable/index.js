import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getDiscountCodeSelector } from '../../redux/selectors';
import tableColumns from './config';

const DiscountCodeTable = props => {
  const {
    showFooter,
    OnUsedCountClick,
  } = props;

  const { t } = useTranslation('discountCodePage');
  const columns = tableColumns({ t, OnUsedCountClick });
  const discountCode = useSelector(getDiscountCodeSelector.getData);
  const isDiscountCodePending = useSelector(getDiscountCodeSelector.getIsPending);

  return (
    <AntTableV2
      columns={columns}
      data={discountCode}
      loading={isDiscountCodePending}
      total={discountCode.length}
      showFooter={showFooter}
    />
  );
};

export default DiscountCodeTable;
