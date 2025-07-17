import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Badge, Table, Spin, Steps, Select, Modal, Button, InputNumber } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';

import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import {
  returnRequestSelector,
  orderDetailSelector,
  returnDeliverySelector,
  createReturnRequestSelector,
} from '@app/pages/ArtisanOrder/Detail/redux/selectors';

import useStyles from './styles';
import Step2 from './Step2';
import Product from '../../../Product';
import TimeSlotChange from './TimeSlotChange';
import { DELIVERY_TYPES, validationScheme, onlyInstantMoneyRefundReasons, GETIR_SOURCED_DEFECTED_PRODUCT_REASON } from './constants';

const { Step } = Steps;

/**
 * @param {object} Props
 * @param {boolean} Props.isOpen
 * @param {string} Props.title
 * @param {() => void} Props.onClose
 * @param {'partial_refund' | 'full_refund'} Props.type
 */
const RefundModal = ({ title, isOpen, type, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderPage');

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAvailableForInstantMoneyRefund, setIsAvailableForInstantMoneyRefund] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const returnReq = useSelector(returnRequestSelector);
  const createReturnReq = useSelector(createReturnRequestSelector);
  const returnDelivery = useSelector(returnDeliverySelector);
  const orderDetail = useSelector(orderDetailSelector.getData);

  const styles = useStyles();
  const orderId = orderDetail?._id;
  const returnId = returnReq?.data?.returnId;
  const instantRefundInfo = returnReq?.data?.instantRefundInfo;
  const isSubmitBusy = createReturnReq.isPending;

  const selectedProductList = Object.keys(selectedProducts).map(id => ({
    id,
    refundReason: selectedProducts[id]?.refundReason,
    quantity: selectedProducts[id]?.quantity,
  }));

  const goTo = step => {
    setCurrentStep(step);
  };

  const goBack = () => {
    goTo(prev => prev - 1);
  };

  const goNext = () => {
    const hasAnyAdminRefundableProduct = Object.keys(selectedProducts).some(
      id => {
        const p = selectedProducts[id];
        return p?.quantity > 0 && !!p?.refundReason && !p?.returnAvailable;
      },
    );

    const products = returnReq?.data?.products;

    selectedProductList?.forEach(x => {
      const product = products?.find(p => p.id === x.id);

      if (product?.totalPrice >= instantRefundInfo?.priceLimit) {
        setIsAvailableForInstantMoneyRefund(false);
      }
    });

    if (hasAnyAdminRefundableProduct) {
      setIsConfirmModalOpen(true);
      return;
    }

    goTo(prev => prev + 1);
  };

  const fetchRefundTimeline = () => dispatch(Creators.getReturnsAvailabilityRequest({ orderDetailId: orderId }));

  const onSubmit = ({ deliveryType, pickupDate, timeSlot }) => {
    const id = +timeSlot.split(':')[0];
    const pid = +timeSlot.split(':')[1];

    const slot = returnDelivery?.data?.slots?.find(x => x.date === pickupDate)?.slotValues?.find(x => x.id === id && x.pid === pid);

    if (deliveryType === DELIVERY_TYPES.COURIER_RETRIEVES) {
      dispatch(Creators.createReturnRequest({
        returnId,
        deliveryType,
        selectedSlotId: slot?.id,
        selectedPid: slot?.pid,
        selectedSlotStartTime: slot?.start,
        selectedSlotEndTime: slot?.end,
        onSuccess: () => {
          onClose?.();
          fetchRefundTimeline();
        },
      }));

      return;
    }

    dispatch(Creators.createReturnRequest({
      returnId,
      deliveryType,
      onSuccess: () => {
        onClose?.();
        fetchRefundTimeline();
      },
    }));
  };

  const formik = useFormik({
    initialValues: {
      deliveryType: '',
      pickupDate: moment().format('DD-MM-YYYY'),
      timeSlot: '',
    },
    validationSchema: validationScheme,
    validateOnMount: true,
    onSubmit: values => onSubmit(values),
  });
  const { resetForm, setFieldValue, values } = formik;

  useEffect(() => {
    if (isOpen && orderId) {
      dispatch(Creators.getReturnRequest({ orderId }));
      return;
    }

    setSelectedProducts({});
    setCurrentStep(0);
    resetForm();
  }, [isOpen, orderId, dispatch, resetForm]);

  useEffect(() => {
    if (currentStep === 0 || !returnId) return;

    const isFullReturn = type === 'full_refund';

    let products = Object.keys(selectedProducts).map(id => {
      const product = selectedProducts?.[id];

      return {
        id,
        reasonId: product?.refundReason,
        count: product?.quantity,
      };
    });

    products = products?.filter(product => product?.count > 0 && !!product?.reasonId);

    if (!values.deliveryType) return;

    dispatch(Creators.setReturnDeliveryRequest({
      returnId,
      deliveryType: values.deliveryType,
      selectedProducts: products,
      isFullReturn,
    }));
  }, [type, currentStep, selectedProducts, returnId, values.deliveryType, dispatch]);

  const hasOnlyInstantMoneyReasons = selectedProductList.some(x => !!onlyInstantMoneyRefundReasons.find(p => p.id === x?.refundReason));
  const hasDefectedProductReason = selectedProductList.some(x => x?.refundReason === GETIR_SOURCED_DEFECTED_PRODUCT_REASON.id);

  const onRefundReasonChange = useCallback((data, option) => {
    const { id, returnAvailable, totalQuantity, returnQty } = data;
    const hasDefectedReason = option === GETIR_SOURCED_DEFECTED_PRODUCT_REASON.id;

    setSelectedProducts(prev => {
      const ids = Object.keys(prev);
      let products = {
        ...prev,
        [id]: {
          ...prev?.[id],
          ...(type === 'full_refund' && { quantity: totalQuantity - returnQty }),
          refundReason: option,
          returnAvailable,
        },
      };

      if (hasDefectedReason) {
        ids.forEach(pid => {
          const refundReason = products[pid]?.refundReason;

          if (refundReason !== GETIR_SOURCED_DEFECTED_PRODUCT_REASON.id) {
            products = {
              ...products,
              [pid]: {
                ...products[pid],
                refundReason: null,
              },
            };
          }
        });
      }

      return products;
    });
  }, [type]);

  const onQuantityChange = (id, value) => {
    setSelectedProducts(prev => ({
      ...prev,
      [id]: {
        ...prev?.[id],
        quantity: value,
      },
    }));
  };

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
            if (d.isChild) {
              return (
                <Badge status="default" text={d.refundStatus} />
              );
            }

            if (!d.canReturn) return null;

            if (d.returnAvailable) {
              return (
                <Badge status="default" text={t('REFUND_MODAL.REFUNDABLE')} />
              );
            }

            return (
              <Badge status="warning" text={t('REFUND_MODAL.ADMIN_REFUNDABLE')} />
            );
          },
        },
        {
          title: t('REFUND_MODAL.QUANTITY'),
          key: 'quantity',
          dataIndex: 'quantity',
          width: 136,
          render: (_, d) => {
            const maxValue = d.totalQuantity - d.returnQty;

            if (d.isChild) {
              return (
                <Badge status="error" text={d.quantity} />
              );
            }

            if (!d.canReturn) return null;

            if (type === 'partial_refund') {
              return (
                <InputNumber
                  min={0}
                  max={maxValue}
                  defaultValue={0}
                  value={selectedProducts?.[d.id]?.quantity || 0}
                  onChange={value => onQuantityChange(d.id, value)}
                />
              );
            }

            return (
              <InputNumber value={maxValue} disabled />
            );
          },
        },
        {
          title: t('REFUND_REASON'),
          key: 'refundReason',
          dataIndex: 'refundReason',
          width: 355,
          render: (_, d) => {
            if (d.isChild || !d.canReturn) return null;

            const reasons = returnReq.data?.reasons?.map(x => ({
              label: x.text,
              value: x.id,
              disabled: x.id !== GETIR_SOURCED_DEFECTED_PRODUCT_REASON.id && hasDefectedProductReason,
            }));

            return (
              <Select
                allowClear
                showSearch
                placeholder={t('REFUND_MODAL.CHOOSE_REASON')}
                options={reasons}
                onChange={option => onRefundReasonChange(d, option)}
                filterOption={(input, option) => (option.label)?.toLowerCase()?.includes(input?.toLowerCase())}
                value={selectedProducts?.[d.id]?.refundReason}
                size="large"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                dropdownMatchSelectWidth={false}
                style={{ width: '100%' }}
              />
            );
          },
        },
        {
          title: t('REFUND_MODAL.AMOUNT'),
          key: 'amount',
          dataIndex: 'amount',
          width: 100,
          render: (_, d) => {
            if (d.isChild || !d.canReturn) return null;

            if (type === 'full_refund') {
              const amount = (d.totalQuantity - d.returnQty) * d.totalPrice;
              return (
                <div className={styles.amount}>{amount.toFixed(2)}</div>
              );
            }

            const amount = (selectedProducts?.[d.id]?.quantity || 0) * d.totalPrice;

            return (
              <div className={styles.amount}>{`₺${amount.toFixed(2)}`}</div>
            );
          },
        },
      ];

      return cols;
    },
    [styles.amount, selectedProducts, type, returnReq.data, styles.product, hasDefectedProductReason, t, onRefundReasonChange],
  );

  const products = useMemo(() => {
    let data = returnReq.data?.products;

    data = data?.map((product, i) => {
      const returnQty = product.returnInProgressCount + product.returnCompletedCount;
      const subItem = {
        ...product,
        returnQty,
        isChild: true,
        refundStatus: '',
      };
      const children = [];

      if (product.returnInProgressCount > 0) {
        children.push({
          ...subItem,
          key: `${product.id}-${i}-inprogress`,
          refundStatus: t('REFUND_MODAL.REFUND_IN_PROGRESS'),
          quantity: product.returnInProgressCount,
        });
      }

      if (product.returnCompletedCount > 0) {
        children.push({
          ...subItem,
          key: `${product.id}-${i}-completed`,
          refundStatus: t('REFUND_MODAL.REFUND_COMPLETED'),
          quantity: product.returnCompletedCount,
        });
      }

      const item = {
        key: product.id,
        isChild: false,
        canReturn: returnQty < product.totalQuantity,
        returnQty,
        ...product,
        ...(returnQty > 0 && { children }),
      };

      return item;
    });

    return data;
  }, [returnReq.data, t]);

  const totalRefundAmount = selectedProductList?.reduce((total, curr) => {
    let amount = curr.quantity * (products?.find(x => x.id === curr.id)?.totalPrice || 0);

    if (!curr.refundReason) {
      amount = 0;
    }

    return total + (amount || 0);
  }, 0);

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

  const onTimeSlotChange = useCallback(value => {
    setFieldValue('timeSlot', value);
  }, [setFieldValue]);

  const steps = [
    {
      title: t('REFUND_MODAL.STEP1_TITLE'),
      content: (
        <>
          <Alert
            className={styles.banner}
            message={t('REFUND_MODAL.STEP1_BANNER_MESSAGE')}
            type="info"
            showIcon
          />
          {hasDefectedProductReason && (
          <Alert
            className={styles.banner}
            message={t('REFUND_MODAL.STEP1_WARNING_MESSAGE')}
            type="info"
            showIcon
          />
          )}

          <Spin spinning={returnReq.isPending}>
            {products?.length > 0 && (
            <Table
              className={styles.table}
              size="middle"
              columns={columns}
              dataSource={products}
              pagination={false}
              expandable={{ defaultExpandAllRows: true }}
              footer={renderFooter}
            />
            )}
          </Spin>
        </>
      )
      ,
    },
    {
      title: t('REFUND_MODAL.STEP2_TITLE'),
      content: (
        <>
          {!isAvailableForInstantMoneyRefund && !hasOnlyInstantMoneyReasons && (
          <Alert
            className={styles.banner}
            message={t('REFUND_MODAL.MISSING_PRODUCT_REASON_WARNING_MESSAGE', { priceLimit: instantRefundInfo?.priceLimit })}
            type="info"
            showIcon
          />
          )}
          <Step2
            deliveryType={values.deliveryType}
            refundOptions={returnReq.data?.deliveryTypeOptions}
            pickupDate={values.pickupDate}
            timeSlot={values.timeSlot}
            onlyInstantMoneyRefund={hasOnlyInstantMoneyReasons}
            availableTimeSlots={returnDelivery?.data?.slots}
            isTimeSlotsLoading={returnDelivery?.isPending}
            hasError={returnDelivery?.error}
            isAvailableForInstantMoneyRefund={isAvailableForInstantMoneyRefund}
            instantMoneyRefundPriceLimit={instantRefundInfo?.priceLimit}
            onRefundTypeChange={onRefundTypeChange}
            onPickupDateChange={onPickupDateChange}
            onTimeSlotChange={onTimeSlotChange}
          />
        </>
      ),
    },
  ];

  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === steps.length - 1;

  const hasValidProducts = () => {
    const moreThanZeroQty = selectedProductList?.filter(x => x.quantity > 0);

    if (moreThanZeroQty.length > 0) {
      return moreThanZeroQty.every(x => !!x.refundReason);
    }

    return false;
  };

  const canGoNext = currentStep < steps.length - 1 && hasValidProducts();

  return (
    <>
      <Modal className={styles.modal} width={900} zIndex={2999990} visible={isOpen} onCancel={onClose} title={title}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Steps className={styles.steps} size="small" current={currentStep}>
            <Step title={steps[0].title} />
            <Step title={steps[1].title} />
          </Steps>

          <div className={styles.content}>{steps[currentStep].content}</div>
        </form>

        <div className={styles.footer}>
          <Button size="large" disabled={!canGoBack} onClick={goBack}>
            {t('REFUND_MODAL.PREV_BUTTON')}
          </Button>

          {!isLastStep && (
            <Button size="large" type="primary" disabled={!canGoNext} onClick={goNext}>
              {t('REFUND_MODAL.NEXT_BUTTON')}
            </Button>
          )}

          {isLastStep && (
            <Button size="large" type="primary" onClick={formik.submitForm} disabled={!formik.isValid} loading={isSubmitBusy}>
              {t('REFUND_MODAL.SUBMIT_BUTTON')}
            </Button>
          )}
        </div>
      </Modal>

      <Modal
        title={t('REFUND_MODAL.CONFIRM_MODAL_TITLE')}
        okText={t('REFUND_MODAL.CONFIRM_MODAL_PRIMARY_BUTTON')}
        cancelText={t('REFUND_MODAL.CONFIRM_MODAL_SECONDARY_BUTTON')}
        onOk={() => {
          goTo(prev => prev + 1);
          setIsConfirmModalOpen(false);
        }}
        visible={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        zIndex={2999991}
      >
        {t('REFUND_MODAL.CONFIRM_MODAL_MESSAGE')}
      </Modal>
    </>
  );
};

RefundModal.TimeSlotChange = TimeSlotChange;

export default RefundModal;
