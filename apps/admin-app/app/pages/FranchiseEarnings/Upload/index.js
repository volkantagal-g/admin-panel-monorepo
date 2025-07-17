import { useDispatch } from 'react-redux';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { usePermission, useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Form } from './components';
import { EXCEL_PARSE_TYPE } from './constants';

const reduxKey = REDUX_KEY.FRANCHISE_EARNINGS.UPLOAD;

const Upload = () => {
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_EARNINGS_UPLOAD.name, squad: ROUTE.FRANCHISE_EARNINGS_UPLOAD.squad });

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { Can } = usePermission();

  return (
    <>
      <Can permKey={permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_VEST_FOR_FINANCE}>
        <Form earningType={EXCEL_PARSE_TYPE.FINANCIAL} />
      </Can>
      <Can permKey={permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_VEST_FOR_OPERATION}>
        <Form earningType={EXCEL_PARSE_TYPE.OPERATIONAL} />
      </Can>
      <Can permKey={permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_COMPONENT_GETIR_FINANCE}>
        <Form earningType={EXCEL_PARSE_TYPE.GETIR_FINANCE} />
      </Can>
    </>
  );
};

export default Upload;
