import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Badge, Table, Modal, Spin } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { orderReturnsSelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';

import useStyles from './styles';
import Step2 from './Step2';
import Product from '../../../Product';
import { DELIVERY_TYPES, validationScheme } from './constants';

const TimeSlotChange = ({ title, returnId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderPage');

  const [isSubmitBusy, setIsSubmitBusy] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isAvailableSlotsBusy, setIsAvailableSlotsBusy] = useState(false);

  const orderReturns = useSelector(orderReturnsSelector.getData);

  const styles = useStyles();

  const deliveryTypeOptions = useMemo(() => orderReturns?.deliveryTypeOptions?.slice(0, 1), [orderReturns?.deliveryTypeOptions]);

  const onSubmit = ({ deliveryType, pickupDate, timeSlot }) => {
    const id = +timeSlot.split(':')[0];
    const pid = +timeSlot.split(':')[1];

    const slot = availableSlots?.find(x => x.date === pickupDate)?.slotValues?.find(x => x.id === id && x.pid === pid);

    setIsSubmitBusy(true);
    dispatch(Creators.changeReturnSlotRequest({
      returnId,
      deliveryType,
      selectedSlotId: slot.id,
      selectedPid: slot.pid,
      selectedSlotStartTime: slot.start,
      selectedSlotEndTime: slot.end,
      onSuccess: () => {
        onClose?.();
        dispatch(Creators.getReturnsAvailabilityRequest({ orderDetailId: orderReturns?.orderId }));
        dispatch(ToastCreators.success({ message: t('TIME_SLOT_CHANGE_SUCCESS') }));
      },
      onFinally: () => setIsSubmitBusy(false),
    }));
  };

  const formik = useFormik({
    initialValues: {
      deliveryType: DELIVERY_TYPES.COURIER_RETRIEVES,
      pickupDate: moment().format('DD-MM-YYYY'),
      timeSlot: '',
    },
    validationSchema: validationScheme,
    validateOnMount: true,
    onSubmit: values => onSubmit(values),
  });
  const { resetForm, setFieldValue, values } = formik;

  useEffect(() => {
    if (!isOpen || !returnId) return;

    setIsAvailableSlotsBusy(true);
    dispatch(Creators.getAvailableSlotsForReturnRequest({
      returnId,
      onSuccess: data => setAvailableSlots(data?.slots),
      onFinally: () => setIsAvailableSlotsBusy(false),
    }));
  }, [isOpen, returnId, values.deliveryType, dispatch]);

  useEffect(() => {
    if (isOpen) return;

    resetForm();
    setIsSubmitBusy(false);
    setIsAvailableSlotsBusy(false);
    setAvailableSlots([]);
  }, [isOpen, resetForm]);

  const columns = useMemo(
    () => {
      /** @type {import('antd').TableColumnsType} */
      const cols = [
        {
          title: t('REFUND_MODAL.PRODUCT'),
          key: 'product',
          dataIndex: 'product',
          width: 220,
          render: (_, d) => (
            <Product className={styles.product} image={d.imageUrl} name={d.productName} price={`₺${d.totalPrice?.toFixed(2)}`} />
          ),
        },
        {
          title: t('REFUND_MODAL.REFUND_STATUS'),
          key: 'refundStatus',
          dataIndex: 'refundStatus',
          width: 148,
          render: (_, d) => {
            return (
              <Badge status="default" text={d.status} />
            );
          },
        },
        {
          title: t('REFUND_MODAL.QUANTITY'),
          key: 'quantity',
          dataIndex: 'quantity',
          width: 136,
          render: (_, d) => {
            return (
              <Badge count={d.quantity} />
            );
          },
        },
        {
          title: t('REFUND_REASON'),
          key: 'refundReason',
          dataIndex: 'refundReason',
          width: 355,
          render: (_, d) => d.reasonDesc,
        },
        {
          title: t('REFUND_MODAL.AMOUNT'),
          key: 'amount',
          dataIndex: 'amount',
          width: 100,
          render: (_, d) => {
            return (
              <div className={styles.amount}>{`₺${d.totalPrice.toFixed(2)}`}</div>
            );
          },
        },
      ];

      return cols;
    },
    [styles.amount, styles.product, t],
  );

  const totalRefundAmount = useMemo(() => orderReturns?.selectedProducts?.reduce((total, curr) => {
    const price = curr?.totalPrice || 0;
    return total + price;
  }, 0), [orderReturns?.selectedProducts]);

  const renderFooter = useCallback(() => (
    <>
      <span>{t('TOTAL_REFUND_AMOUNT')}</span>
      <span className={styles.amount}>₺{totalRefundAmount.toFixed(2)}</span>
    </>
  ), [styles.amount, totalRefundAmount, t]);

  const onRefundTypeChange = useCallback(value => {
    resetForm();
    setFieldValue('deliveryType', value);
  }, [resetForm, setFieldValue]);

  const onPickupDateChange = useCallback(value => {
    setFieldValue('pickupDate', value);
    setFieldValue('timeSlot', '');
  }, [setFieldValue]);

  const onTimeSlotChange = useCallback(value => setFieldValue('timeSlot', value), [setFieldValue]);

  return (
    <Modal className={styles.modal} width={900} zIndex={2999990} visible={isOpen} onCancel={onClose} title={title}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.content}>
          <Spin spinning={!orderReturns?.selectedProducts}>
            <Table
              className={styles.table}
              size="middle"
              columns={columns}
              dataSource={orderReturns?.selectedProducts}
              pagination={false}
              expandable={{ defaultExpandAllRows: true }}
              footer={renderFooter}
            />
          </Spin>

          <Step2
            deliveryType={values.deliveryType}
            refundOptions={deliveryTypeOptions}
            pickupDate={values.pickupDate}
            timeSlot={values.timeSlot}
            availableTimeSlots={availableSlots}
            isTimeSlotsLoading={isAvailableSlotsBusy}
            onRefundTypeChange={onRefundTypeChange}
            onPickupDateChange={onPickupDateChange}
            onTimeSlotChange={onTimeSlotChange}
          />
        </div>

        <div className={styles.footer}>
          <Button type="primary" size="large" htmlType="submit" disabled={!formik.isValid} loading={isSubmitBusy}>
            {t('REFUND_MODAL.TIME_SLOT_CHANGE_SUBMIT_BUTTON')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(TimeSlotChange);
