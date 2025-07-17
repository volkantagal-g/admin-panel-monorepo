import { useDispatch } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import { AssetNewForm } from './components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import useModuleStyles from '../style';
import { ROUTE } from '@app/routes.ts';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT.NEW;

const AssetManagementNewPage = () => {
  const { t } = useTranslation(['assetManagement']);
  const moduleClasses = useModuleStyles();
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className={moduleClasses.pageContainer}>
      <header className={moduleClasses.pageHeader}>
        <Link to={ROUTE.ASSET_MANAGEMENT_LIST.path} className="mr-2">
          <ArrowLeftOutlined />
        </Link>
        <h4>{t('assetManagement:COMPANY_CAR_NEW')}</h4>
      </header>
      <AssetNewForm />
    </div>
  );
};

export default AssetManagementNewPage;
