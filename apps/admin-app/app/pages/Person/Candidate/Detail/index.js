import { useParams } from 'react-router-dom';

import { usePageViewAnalytics } from '@shared/hooks';
import { Form } from './components';
import { ROUTE } from '@app/routes';

const PersonCandidateDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_CANDIDATE_DETAIL.name, squad: ROUTE.PERSON_CANDIDATE_DETAIL.squad });
  const { id } = useParams();

  return (
    <>
      <Form personId={id} />
    </>
  );
};

export default PersonCandidateDetailPage;
