import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import _ from 'lodash';

import { orderDetailSelector, getUserByIdSelector } from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import { getLangKey } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/partialRefundTable/styles';

const PartialRefundTable = () => {
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const userRefundInfo = useSelector(getUserByIdSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const { t } = useTranslation('artisanOrderPage');

  const productMap = {};
  _.forEach(orderDetail.products, product => {
    productMap[product._id] = product.name;
  });

  const partialItem = [];
  _.forEach(orderDetail.partialRefunds, partialRefund => {
    _.forEach(partialRefund.partialRefundItems, partialRefundItem => {
      partialItem.push({
        name: productMap[partialRefundItem.item][getLangKey()],
        count: partialRefundItem.count,
        refundAmount: partialRefundItem.refundAmount,
      });
    });
  });

  const refundTotalInfo = _.map(orderDetail.partialRefunds, partialRefund => {
    return {
      total: partialRefund.partialRefundAmount,
      date: formatDate(partialRefund.partialRefundDate),
      user: partialRefund.user?.name,
    };
  });

  return (
    <Card>
      <AntTable
        title={t('ACTION.PARTIAL_REFUND')}
        data={partialItem}
        columns={tableColumns}
        loading={isPending}
      />
      <Row>
        <Col className={classes.refundMain} span={24}>
          <strong className={classes.total}>{t('TOTAL_PRICE')}</strong>
          {refundTotalInfo.map(item => {
            return (
              <div className={classes.refundInfo} key={`${item.date}_${item.user}`}>
                <div className={classes.totalPrice}>
                  <strong>{item.total} TL </strong>
                </div>
                <div className={classes.userInfo}>
                  {userRefundInfo?.name}
                </div>
                <div className={classes.userDate}>
                  {item.date}
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </Card>
  );
};

export default PartialRefundTable;
