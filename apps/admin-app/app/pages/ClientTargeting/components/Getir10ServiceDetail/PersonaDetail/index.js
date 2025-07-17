import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData, getPersonaClientFlagsSelector } from '../../../redux/selectors';
import PersonasSelect from '../../common/PersonasSelect';
import { Creators } from '../../../redux/actions';
import PersonaClientFlagsSelect from '../../common/PersonaClientFlagsSelect';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'personaDetail';
const activeKey = `${clientListSections.getir10ServiceDetail}.${subSectionName}`;

const PersonaDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));
  const personaClientFlags = useSelector(getPersonaClientFlagsSelector.getData);
  const isPersonaClientFlagsPending = useSelector(getPersonaClientFlagsSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getPersonaClientFlagsRequest());
  }, [dispatch]);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t("PERSONA_G10_DETAIL")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <PersonasSelect
            activeKey={activeKey}
            value={data.personas}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minHabitRankValue}
            maxCount={data.maxHabitRankValue}
            minCountKey="minHabitRankValue"
            maxCountKey="maxHabitRankValue"
            label={t("HABIT_RANK")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minTimeSpecificRankValue}
            maxCount={data.maxTimeSpecificRankValue}
            minCountKey="minTimeSpecificRankValue"
            maxCountKey="maxTimeSpecificRankValue"
            label={t("TIME_SPECIFIC_RANK")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minWeekendOrderRatioValue}
            maxCount={data.maxWeekendOrderRatioValue}
            minCountKey="minWeekendOrderRatioValue"
            maxCountKey="maxWeekendOrderRatioValue"
            label={t("WEEKEND_ORDER_RATIO")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minOrganicRankValue}
            maxCount={data.maxOrganicRankValue}
            minCountKey="minOrganicRankValue"
            maxCountKey="maxOrganicRankValue"
            label={t("ORGANIC_RANK")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minGetirFinancedPromoRatioValue}
            maxCount={data.maxGetirFinancedPromoRatioValue}
            minCountKey="minGetirFinancedPromoRatioValue"
            maxCountKey="maxGetirFinancedPromoRatioValue"
            label={t("GETIR_FINANCED_PROMO_RATIO")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minBasketDurationRankValue}
            maxCount={data.maxBasketDurationRankValue}
            minCountKey="minBasketDurationRankValue"
            maxCountKey="maxBasketDurationRankValue"
            label={t("BASKET_DURATION_RANK")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minCategoryRankValue}
            maxCount={data.maxCategoryRankValue}
            minCountKey="minCategoryRankValue"
            maxCountKey="maxCategoryRankValue"
            label={t("CATEGORY_RANK")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minPremiumRankValue}
            maxCount={data.maxPremiumRankValue}
            minCountKey="minPremiumRankValue"
            maxCountKey="maxPremiumRankValue"
            label={t("PREMIUM_RANK")}
          />
          <PersonaClientFlagsSelect
            activeKey={activeKey}
            value={data.flags}
            selectable={personaClientFlags}
            disabled={isPersonaClientFlagsPending}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default PersonaDetail;
