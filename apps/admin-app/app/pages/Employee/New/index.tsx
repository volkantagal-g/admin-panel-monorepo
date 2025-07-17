import { Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import EmployeeNewForm from './components/EmployeeNewForm';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './style';

const reduxKey = REDUX_KEY.EMPLOYEE.NEW;

const EmployeeNewPage = () => {
  const { t } = useTranslation(['global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_NEW.name, squad: ROUTE.EMPLOYEE_NEW.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.NEW')} />
      <div className={classes.pageContainer}>
        <Space direction="vertical" className="w-100">
          <EmployeeNewForm onSubmit={() => {}} />
        </Space>
      </div>
    </>
  );
};

export default EmployeeNewPage;
