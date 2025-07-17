import { useState } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import IncidentTable from './components/IncidentTable';
import IncidentFilters from './components/IncidentFilters';

import BATHeader from '../../components/BATHeader';
import BATCard from '../../components/BATCard';

import useStyles from './styles';
import { INITIAL_PAGINATION_OBJECT } from '../../constants';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.LIST;

function BATIncidentListPage() {
  const classes = useStyles();
  const { t } = useTranslation(['batIncidentListPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_LIST.name,
    squad: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_LIST.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  const [pagination, setPagination] = useState<PaginationProps>(INITIAL_PAGINATION_OBJECT);

  return (
    <>
      <PageTitleHeader title={t('batIncidentListPage:PAGE_TITLE.INCIDENT.LIST')} />
      <div className={classes.pageContainer}>
        <BATHeader title={t('batIncidentListPage:PAGE_TITLE.INCIDENT.LIST')} />
        <BATCard>
          <IncidentFilters pagination={pagination} setPagination={setPagination} />
          <IncidentTable pagination={pagination} setPagination={setPagination} />
        </BATCard>
      </div>
    </>
  );
}

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BATIncidentListPage);
