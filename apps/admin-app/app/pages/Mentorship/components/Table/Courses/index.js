import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Table } from '@shared/components/GUI';
import { tableColumns } from './config';
import CreateOrUpdateCourseModal from './Modal';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { createOrUpdateMentorshipCourseSelector, filterMentorshipCoursesSelector, isModalOpenSelector } from './redux/selectors';
import { useCursorPagination, useInitAndDestroyPage } from '@shared/hooks';
import { getInitialValues } from './Modal/formHelper';
import useStyles from './styles';

const CoursesTable = ({ userData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'global']);
  const isModalOpen = useSelector(isModalOpenSelector);
  const isCreateOrUpdatePending = useSelector(createOrUpdateMentorshipCourseSelector.getIsPending);
  const mentorshipCourses = useSelector(filterMentorshipCoursesSelector.getData);
  const isPending = useSelector(filterMentorshipCoursesSelector.getIsPending);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(filterMentorshipCoursesSelector.getPaginationData);

  const [selectedCourse, setSelectedCourse] = useState();
  const [isAddNewCourse, setIsAddNewCourse] = useState(false);

  const memoizedHandleUpdateMentorshipCourseBtnClick = useCallback(({ course }) => {
    setSelectedCourse(course);
    dispatch(Creators.openModal());
  }, [dispatch]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(Creators.filterMentorshipCoursesRequest({ body: { mentor: userData?._id } }));
    }
  }, [dispatch, userData]);

  const handleAddNewMentorshipCourseBtnClick = () => {
    setIsAddNewCourse(true);
    dispatch(Creators.openModal());
  };

  const handleCreateOrUpdateMentorshipCourse = values => {
    dispatch(Creators.createOrUpdateMentorshipCourseRequest({ body: { ...values, ...(isAddNewCourse ? { mentor: userData?._id } : undefined) } }));
    setIsAddNewCourse(false);
  };

  const handleDeleteMentorshipCourseBtnClick = ({ course }) => {
    dispatch(Creators.deleteMentorshipCourseRequest({ body: { id: course?._id, mentor: userData?._id } }));
  };

  const handleCloseModal = () => {
    setSelectedCourse();
    setIsAddNewCourse(false);
    dispatch(Creators.closeModal());
  };

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit: value, mentor: userData?._id } }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit, nextPageCursor, mentor: userData?._id } }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.filterMentorshipCoursesRequest({ body: { limit, previousPageCursor, mentor: userData?._id } }));
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

  return (
    <div className={classes.root}>
      <Table
        title={t('MENTORSHIP_TOPICS')}
        headerControls={(
          <Button
            className="ml-auto"
            data-testid="add-new-topic"
            type="primary"
            onClick={handleAddNewMentorshipCourseBtnClick}
            icon={<PlusOutlined />}
          >
            {t('ADD_NEW_MENTORSHIP')}
          </Button>
        )}
        data={mentorshipCourses}
        loading={isPending}
        columns={tableColumns({
          t,
          handleUpdateMentorshipCourseBtnClick: memoizedHandleUpdateMentorshipCourseBtnClick,
          handleDeleteMentorshipCourseBtnClick,
        })}
        pagination={false}
        isBorderRounded
      />
      <div className="d-flex justify-content-end mt-2">
        {pagination}
      </div>
      {(isAddNewCourse || selectedCourse) && (
        <CreateOrUpdateCourseModal
          isUpdate={!isAddNewCourse && !!selectedCourse}
          isOpen={isModalOpen}
          isPending={isCreateOrUpdatePending}
          onSubmit={handleCreateOrUpdateMentorshipCourse}
          onClose={handleCloseModal}
          initialValues={getInitialValues(selectedCourse)}
        />
      )}
    </div>
  );
};

export default CoursesTable;
