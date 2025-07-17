import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons';

import { tableColumns } from './config';
import { isEmptyObject } from '@shared/utils/common';
import { Button, Table } from '@shared/components/GUI';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useCursorPagination, useInitAndDestroyPage } from '@shared/hooks';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { filterMentorshipRequestMatchesSelector } from './redux/selectors';

const MyMatchesTable = ({ userData }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'global']);
  const requests = useSelector(filterMentorshipRequestMatchesSelector.getData);
  const isPending = useSelector(filterMentorshipRequestMatchesSelector.getIsPending);
  const filtersData = useSelector(filterMentorshipRequestMatchesSelector.getFilters);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(filterMentorshipRequestMatchesSelector.getPaginationData);

  // eslint-disable-next-line no-unused-vars
  const handleOnChange = (_, filters) => {
    dispatch(Creators.setFilters({ filters }));
    dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { filters, limit, mentorOrMenteeId: userData._id } }));
  };

  const resetFilters = () => {
    dispatch(Creators.resetFilters());
    dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { filters: {}, limit, mentorOrMenteeId: userData._id } }));
  };

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { limit: value, mentorOrMenteeId: userData._id } }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { limit, nextPageCursor, mentorOrMenteeId: userData._id } }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { limit, previousPageCursor, mentorOrMenteeId: userData._id } }));
  };

  const pagination = useCursorPagination({
    limit,
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    isLoading: isPending,
    handleNext: handleNextBtnClick,
    handlePrevious: handlePreviousBtnClick,
    handleLimit: handleLimitChange,
  });

  useEffect(() => {
    if (userData._id) {
      dispatch(Creators.filterMentorshipRequestMatchesRequest({ body: { mentorOrMenteeId: userData._id } }));
    }
  }, [dispatch, userData]);

  return (
    <div>
      <Table
        title={t('MY_MATCHES')}
        data={requests?.filter(request => request.mentorshipStatus)}
        loading={isPending}
        columns={tableColumns({ t, userData, filters: filtersData })}
        pagination={false}
        onChange={handleOnChange}
        isBorderRounded
      />
      <div className="d-flex justify-content-end mt-2">
        {!isEmptyObject(filtersData) && (
          <Button
            className="mr-2"
            icon={<RollbackOutlined />}
            size="small"
            color="secondary"
            onClick={resetFilters}
          >{t('RESET_FILTERS')}
          </Button>
        )}
        {pagination}
      </div>
    </div>
  );
};

export default MyMatchesTable;
