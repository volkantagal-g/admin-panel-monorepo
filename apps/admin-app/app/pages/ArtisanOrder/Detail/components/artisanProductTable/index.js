import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';

const ArtisanProductTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const productData = orderDetail.products || [];
  const { t } = useTranslation('artisanOrderPage');

  return (
    <Card>
      <AntTableV2
        title={t('PRODUCT.TITLE')}
        data={productData}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default ArtisanProductTable;
