import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { PageHeader, Col, Row } from 'antd';

import { t } from '@shared/i18n';
import { REDUX_KEY, PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Filter, Table } from './components';
import { ROUTE } from '@app/routes';
import { getPersonCandidateListRequestParams } from './utils';

const PersonCandidateListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_CANDIDATE_LIST.name, squad: ROUTE.PERSON_CANDIDATE_LIST.squad });
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    selectedFranchise: null,
    selectedWarehouse: null,
    selectedRequestTimeRange: [],
    selectedStatus: [PERSON_CANDIDATE_FORM_STATUSES.ON_CUSTOMER_SERVICE],
    selectedWorkerType: null,
    selectedAssignees: [],
    filteredUniqueIdentifier: null,
  });

  const handleExport = () => {
    dispatch(
      Creators.getPersonCandidateListReportRequest({ filters: getPersonCandidateListRequestParams(filters, false) }),
    );
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getMarketFranchisesRequest({}));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.PERSON_CANDIDATE.LIST')} />
        </Col>
      </Row>
      <Filter filters={filters} handleSubmit={setFilters} />
      <Table filters={filters} onExport={handleExport} />
    </>
  );
};

const reduxKey = REDUX_KEY.PERSON_CANDIDATE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PersonCandidateListPage);
