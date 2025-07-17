import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createMap } from '@shared/utils/common';
import { Space, Table } from '@shared/components/GUI';
import { useCursorPagination } from '@shared/hooks';
import useRequestMentorshipModal from '@app/pages/Mentorship/components/RequestMentorshipModal/useRequestMentorshipModal';
import { Creators } from '../../redux/actions';
import { filterMentorshipCoursesSelector } from '../../redux/selectors';
import { tableColumns } from './config';

const CoursesTable = ({ mentorData, userNotExists, showRequestMentorshipButton }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation(['mentorshipPage', 'global']);
  const data = useSelector(filterMentorshipCoursesSelector.getData);
  const isPending = useSelector(filterMentorshipCoursesSelector.getIsPending);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(filterMentorshipCoursesSelector.getPaginationData);

  const { renderRequestMentorshipModal, handleRequestMentorshipBtnClick } = useRequestMentorshipModal();

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit: value, mentor: mentorData?._id } }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit, nextPageCursor, mentor: mentorData?._id } }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit, previousPageCursor, mentor: mentorData?._id } }));
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

  return mentorData?.isMentor ? (
    <Space>
      <>
        <Table
          title={t('MENTORSHIP_TOPICS')}
          data={data?.courses}
          loading={isPending}
          columns={tableColumns({
            t,
            userNotExists,
            requests: createMap(data?.requests, { field: 'course' }),
            showRequestMentorshipButton,
            handleRequestMentorshipBtnClick,
          })}
          pagination={false}
          isBorderRounded
        />
        <div className="d-flex justify-content-end mt-2">
          {pagination}
        </div>
        {showRequestMentorshipButton && renderRequestMentorshipModal}
      </>
    </Space>
  ) : null;
};

export default CoursesTable;
