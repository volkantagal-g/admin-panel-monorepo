import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';

import useStyles from './styles';

const RefundTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('waterOrderPage');
  const classes = useStyles();

  const total = _.get(orderDetail, 'refundedProductListTotalPrice', 0);

  const refundData = () => {
    if (orderDetail.refundedProductList) {
      return orderDetail.refundedProductList.map(item => ({
        numberOfRefundedProduct: _.get(item, 'numberOfRefundedProduct', ''),
        price: _.get(item, 'price', 0),
        productName: _.get(item, 'productName', ''),
      }));
    }
    return [];
  };

  const footerText = `${t('waterOrderPage:REFUNDTABLE.TOTAL_PRICE')} : ₺${total.toFixed(2)}`;

  return (
    <Card>
      <AntTable
        showFooter
        footer={<span className={classes.totalArea}>{footerText}</span>}
        title={t('waterOrderPage:REFUNDTABLE.TITLE')}
        data={refundData()}
        columns={tableColumns(t)}
        loading={isPending}
      />
    </Card>
  );
};

export default RefundTable;
