import { useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import useTableTranslation from '@app/pages/GetirWater/VendorFilter/hooks/useTableTranslation';
import { countSelector, isCountPendingSelector } from '@app/pages/GetirWater/VendorFilter/redux/selectors';

import generateTableColumns from './generateTableColumns';

const FilterSummaryTable = () => {
  const t = useTableTranslation('FILTER_SUMMARY_TABLE');
  const isCountPending = useSelector(isCountPendingSelector);
  const count = useSelector(countSelector);
  const columns = generateTableColumns(t);
  const countData = count ? [count] : [];

  return (
    <AntTableV2
      title={t('TITLE')}
      data={countData}
      columns={columns}
      loading={isCountPending}
    />
  );
};

export default FilterSummaryTable;
