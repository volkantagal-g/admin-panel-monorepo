import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Col, Collapse, message, Row } from 'antd';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import {
  actionSelector,
  autoGrowthSelector,
  limitSelector,
  packetSelector,
  promoSetSelector,
  targetSelector,
} from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { AUTO_TYPES } from '@app/pages/MarketAutoGrowthOperations/constants';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketAutoGrowthOperations/redux/saga';
import reducer from '@app/pages/MarketAutoGrowthOperations/redux/reducer';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

import PageTitle from '@app/pages/MarketAutoGrowthOperations/components/PageHeader';
import DomainTypeFilter from '@app/pages/MarketAutoGrowthOperations/components/DomainTypeFilter';
import AutoPromoSet from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet';
import AutoTarget from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget';
import AutoPacket from '@app/pages/MarketAutoGrowthOperations/components/AutoPacket';
import AutoAction from '@app/pages/MarketAutoGrowthOperations/components/AutoAction';
import AutoLimit from '@app/pages/MarketAutoGrowthOperations/components/AutoLimit';

const { Panel } = Collapse;

const MarketAutoGrowthOperations = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS.name,
    squad: ROUTE.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS.squad,
  });
  const COLLAPSE_AUTO_PROMO_PREFIX = 'AUTO_GROWTH_PROMO_SET_COMPONENT_COLLAPSE_';

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const domainTypeLoading = useSelector(promoSetSelector.domainTypeLoading);
  const domainTypeList = useSelector(promoSetSelector.domainTypeList);
  const error = useSelector(autoGrowthSelector.error);

  const [domainDisable, setDomainDisable] = useState(false);
  const updateList = useSelector(promoSetSelector.updateList);
  const updateTargetList = useSelector(targetSelector.updateTargetList);
  const updatePacketList = useSelector(packetSelector.updatePacketList);
  const updateActionList = useSelector(actionSelector.updateActionList);
  const updateLimitList = useSelector(limitSelector.updateLimitList);

  useEffect(() => {
    if (updateList?.add?.length > 0 || updateList?.delete?.length > 0 || updateList?.update?.length > 0 ||
      updateTargetList?.length > 0 || updatePacketList?.length > 0 ||
      updateActionList?.add?.length > 0 || updateActionList?.delete?.length > 0 || updateActionList?.update?.length > 0 ||
      updateLimitList?.add?.length > 0 || updateLimitList?.delete?.length > 0 || updateLimitList?.update?.length > 0) {
      setDomainDisable(true);
    }
    else setDomainDisable(false);
  }, [updateList, updateTargetList, updatePacketList, updateActionList, updateLimitList]);

  useEffect(() => {
    dispatch(Creators.getDomainTypeListRequest());
    dispatch(Creators.getChangeReasonsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error({ content: t(error?.message || 'FAIL_PLEASE_CHECK') });
  }, [error, t]);

  return (
    <div className={classes.page}>
      <PageTitle />
      <Row className={classes.pageFilter}>
        <Col sm={4} />
        <Col sm={4}>
          <DomainTypeFilter
            domainTypeList={domainTypeList}
            disabled={domainTypeList?.length < 2 || domainDisable}
            loading={domainTypeLoading}
          />
        </Col>
        <Col sm={4} className={classes.information}>
          {t('INFORMATION')}
        </Col>
      </Row>
      <Collapse defaultActiveKey={`${COLLAPSE_AUTO_PROMO_PREFIX}1`}>
        <Panel
          header={t(AUTO_TYPES.PROMOSET)}
          key={`${COLLAPSE_AUTO_PROMO_PREFIX}1`}
        >
          <AutoPromoSet />
        </Panel>
        <Panel
          header={t(AUTO_TYPES.TARGET)}
          key={`${COLLAPSE_AUTO_PROMO_PREFIX}2`}
        >
          <AutoTarget />
        </Panel>
        <Panel
          header={t(AUTO_TYPES.PACKET)}
          key={`${COLLAPSE_AUTO_PROMO_PREFIX}3`}
        >
          <AutoPacket />
        </Panel>
        <Panel
          header={t(AUTO_TYPES.ACTION)}
          key={`${COLLAPSE_AUTO_PROMO_PREFIX}4`}
        >
          <AutoAction />
        </Panel>
        <Panel header={t(AUTO_TYPES.LIMIT)} key={`${COLLAPSE_AUTO_PROMO_PREFIX}5`}>
          <AutoLimit />
        </Panel>
      </Collapse>
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketAutoGrowthOperations);
