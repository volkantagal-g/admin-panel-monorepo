import { useDispatch, useSelector } from 'react-redux';

import { useCursorPagination } from '@shared/hooks';
import { Table } from '@shared/components/GUI';
import { Creators } from '../../redux/actions';
import { searchMentorshipCoursesSelector } from '../../redux/selectors';

import { tableColumns } from './config';

const SearchTable = ({ t, data, loading, classes }) => {
  const dispatch = useDispatch();
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(searchMentorshipCoursesSelector.getPaginationData);

  const searchMentorshipCoursesRequest = currentFilters => {
    dispatch(Creators.searchMentorshipCoursesRequest({ body: currentFilters }));
  };

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    searchMentorshipCoursesRequest({ limit: value });
  };

  const handleNextBtnClick = () => {
    searchMentorshipCoursesRequest({ limit, nextPageCursor });
  };

  const handlePreviousBtnClick = () => {
    searchMentorshipCoursesRequest({ limit, previousPageCursor });
  };

  const pagination = useCursorPagination({
    limit,
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    isLoading: loading,
    handleNext: handleNextBtnClick,
    handlePrevious: handlePreviousBtnClick,
    handleLimit: handleLimitChange,
  });

  return (
    <>
      <Table
        key="searchTable"
        title=""
        data={data}
        loading={loading}
        columns={tableColumns({ t, classes })}
        pagination={false}
        isBorderRounded
      />
      <div className="d-flex justify-content-end">
        {pagination}
      </div>
    </>
  );
};

export default SearchTable;
