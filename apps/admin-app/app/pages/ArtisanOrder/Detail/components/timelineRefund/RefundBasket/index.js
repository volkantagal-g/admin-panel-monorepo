import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Modal, Badge, Button, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';

import Card from '@shared/components/Card';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundBasket/styles';
import BasketItem from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundBasket/BasketItem';
import Product from '../../Product';

import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { activeReturnDetailsModalSelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';

const RefundBasket = ({ returnId, products, totalPrice, detailProducts, isBasketDetailsLoading }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderPage');
  const classes = useStyles();

  const activeModal = useSelector(activeReturnDetailsModalSelector.getData);
  const isReturnDetailsModalOpen = activeModal === returnId;

  const ProductItems = useMemo(() => {
    return products?.map(product => {
      return <BasketItem product={product} key={product?.id} />;
    });
  }, [products]);

  const columns = useMemo(() => {
    /** @type {import('antd').TableColumnsType} */
    const cols = [
      {
        title: t('REFUND_MODAL.PRODUCT'),
        key: 'product',
        width: 220,
        render: (_, d) => (
          <Product className={classes.product} image={d.imageUrl} name={d.name} price={`₺${d.price?.toFixed(2)}`} />
        ),
      },
      {
        title: t('REFUND_MODAL.REFUND_STATUS'),
        key: 'refundStatus',
        dataIndex: 'refundStatus',
        width: 148,
        render: (_, d) => {
          return (
            <Badge status="default" text={d.statusDescription} />
          );
        },
      },
      {
        title: t('REFUND_MODAL.QUANTITY'),
        key: 'quantity',
        width: 136,
        render: () => {
          return (
            <Badge count={1} />
          );
        },
      },
      {
        title: t('REFUND_REASON'),
        key: 'returnReason',
        width: 355,
        render: (_, d) => d.returnReasonDescription,
      },
      {
        title: t('REJECT_REASON'),
        key: 'rejectReason',
        width: 355,
        render: (_, d) => d.rejectReasonDescription,
      },
      {
        title: t('REFUND_MODAL.AMOUNT'),
        key: 'amount',
        width: 100,
        render: (_, d) => {
          const amount = d.price;

          return (
            <div className={classes.amount}>{`₺${amount.toFixed(2)}`}</div>
          );
        },
      },
    ];
    return cols;
  }, [classes.product, classes.amount, t]);

  const renderFooter = useCallback(() => (
    <>
      <span>{t('TOTAL_REFUND_AMOUNT')}</span>
      <span className={classes.amount}>{totalPrice}</span>
    </>
  ), [classes.amount, t, totalPrice]);

  const closeReturnDetailModal = () => dispatch(Creators.closeReturnDetailsModal());
  const openReturnDetailsModal = () => dispatch(Creators.openReturnDetailsModal({ returnId }));

  return (
    <Card classNames={classes.basketCard}>
      <Text className={classes.cardTitle} strong>
        {t('REFUND_TIMELINE.REFUND_BASKET')}
      </Text>

      <div className={classes.basketItems}>{ProductItems}</div>

      <Button
        className={classes.showLessBtn}
        type="default"
        size="middle"
        onClick={openReturnDetailsModal}
      >
        {t('REFUND_TIMELINE.SHOW_REFUND_DETAILS')}
      </Button>

      {!isBasketDetailsLoading && (
      <Card.Footer classNames={classes.totalPrice}>
        <Text>{t('REFUND_TIMELINE.TOTAL_PRICE')}</Text>
        <Text>{totalPrice}</Text>
      </Card.Footer>
      )}

      <Modal
        className={classes.modal}
        width={900}
        zIndex={2999990}
        title={t('RETURN_DETAILS')}
        visible={isReturnDetailsModalOpen}
        onCancel={closeReturnDetailModal}
        cancelButtonProps={{ size: 'large' }}
        onOk={closeReturnDetailModal}
      >
        <Spin className={classes.content} spinning={isBasketDetailsLoading}>
          <Table
            className={classes.table}
            size="middle"
            columns={columns}
            dataSource={!isBasketDetailsLoading && detailProducts}
            pagination={false}
            footer={renderFooter}
            rowKey="id"
          />
        </Spin>
      </Modal>
    </Card>
  );
};

export default RefundBasket;
