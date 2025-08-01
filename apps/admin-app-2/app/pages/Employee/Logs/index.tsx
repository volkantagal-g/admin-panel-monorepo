import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';

import {
  useInitAndDestroyPage,
  usePageViewAnalytics,
  useUrlQueryParams,
} from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

// Redux
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

// Components
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import Header from './components/Header';
import Filters from './components/Filter';
import LogTable from './components/LogTable';

// Styles
import useStyle from './styles';

const reduxKey = REDUX_KEY.EMPLOYEE.LOGS;

export default function EmployeeLogsPage() {
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_LOGS.name, squad: ROUTE.EMPLOYEE_LOGS.squad });

  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'employeeLogsPage', 'employeePage']);
  const classes = useStyle();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.LOGS')} />
      <div className={classes.pageContainer}>
        <Header />
        <Space direction="vertical" className="w-100">
          <Filters />
          <LogTable />
        </Space>
      </div>
    </div>
  );
}
