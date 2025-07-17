import { Card, Col, Row, Spin, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { isNaN } from 'lodash';
import { useTranslation } from 'react-i18next';

import { numberFormatWithTwoDecimal, percentFormatWithoutDecimal } from '@shared/utils/localization';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { getActiveOrderStats, getFormattedOrderData } from '../../redux/selectors';
import { TEST_ID } from '../../constants';

export const StatsCard = () => {
  const { t } = useTranslation('activeOrdersForOperationPage');
  const totalActiveOrder = useSelector(getFormattedOrderData.getCount);
  const totalKuzeydenCarboyCount = useSelector(getFormattedOrderData.getTotalKuzeydenCarboyCount);
  const activeOrderStats = useSelector(getActiveOrderStats.getData);
  const isActiveOrderStatsPending = useSelector(getActiveOrderStats.getIsPending);
  const isPending = useSelector(getFormattedOrderData.getIsPending);
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const { Text } = Typography;

  const courierAssignedOrderPercentage = isNaN(activeOrderStats.courierAssignedOrderCount / totalActiveOrder) ? 0
    : percentFormatWithoutDecimal.format((activeOrderStats.courierAssignedOrderCount || 0) / totalActiveOrder);

  const promoOrderPercentage = isNaN(activeOrderStats.promoOrderCount / totalActiveOrder) ? 0
    : percentFormatWithoutDecimal.format((activeOrderStats.promoOrderCount || 0) / totalActiveOrder);
  return (
    <Spin spinning={isPending || isActiveOrderStatsPending || isAvailableDomainTypesPending} size="medium">
      <Card
        size="small"
      >
        <Row gutter={[4, 4]}>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.TOTAL_ACTIVE_ORDER}>
              {t('TOTAL_ACTIVE_ORDER')}: <b>{totalActiveOrder || 0}</b>
            </Text>&nbsp;
            {!!totalKuzeydenCarboyCount && (
              <Tooltip title={t('TOTAL_KUZEYDEN_CARBOY_COUNT')}>
                <Text><b>{`(${totalKuzeydenCarboyCount})`}</b></Text>
              </Tooltip>
            )}
          </Col>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.PROMO_COUNT}>
              {t('PROMO_COUNT')}
            </Text>: <b>{activeOrderStats.promoOrderCount || 0}</b>
            <b>({promoOrderPercentage})</b>
          </Col>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.COURIER_ASSIGNED}>
              {t('COURIER_ASSIGNED')}: <b>{activeOrderStats.courierAssignedOrderCount || 0}</b>
            </Text>&nbsp;
            <Tooltip title={t('COURIER_ASSIGNED_ORDER_PERCENTAGE')}>
              <Text><b>{`(${courierAssignedOrderPercentage})`}</b></Text>&nbsp;
            </Tooltip>
          </Col>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.COURIER_UNASSIGNED}>
              {t('COURIER_UNASSIGNED')}: <b>{activeOrderStats?.courierUnassignedOrderCount}</b>
            </Text>&nbsp;
          </Col>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.AVERAGE_WEIGHT_SHORT}>
              {t('AVERAGE_WEIGHT_SHORT')}: <b>{numberFormatWithTwoDecimal.format((activeOrderStats?.averageWeight || 0) / 1000)} kg</b>
            </Text>&nbsp;
          </Col>
          <Col>
            <Text data-testid={TEST_ID.STATS_CARD.AVERAGE_VOLUME_SHORT}>
              {t('AVERAGE_VOLUME_SHORT')}: <b>{numberFormatWithTwoDecimal.format(activeOrderStats?.averageVolume || 0)} cm<sup>3</sup></b>
            </Text>&nbsp;
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};
