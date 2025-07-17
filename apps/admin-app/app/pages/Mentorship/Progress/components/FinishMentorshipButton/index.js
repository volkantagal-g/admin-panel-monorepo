import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components/GUI';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { reduxKey } from './Modal/constants';
import { Creators } from './Modal/redux/actions';
import reducer from './Modal/redux/reducer';
import saga from './Modal/redux/saga';
import FinishMentorshipModal from './Modal';
import { useInitAndDestroyPage } from '@shared/hooks';

const FinishMentorshipButton = ({ mentorshipRequestId, isPending }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'global']);

  const handleOpenModal = () => {
    dispatch(Creators.openModal());
  };

  const handleCloseModal = () => {
    dispatch(Creators.closeModal());
  };

  return (
    <div>
      <Button
        danger
        className="d-flex ml-auto"
        onClick={handleOpenModal}
        disabled={isPending}
      >{t('FINISH_THE_MENTORSHIP')}
      </Button>
      {mentorshipRequestId && <FinishMentorshipModal mentorshipRequestId={mentorshipRequestId} onClose={handleCloseModal} />}
    </div>
  );
};

export default FinishMentorshipButton;
