import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import {
  DocumentTypeFilter,
  Header,
  PreviousAgreements,
} from '@app/pages/CustomerAgreement/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useInitAndDestroyPage } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from '@app/pages/CustomerAgreement/redux/actions';
import { documentTypeSelector } from '@app/pages/CustomerAgreement/redux/selectors';

const CustomerAgreement = () => {
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });

  const selectedDocumentType = useSelector(documentTypeSelector.getSelected);

  return (
    <>
      <Header />
      <DocumentTypeFilter />
      {!!selectedDocumentType && (
        <PreviousAgreements />
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.CUSTOMER_AGREEMENT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CustomerAgreement);
