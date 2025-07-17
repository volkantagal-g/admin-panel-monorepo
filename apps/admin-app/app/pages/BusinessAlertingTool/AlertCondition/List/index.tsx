import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Button } from 'antd';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import BATCard from '../../components/BATCard';
import BATHeader from '../../components/BATHeader';
import AlertConditionFilters from './components/AlertConditionFilters';
import AlertConditionTable from './components/AlertConditionTable';

import useStyles from './styles';
import { INITIAL_PAGINATION_OBJECT } from '../../constants';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.LIST;

function BATAlertConditionListPage() {
  const classes = useStyles();
  const { t } = useTranslation(['batAlertConditionListPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST.name,
    squad: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  const [pagination, setPagination] = useState<PaginationProps>(INITIAL_PAGINATION_OBJECT);

  return (
    <>
      <PageTitleHeader title={t('batAlertConditionListPage:PAGE_TITLE.ALERT_CONDITION.LIST')} />
      <div className={classes.pageContainer}>
        <BATHeader title={t('batAlertConditionListPage:PAGE_TITLE.ALERT_CONDITION.LIST')}>
          <RedirectButtonV2
            text={t('batAlertConditionListPage:ACTIONS.NEW_ALERT_CONDITION')}
            to={ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_NEW.path}
            type="primary"
            iconComponent={undefined}
            permKey={permKey.PAGE_BUSINESS_ALERTING_TOOL_ALERT_CONDITION_NEW}
            target="_self"
          />
        </BATHeader>
        <BATCard>
          <AlertConditionFilters pagination={pagination} setPagination={setPagination} />
          <AlertConditionTable pagination={pagination} setPagination={setPagination} />
        </BATCard>
      </div>
    </>
  );
}

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BATAlertConditionListPage);
