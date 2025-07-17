import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Radio as AntRadio, Skeleton, Typography, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { QuestionCircleOutlined } from '@ant-design/icons';

import {
  getSlottedDeliveryOptionsSelector,
  orderDetailSelector,
  changeDeliveryTimeSlotSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Button, Modal, Radio } from '@shared/components/GUI';
import { currencyFormat } from '@shared/utils/localization';
import useStyles from './styles';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

const { Title } = Typography;

const ChangeDeliverySlot = () => {
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const { format: currencyFormatter } = currencyFormat();
  const dispatch = useDispatch();
  const deliveryOptions = useSelector(
    getSlottedDeliveryOptionsSelector.getData,
  );
  const { slots, closestDeliverySlotOptionInfo } = deliveryOptions ?? {};
  const isPending = useSelector(getSlottedDeliveryOptionsSelector.getIsPending);
  const isUpdatePending = useSelector(
    changeDeliveryTimeSlotSelector.getIsPending,
  );
  const isModalVisible = useSelector(
    getSlottedDeliveryOptionsSelector.isSlotModalVisible,
  );
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { warehouse, client, delivery, domainType, _id: orderId } = orderDetail;
  const {
    client: {
      _id: clientId,
      lon: clientAddressLon,
      lat: clientAddressLat,
    } = {},
  } = client ?? {};
  const { warehouse: { _id: warehouseId } = {} } = warehouse ?? {};
  const { slottedDeliveryInfo: { slotId: deliverySlotId } = {} } =
    delivery ?? {};

  const [selectedSlotId, setSelectedSlotId] = useState(false);

  const onToggleModal = () => {
    setSelectedSlotId('');
    dispatch(Creators.toggleSlotModal({ isVisible: !isModalVisible }));
  };

  const handleSubmit = () => {
    if (domainType === GETIR_DOMAIN_TYPES.VOYAGER) {
      const selectedSlotInfo = slots?.find(slot => slot.slotId === selectedSlotId);

      dispatch(Creators.changeDeliveryTimeSlotRequest({
        clientId,
        selectedSlotInfo,
        orderId,
        domainType,
        onSuccess: onToggleModal,
        selectedSlotId,
      }));
      return;
    }
    dispatch(
      Creators.changeDeliveryTimeSlotRequest({
        clientId,
        selectedSlotId,
        orderId,
        domainType,
        onSuccess: onToggleModal,
      }),
    );
  };

  const {
    times: [preferredStart, preferredEnd] = [],
    deliveryFee: preferredDeliveryFee,
  } =
    slots?.find(
      slot => slot?.times?.toString() ===
        closestDeliverySlotOptionInfo?.times?.toString(),
    ) ?? {};

  useEffect(() => {
    if (isModalVisible && !slots?.length) {
      dispatch(
        Creators.getSlottedDeliveryOptionsRequest({
          warehouseId,
          clientId,
          clientAddressLat,
          clientAddressLon,
          selectedSlotId: deliverySlotId,
          domainType,
        }),
      );
    }
  }, [
    dispatch,
    clientId,
    warehouseId,
    clientAddressLat,
    clientAddressLon,
    isModalVisible,
    deliverySlotId,
    domainType,
    slots,
  ]);

  const onSelectDeliveryOption = e => {
    setSelectedSlotId(e.target.value);
  };

  const mappedSlots = useMemo(() => {
    if (!slots || !slots.length) {
      return {
        todaySlots: [],
        tomorrowSlots: [],
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const todaySlots = slots.filter(
      slot => new Date(slot.start) > today && new Date(slot.start) < tomorrow,
    );

    const tomorrowSlots = slots.filter(
      slot => new Date(slot.start) > tomorrow,
    );

    return {
      todaySlots,
      tomorrowSlots,
    };
  }, [slots]);

  return (
    <Modal
      title={t('MODAL.CHANGE_SLOT.TITLE')}
      visible={isModalVisible}
      onCancel={onToggleModal}
      width={800}
      footer={(
        <Space>
          <Button
            size="small"
            color="secondary"
            key="back"
            onClick={onToggleModal}
          >
            {t('button:CANCEL')}
          </Button>
          <Button
            size="small"
            key="submit"
            type="primary"
            loading={isUpdatePending}
            onClick={handleSubmit}
            disabled={isPending || !selectedSlotId}
            form="update-delivery-slot"
            htmlType="submit"
          >
            {t('button:SAVE')}
          </Button>
        </Space>
      )}
    >
      {isPending ? (
        <Skeleton paragraph={3} active />
      ) : (
        <div data-testid="delivery-slot-card">
          <Title level={5}>{t('MODAL.CHANGE_SLOT.DESCRIPTION')}</Title>
          {preferredStart && preferredEnd && (
            <p>
              {t('MODAL.CHANGE_SLOT.PREFERRED_TIME_DESCRIPTION')}{' '}
              <span style={{ fontWeight: 500 }}>
                {preferredStart} - {preferredEnd}
              </span>{' '}
              <span className={classes.deliveryFee}>
                (
                {preferredDeliveryFee
                  ? currencyFormatter(preferredDeliveryFee)
                  : t('global:FREE_COURIER')}
                )
              </span>
            </p>
          )}

          {slots?.length > 0 ? (
            <AntRadio.Group
              onChange={onSelectDeliveryOption}
              value={selectedSlotId}
              className={classes.slotContainer}
            >
              <div className={classes.daycontainers}>
                <Title level={2}>{t('TODAY')}</Title>
                <div
                  className={classes.slotRadioGroupWrapper}
                >
                  {mappedSlots.todaySlots?.map(
                    ({
                      deliveryFee,
                      slotId,
                      times: [start, end],
                      isAvailable,
                    } = {}) => (
                      <Radio
                        key={slotId}
                        value={slotId}
                        disabled={!isAvailable}
                        checked={selectedSlotId === slotId}
                        ariaChecked={false}
                        defaultChecked={false}
                        className={classNames(
                          classes.slotRadioWrapper,
                          !isAvailable && classes.disabledSlot,
                        )}
                      >
                        <p className={classes.slotWrapper}>
                          <span>
                            {start} - {end}
                          </span>
                          <span className={classes.deliveryFee}>
                            {deliveryFee
                              ? currencyFormatter(deliveryFee)
                              : t('global:FREE_COURIER')}
                          </span>
                        </p>
                      </Radio>
                    ),
                  )}
                </div>
              </div>
              {mappedSlots.tomorrowSlots?.length > 0 && (
                <>
                  <div className={classes.seperator} />
                  <div className={classes.daycontainers}>
                    <Title level={2}>{t('TOMORROW')}</Title>
                    <div
                      className={classes.slotRadioGroupWrapper}
                    >
                      {mappedSlots.tomorrowSlots?.map(
                        ({
                          deliveryFee,
                          slotId,
                          times: [start, end],
                          isAvailable,
                        } = {}) => (
                          <Radio
                            key={slotId}
                            value={slotId}
                            disabled={!isAvailable}
                            checked={selectedSlotId === slotId}
                            ariaChecked={false}
                            defaultChecked={false}
                            className={classNames(
                              classes.slotRadioWrapper,
                              !isAvailable && classes.disabledSlot,
                            )}
                          >
                            <p className={classes.slotWrapper}>
                              <span>
                                {start} - {end}
                              </span>
                              <span className={classes.deliveryFee}>
                                {deliveryFee
                                  ? currencyFormatter(deliveryFee)
                                  : t('global:FREE_COURIER')}
                              </span>
                            </p>
                          </Radio>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}
            </AntRadio.Group>
          ) : (
            <div
              className={classes.resultWrapper}
            >
              <Result
                icon={<QuestionCircleOutlined style={{ fontSize: '48px' }} />}
                status="warning"
                subTitle={t('MODAL.CHANGE_SLOT.SLOTS_NOT_FOUND')}
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ChangeDeliverySlot;
