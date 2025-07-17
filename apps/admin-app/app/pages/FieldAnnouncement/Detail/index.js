import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { reducerKey as reduxKey } from './redux/key';
import FormWrapper from './components/Form';
import Header from './components/PageHeader';

const FieldAnnouncementDetail = () => {
  usePageViewAnalytics({ name: ROUTE.FIELD_ANNOUNCEMENT_DETAIL.name, squad: ROUTE.FIELD_ANNOUNCEMENT_DETAIL.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('fieldAnnouncementPage');
  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAnnouncementDetailRequest({ requestBody: id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id, t]);

  return (
    <>
      <Header />
      <FormWrapper />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FieldAnnouncementDetail);
