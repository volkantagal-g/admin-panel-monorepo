import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import { map } from 'lodash';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getPromoObjectiveTypes } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { Creators } from '../../../redux/actions';
import {
  getClientListData,
  getMarketPromosBySearchCodeSelector,
} from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import MarketPromosSelect from '../../common/MarketPromosSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import useStyles from './styles';

const subSectionName = 'promoUsage';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;
const { Text } = Typography;

const PromoDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));

  const marketPromos = useSelector(getMarketPromosBySearchCodeSelector.getData);
  const marketPromosIsPending = useSelector(getMarketPromosBySearchCodeSelector.getIsPending);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const mapper = useCallback(promoData => map(promoData, item => ({
    id: item.id || item._id,
    name: item?.metadata?.code || item?.promoCode,
  })), []);

  const clearSelectableMarketPromos = () => {
    dispatch(Creators.resetMarketPromosRequest());
  };
  const promoObjectiveOptions = getPromoObjectiveTypes(t);

  return (
    <CollapsePanel header={t('PROMO_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <Text className={classes.container}>{t('PROMO_SUBSECTIONS_SEPARATED_NOTE')}</Text>
          <MarketPromosSelect
            activeKey={activeKey}
            label={t('PROMOS')}
            clientListKey="usedPromos"
            value={data.usedPromos}
            onBlur={clearSelectableMarketPromos}
            selectable={mapper(marketPromos)}
            disabled={marketPromosIsPending}
            showCSVImporter
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_CLIENTS')}
            description={t('EXCLUDE_CLIENTS_DESCRIPTION')}
            value={data.excludeClients}
            clientListKey="excludeClients"
          />
          <MultipleSelect
            activeKey={activeKey}
            clientListKey="promoObjective"
            value={data.promoObjective}
            selectable={promoObjectiveOptions}
            tagValue="label"
            tagKey="value"
            label={t('PROMO_OBJECTIVE')}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default PromoDetail;
