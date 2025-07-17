import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import Card  from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import { orderDetailSelector } from '../../redux/selectors';

const ArtisanUserTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const usersData = _.get(orderDetail, 'shop.users', []);
  const { t } = useTranslation('artisanOrderPage');

  return (
    <>
      <Card>
        <AntTable
          title={t('ARTISAN_USER')}
          data={usersData}
          columns={tableColumns}
          loading={isPending}
        />
      </Card>
    </>
  );
};

export default ArtisanUserTable;
