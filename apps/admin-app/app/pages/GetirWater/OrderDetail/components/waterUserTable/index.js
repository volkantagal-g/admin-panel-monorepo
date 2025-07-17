import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import { orderDetailSelector } from '../../redux/selectors';

const WaterUserTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const usersData = _.get(orderDetail, 'vendorUsers', []);
  const { t } = useTranslation('waterOrderPage');

  return (
    <Card>
      <AntTableV2
        title={t('WATER_USER_TABLE')}
        data={usersData}
        columns={tableColumns(t)}
        loading={isPending}
      />
    </Card>
  );
};

export default WaterUserTable;
