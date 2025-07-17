import { useSelector } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import { get, has } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { orderDetailSelector } from '../../redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import { FOOD_ORDER_STATUS } from '@shared/shared/constants';
import { allCourierTypes, courierStatuses } from '@shared/shared/constantValues';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/cardSections/styles';
import { ENVIRONMENT } from '@shared/config';

const { Text } = Typography;

const CardSections = () => {
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { t } = useTranslation('foodOrderPage');

  const clientName = get(orderDetail, 'client.name', '');
  const clientGsm = get(orderDetail, 'client.gsm', '');
  const clientSucOrderCount = get(orderDetail, ['client', 'sucOrderCount'], 0);
  const clientSucFoodOrderCount = get(orderDetail, ['client', 'sucFoodOrderCount'], 0);
  const totalFoodOrderCount = get(orderDetail, 'totalFoodOrderCount');
  const hasClientFoodOrderTotal = orderDetail.status <= FOOD_ORDER_STATUS.RATED;
  const clientId = get(orderDetail, 'client._id', '');

  const courierName = get(orderDetail, ['courier', 'name'], '');
  const courierGsm = get(orderDetail, ['courier', 'gsm'], '');
  const courierPersonalGsm = get(orderDetail, 'courier.personalGsm', '');
  const courierType = get(orderDetail, ['courier', 'courierType'], '');
  const courierTypeText = get(allCourierTypes, [courierType, getLangKey()], '');
  const courierStatus = get(orderDetail, 'courier.status', '');
  const courierStatusText = get(courierStatuses, [courierStatus, getLangKey()], '');
  const warehouseId = get(orderDetail, 'courier.warehouse.id', null);
  const warehouseName = get(orderDetail, 'courier.warehouse.name', null);
  const courierId = get(orderDetail, 'courier.id', '');

  const restaurantName = get(orderDetail, 'restaurant.name', '');
  const restaurantGsm = get(orderDetail, 'restaurant.phone', '');
  const restaurantCityName = get(orderDetail, 'restaurant.city.name', '');
  const restaurantTotalFoodOrderCount = get(orderDetail, 'restaurantTotalFoodOrderCount', '');
  const estimatedDeliveryDuration = get(orderDetail, 'estimatedDeliveryDuration', '');
  const orderDetailRestaurantId = get(orderDetail, 'restaurant.id', '');

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <AntCard
          title={t('CARD_INFO.CLIENT.TITLE')}
          className={classes.customerInfo}
          extra={(
            <a
              className={classes.detailButton}
              href={`/client/detail/${clientId}`}
            >
              {t('global:DETAIL')}
            </a>
          )}
        >
          <Col className={classes.colInfo}>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.NAME')}</span>
              <span className={classes.col2}>{clientName}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.GSM')}</span>
              <span className={classes.col2}>{clientGsm}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.TOTAL_ORDER')}</span>
              <span className={classes.col2}>
                {clientSucOrderCount + clientSucFoodOrderCount}
              </span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.G10_ORDER')}</span>
              <span className={classes.col2}>{clientSucOrderCount}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.FOOD')}</span>
              {hasClientFoodOrderTotal ? (
                <span className={classes.col2}>
                  {`${totalFoodOrderCount || (clientSucFoodOrderCount + 1)}.`}
                </span>
              ) : (
                <span className={classes.col2}>
                  {clientSucFoodOrderCount}
                </span>
              )}
            </Col>
          </Col>
        </AntCard>
      </Col>
      {
        has(orderDetail, 'courier') && (
          <Col className={classes.courierInfo} xs={24} sm={24} md={24} lg={24} xl={8}>
            <AntCard
              title={t('CARD_INFO.COURIER.TITLE')}
              extra={(
                <a
                  className={classes.detailButton}
                  href={`/courier/detail/${courierId}`}
                >
                  {t('global:DETAIL')}
                </a>
              )}
            >
              <Col className={classes.colInfo}>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.COURIER.NAME')}</span>
                  <span className={classes.col2}>{courierName}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.COURIER.GSM')}</span>
                  <span className={classes.col2}>{courierGsm}</span>
                </Col>
                {courierPersonalGsm && (
                  <Col className={classes.colMain}>
                    <span className={classes.col1}>{t('CARD_INFO.COURIER.PERSONAL_GSM')}</span>
                    <span className={classes.col2}>{courierPersonalGsm}</span>
                  </Col>
                )}
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.COURIER.TYPE')}</span>
                  <span className={classes.col2}>{courierTypeText}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.COURIER.STATUS')}</span>
                  <span className={classes.col2}>{courierStatusText}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('CARD_INFO.COURIER.STORE')}</span>
                  {warehouseId && warehouseName && (
                    <a
                      href={`/warehouse/detail/${warehouseId}`}
                      target="_blank"
                      className={classes.col2}
                      rel="noreferrer"
                    >
                      <span className={classes.warehouse} key={warehouseId}>{warehouseName}</span>
                    </a>
                  )}
                </Col>
              </Col>
            </AntCard>
          </Col>
        )
      }
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <AntCard
          title={t('CARD_INFO.RESTAURANT.TITLE')}
          className={classes.FoodInfo}
          extra={(
            <a
              className={classes.detailButton}
              href={`${ENVIRONMENT.REACT_APP_FOOD_RESTAURANT_PANEL_URL}/r/${orderDetailRestaurantId}/dashboard`}
            >
              {t('global:DETAIL')}
            </a>
          )}
        >
          <Col className={classes.colInfo}>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.RESTAURANT.NAME')}</span>
              <span className={classes.col2}>{restaurantName}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.RESTAURANT.GSM')}</span>
              <Text
                className={classes.col2}
                copyable={{ tooltips: [t('CARD_INFO.RESTAURANT.GSM_COPY'), t('CARD_INFO.RESTAURANT.GSM_COPIED')] }}
              >
                {restaurantGsm}
              </Text>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.RESTAURANT.CITY')}</span>
              <span className={classes.col2}>{restaurantCityName}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.RESTAURANT.TOTAL')}</span>
              <span className={classes.col2}>{restaurantTotalFoodOrderCount}</span>
            </Col>
            {estimatedDeliveryDuration && (
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_INFO.RESTAURANT.RG_DURATION')}</span>
                <span className={classes.col2}>{estimatedDeliveryDuration.toFixed(0)}</span>
              </Col>
            )}
          </Col>
        </AntCard>
      </Col>
    </Row>
  );
};

export default CardSections;
