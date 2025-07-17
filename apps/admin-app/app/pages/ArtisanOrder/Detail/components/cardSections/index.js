import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { get, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { WarningOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import {
  orderDetailSelector,
  returnRunnerSelector,
  getWarehouseRequestSelector,
  getArtisanCourierByIdSelector,
} from '../../redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import TextWithCopy from '@app/pages/ArtisanOrder/Detail/components/cardSections/textWithCopy';
import { ARTISAN_ORDER_STATUS, LOCALS_DELIVERY } from '@shared/shared/constants';
import { courierTypes as COURIER_TYPES, courierStatuses as COURIER_STATUSES } from '@shared/shared/constantValues';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/cardSections/styles';
import Spinner from '@shared/components/Spinner';
import { ENVIRONMENT } from '@shared/config';
import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import RedirectText from '@shared/components/UI/RedirectText';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const CardSections = ({ returnCourier, currentRunner, refundCourierId, isOrderCanShuffle }) => {
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const warehouseData = useSelector(getWarehouseRequestSelector.getData);
  const isWarehousePending = useSelector(getWarehouseRequestSelector.getIsPending);
  const returnRunner = useSelector(returnRunnerSelector)?.data?.data ?? null;
  const artisanCourier = useSelector(getArtisanCourierByIdSelector.getData);

  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderPage');

  const getCourierInfoByKey = key => {
    const prefix = 'courier.';
    if (isOrderCanShuffle) {
      return get(artisanCourier, key, '');
    }
    return get(orderDetail, prefix + key, '');
  };

  const orderStatus = get(orderDetail, 'status', '');
  const isOrderCancelled = (orderStatus === ARTISAN_ORDER_STATUS.CANCELED_ADMIN ||
    orderStatus === ARTISAN_ORDER_STATUS.CANCELED_RESTAURANT);

  const clientName = get(orderDetail, 'client.name', '');
  const clientGsm = get(orderDetail, 'client.gsm', '');
  const clientCountryCode = get(orderDetail, 'client.countryCode', '');
  const clientSucOrderCount = get(orderDetail, 'client.sucOrderCount', 0);
  const clientSucArisanOrderCount = get(orderDetail, 'client.sucArtisanOrderCount', 0);
  const clientTotalArtisanOrderCount = get(orderDetail, 'shopTotalArtisanOrderCount', 0);
  const clientArtisanOrderTotal = orderDetail.status <= ARTISAN_ORDER_STATUS.RATED;
  const clientId = get(orderDetail, 'client._id', '');
  const deliveryInfo = get(orderDetail, 'deliveryInfo.verification', '');

  const courierName = getCourierInfoByKey('name');
  const courierGsm = getCourierInfoByKey('gsm');
  const courierPersonalGsm = getCourierInfoByKey('personalGsm');
  const courierTypes = getCourierInfoByKey('courierType');
  const courierStatuses = getCourierInfoByKey('status');
  const orderCourierId = getCourierInfoByKey('id');
  const orderWarehouseId = isOrderCanShuffle ? getCourierInfoByKey('warehouse.id') : getCourierInfoByKey('warehouse');

  const shopName = get(orderDetail, 'shop.name', '');
  const shopGsm = get(orderDetail, 'shop.phone', '');
  const shopCityName = get(orderDetail, 'shop.city.name', '');
  const shopAddress = get(orderDetail, 'shop.address', '-');
  const shopTotalArtisanOrderCount = get(orderDetail, 'shopTotalArtisanOrderCount', '');
  const estimatedDeliveryDuration = get(orderDetail, 'estimatedDeliveryDuration', '');
  const orderDetailShopId = get(orderDetail, 'shop.id', '');

  const returnCourierName = get(returnCourier, 'name', '');
  const returnCourierGsm = get(returnCourier, 'gsm', '');
  const returnCourierPersonalGsm = get(returnCourier, 'personalGsm', '');
  const returnCourierTypes = get(returnCourier, 'courierType', '');
  const returnCourierStatuses = get(returnCourier, 'status', '');
  const returnCourierId = get(returnCourier, 'id', '');
  const returnCourierWarehouse = get(returnCourier, 'warehouse', '');
  const { Can, canAccess } = usePermission();

  const isGifting = orderDetail?.isGifting;
  const { receiverCallPin, receiverGSM, receiverName, receiverUnmaskedGSM } = orderDetail?.giftingParameters ?? {};
  const deliveryType = orderDetail?.deliveryType;

  useEffect(() => {
    if (orderWarehouseId) {
      dispatch(Creators.getWarehouseRequest({ id: orderWarehouseId }));
    }
  }, [orderWarehouseId, dispatch]);

  const combineCountryCodeAndGsm = (code, gsm) => `${code ? `+${code}` : ''}${gsm}`;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Row>
      {
        (orderDetail?.assignmentType && !orderDetail?.courierVerifyAfterCheckoutDate &&
          !isOrderCancelled) && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <AntCard>
              <WarningOutlined className={classes.customerServiceInfoIcon} />
              <span className={classes.customerServiceInfo}>{t('CARD_INFO.CUSTOMER_SERVICE_INFO_MESSAGE')}</span>
            </AntCard>
          </Col>
        )
      }
      <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <AntCard
            title={t('CARD_INFO.CLIENT.TITLE')}
            className={classes.customerInfo}
            extra={
              (
                <RedirectButtonV2
                  text={t('global:DETAIL')}
                  to={`/client/detail/${clientId}`}
                  permKey={permKey.PAGE_CLIENT_DETAIL}
                  target="_blank"
                  size="small"
                />
              )
            }
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.NAME')}</span>
                <span className={classes.col2}>{clientName}</span>
              </Col>
              <Col className={`${classes.colMain} ${classes.alignStart}`}>
                <span className={classes.col1}>ID</span>
                <span className={`${classes.col2} ${classes.wordBreakAll}`}><TextWithCopy text={clientId} buttonClass={classes.alignSelfStart} /></span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.GSM')}</span>
                <span className={classes.col2}><TextWithCopy text={clientGsm} /></span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.TOTAL_ORDER')}</span>
                <span className={classes.col2}>{clientSucOrderCount + clientSucArisanOrderCount}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.G10_ORDER')}</span>
                <span className={classes.col2}>{clientSucOrderCount}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.ARTISAN_ORDER_NAME')}</span>
                {clientArtisanOrderTotal && (
                <span className={classes.col2}>
                  {`${clientTotalArtisanOrderCount || (clientSucArisanOrderCount + 1)}`}
                </span>
                )}
              </Col>
              {deliveryInfo?.isRequired && (
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.CLIENT.DELIVERY_CODE')}</span>
                <span className={classes.col2}>{deliveryInfo?.code}</span>
              </Col>
              )}
            </Col>
          </AntCard>
        </Col>
      </Can>
      <Col className={classes.courierInfo} xs={24} sm={24} md={24} lg={24} xl={8}>
        <Spin spinning={!courierName}>
          <AntCard
            title={t('CARD_INFO.COURIER.TITLE')}
            extra={(
              <RedirectButtonV2
                text={t('global:DETAIL')}
                to={`/courier/detail/${orderCourierId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
                size="small"
              />
            )}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.NAME')}</span>
                <span className={classes.col2}>{courierName}</span>
              </Col>
              {deliveryType === LOCALS_DELIVERY.GETIR && orderCourierId && (
                <Col className={`${classes.colMain} ${classes.alignStart}`}>
                  <span className={classes.col1}>ID</span>
                  <span className={`${classes.col2} ${classes.wordBreakAll}`}>
                    <TextWithCopy text={orderCourierId} buttonClass={classes.alignSelfStart} />
                  </span>
                </Col>
              )}
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.GSM')}</span>
                <span className={classes.col2}>{courierGsm ? <TextWithCopy text={combineCountryCodeAndGsm(clientCountryCode, courierGsm)} /> : '-'}</span>
              </Col>
              {courierPersonalGsm && (
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.PERSONAL_GSM')}</span>
                <span className={classes.col2}>{courierPersonalGsm}</span>
              </Col>
              )}
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.TYPE')}</span>
                <span className={classes.col2}>{COURIER_TYPES[courierTypes] && COURIER_TYPES[courierTypes][getLangKey()]}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.STATUS')}</span>
                <span className={classes.col2}>{COURIER_STATUSES[courierStatuses] && COURIER_STATUSES[courierStatuses][getLangKey()]}</span>
              </Col>
              <Col className={classes.colMainAlignStart}>
                <span className={classes.col1}>{t('CARD_INFO.COURIER.STORE')}</span>
                <Spin spinning={isWarehousePending}>
                  {(orderWarehouseId && warehouseData) && (
                  <RedirectText
                    text={warehouseData?.name}
                    to={`/warehouse/detail/${orderWarehouseId}`}
                    permKey={permKey.PAGE_WAREHOUSE_DETAIL}
                    target="_blank"
                  />
                  )}
                </Spin>
              </Col>
            </Col>
          </AntCard>
        </Spin>
      </Col>
      <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <AntCard
            title={t('CARD_INFO.SHOP.TITLE')}
            className={classes.ArtisanInfo}
            extra={(
              <a
                className={classes.detailButton}
                href={`${ENVIRONMENT.REACT_APP_LOCALS_PANEL_URL}/${orderDetailShopId}`}
              >
                {t('global:DETAIL')}
              </a>
            )}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.NAME')}</span>
                <span className={classes.col2}>{shopName}</span>
              </Col>
              <Col className={`${classes.colMain} ${classes.alignStart}`}>
                <span className={classes.col1}>ID</span>
                <span className={`${classes.col2} ${classes.wordBreakAll}`}>
                  <TextWithCopy text={orderDetailShopId} buttonClass={classes.alignSelfStart} />
                </span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.GSM')}</span>
                <span className={classes.col2}>{shopGsm ? <TextWithCopy text={combineCountryCodeAndGsm(clientCountryCode, shopGsm)} /> : ''}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.CITY')}</span>
                <span className={classes.col2}>{shopCityName}</span>
              </Col>
              <Col className={`${classes.colMain} ${classes.alignStart}`}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.ADDRESS')}</span>
                <span className={classes.col2}>{shopAddress}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.TOTAL')}</span>
                <span className={classes.col2}>{shopTotalArtisanOrderCount}</span>
              </Col>
              {estimatedDeliveryDuration && (
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {t('CARD_INFO.SHOP.IG_DURATION')}
                </span>
                <span className={classes.col2}>
                  {estimatedDeliveryDuration.toFixed(0)}
                </span>
              </Col>
              )}
            </Col>
          </AntCard>
        </Col>
        {currentRunner && (
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <AntCard
            title="Runner"
            className={classes.ArtisanInfo}
            extra={(
              canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                <Link
                  className={classes.detailButton}
                  to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', currentRunner.runnerUuid)}
                >
                  {t('global:DETAIL')}
                </Link>
              ) : null
            )}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.NAME')}</span>
                <span className={classes.col2}>
                  {currentRunner.nameSurname}
                </span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.GSM')}</span>
                <span className={classes.col2}>{currentRunner.cellPhone}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {t('CARD_INFO.COURIER.STATUS')}
                </span>
                <span className={classes.col2}>{t(`STATUS_${currentRunner.status}`)}</span>
              </Col>
            </Col>
          </AntCard>
        </Col>
        )}
        {returnRunner && (
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <AntCard
            title={t('RETURN_RUNNER')}
            className={`${classes.ArtisanInfo} px-2`}
            extra={(
              canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                <Link
                  className={classes.detailButton}
                  to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', returnRunner.runnerUuid)}
                >
                  {t('global:DETAIL')}
                </Link>
              ) : null

            )}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.NAME')}</span>
                <span className={classes.col2}>
                  {returnRunner.nameSurname}
                </span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.SHOP.GSM')}</span>
                <span className={classes.col2}>{returnRunner.cellPhone}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {t('CARD_INFO.COURIER.STATUS')}
                </span>
                <span className={classes.col2}>{t(`STATUS_${returnRunner.status}`)}</span>
              </Col>
            </Col>
          </AntCard>
        </Col>
        )}
      </Can>
      {
        (!isEmpty(returnCourier) && refundCourierId) && (
          <Col className={classes.courierInfo} xs={24} sm={24} md={24} lg={24} xl={8}>
            <AntCard
              title={t('CARD_INFO.RETURN_COURIER.TITLE')}
              extra={
                (
                  <RedirectButtonV2
                    text={t('global:DETAIL')}
                    to={`/courier/detail/${returnCourierId}`}
                    permKey={permKey.PAGE_COURIER_DETAIL}
                    target="_blank"
                    size="small"
                  />
                )
              }
            >
              <Col className={classes.colInfo}>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.NAME')}</span>
                  <span className={classes.col2}>{returnCourierName}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.GSM')}</span>
                  <span className={classes.col2}>{returnCourierGsm}</span>
                </Col>
                {
                  courierPersonalGsm && (
                    <Col className={classes.colMain}>
                      <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.PERSONAL_GSM')}</span>
                      <span className={classes.col2}>{returnCourierPersonalGsm}</span>
                    </Col>
                  )
                }
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.TYPE')}</span>
                  <span className={classes.col2}>{COURIER_TYPES[returnCourierTypes] && COURIER_TYPES[returnCourierTypes][getLangKey()]}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.STATUS')}</span>
                  <span className={classes.col2}>{COURIER_STATUSES[returnCourierStatuses] && COURIER_STATUSES[returnCourierStatuses][getLangKey()]}</span>
                </Col>
                <Col className={classes.colMainAlignStart}>
                  <span className={classes.col1}>{t('CARD_INFO.RETURN_COURIER.STORE')}</span>
                  {
                    (returnCourierWarehouse?.id && returnCourierWarehouse) &&
                    (
                      <RedirectText
                        text={returnCourierWarehouse?.name}
                        to={`/warehouse/detail/${returnCourierWarehouse.id}`}
                        permKey={permKey.PAGE_WAREHOUSE_DETAIL}
                        target="_blank"
                      />
                    )
                  }
                </Col>
              </Col>
            </AntCard>
          </Col>
        )
      }
      {isGifting && (
      <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <AntCard
            title={t('RECIPIENT_INFORMATIONS')}
            className={classes.customerInfo}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('RECIPIENT_NAME')}</span>
                <span className={classes.col2}>{receiverName}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('RECIPIENT_PHONE')}</span>
                <span className={classes.col2}>
                  {receiverGSM} / {receiverCallPin}
                  <TextWithCopy text={receiverUnmaskedGSM} />
                </span>
              </Col>
            </Col>
          </AntCard>
        </Col>
      </Can>
      )}
    </Row>
  );
};

export default CardSections;
