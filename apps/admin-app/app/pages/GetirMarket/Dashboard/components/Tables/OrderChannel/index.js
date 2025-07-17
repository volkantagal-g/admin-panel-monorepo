import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { columns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { deviceStatsSelector } from '../../../redux/selectors';
import useParentStyles from '../styles';
import { getRowClassName } from '../utils';

const OrderChannel = () => {
  const { t } = useTranslation('getirMarketDashboardPage');
  const deviceStats = useSelector(deviceStatsSelector.getData);
  const isPending = useSelector(deviceStatsSelector.getIsPending);
  const parentClasses = useParentStyles();

  return (
    <div>
      <AntTable
        data={deviceStats}
        columns={columns(t, parentClasses)}
        loading={isPending}
        rowClassName={(record, index) => getRowClassName(parentClasses, index)}
        className={parentClasses.table}
        containerClassName={parentClasses.antTableContainer}
        showFooter={false}
        scroll={null}
      />
    </div>
  );
};

export default OrderChannel;
