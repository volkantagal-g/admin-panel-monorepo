import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators as ProgressCreators } from '../../redux/actions';
import AddOrUpdateSessionNoteModal from './Modal';
import { Button } from '@shared/components/GUI';
import { reduxKey } from './constants';
import Card from '../Card';
import useStyles from './styles';
import { isModalOpenSelector, getIsNewSessionNoteSelector, getActiveSessionNoteSelector } from './redux/selectors';
import { getInitialValues } from './Modal/formHelper';

const SessionNotes = ({ sessionNotes, isPending, disabled, mentorshipRequestId }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'global']);
  const classes = useStyles();

  const isModalOpen = useSelector(isModalOpenSelector);
  const isNewSessionNote = useSelector(getIsNewSessionNoteSelector.getData);
  const activeSessionNote = useSelector(getActiveSessionNoteSelector.getData);
  const isUpdate = !isNewSessionNote && !!activeSessionNote;

  const handleSessionNoteOnClick = sessionNote => {
    dispatch(Creators.setActiveSessionNote({ sessionNote }));
    dispatch(Creators.openModal());
  };

  const handleAddNewBtnClick = () => {
    dispatch(Creators.setIsNewSessionNote({ isNew: true }));
    dispatch(Creators.openModal());
  };

  const handleAddOrUpdateSessionNoteClose = () => {
    dispatch(Creators.setIsNewSessionNote({ isNew: false }));
    dispatch(Creators.closeModal());
  };

  const handleAddOrUpdateSessionNote = values => {
    dispatch(ProgressCreators.addOrUpdateMentorshipSessionNoteRequest({
      body: {
        ...values,
        mentorshipRequest: mentorshipRequestId,
        isUpdate,
      },
    }));
  };

  return (
    <Card title={t('SESSION_NOTES')}>
      <div className={`${classes.root} ${sessionNotes?.length && 'pb-3'}`}>
        {sessionNotes?.map(sessionNote => (
          <Button
            key={sessionNote?._id}
            color="default"
            disabled={disabled}
            className={classes.sessionNoteItem}
            onClick={() => handleSessionNoteOnClick(sessionNote)}
            icon={<CalendarOutlined className={classes.icon} />}
          >
            <div className={classes.textWrapper}>
              <p className={classes.note} type="text" color="defaultWithoutBorder" title={sessionNote?.note}>
                {sessionNote?.note}
              </p>
              <span className={classes.date}>{moment(sessionNote?.date).format('DD.MM.YYYY')}</span>
            </div>
          </Button>
        ))}
      </div>
      <Button
        size="small"
        className="w-100"
        icon={<PlusOutlined />}
        onClick={handleAddNewBtnClick}
        disabled={disabled}
      >
        {t('ADD_NEW_NOTE')}
      </Button>
      {(isNewSessionNote || activeSessionNote) && (
      <AddOrUpdateSessionNoteModal
        isOpen={isModalOpen}
        sessionNote={activeSessionNote && getInitialValues(activeSessionNote)}
        onSubmit={handleAddOrUpdateSessionNote}
        onClose={handleAddOrUpdateSessionNoteClose}
        isPending={isPending}
        isUpdate={isUpdate}
      />
      )}
    </Card>
  );
};

export default SessionNotes;
