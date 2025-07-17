import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { columns } from './config';
import { orderCardGroupDistributionSelector } from '../../../redux/selectors';
import useParentStyles from '../styles';
import { getRowClassName } from '../utils';

const CardTypes = () => {
  const { t } = useTranslation('getirMarketDashboardPage');
  const orderCardGroupDistributionTableData = useSelector(orderCardGroupDistributionSelector.getData);
  const isPending = useSelector(orderCardGroupDistributionSelector.getIsPending);
  const parentClasses = useParentStyles();

  return (
    <AntTable
      data={orderCardGroupDistributionTableData}
      columns={columns(t, parentClasses)}
      loading={isPending}
      rowClassName={(record, index) => getRowClassName(parentClasses, index)}
      className={parentClasses.table}
      containerClassName={parentClasses.antTableContainer}
      showFooter={false}
      scroll={null}
    />
  );
};

export default CardTypes;
