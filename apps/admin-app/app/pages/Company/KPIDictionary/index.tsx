import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { useEffect } from 'react';
import { Space } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import KpiDictionaryFilter from './components/KpiDictionaryFilter';
import KpiDictionaryTable from './components/Table';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyle from './styles';

const CompanyKpiDictionaryPage = () => {
  const { t } = useTranslation(['companyKPIDictionaryPage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyle();

  usePageViewAnalytics({
    name: ROUTE.COMPANY_KPI_DICTIONARY.name,
    squad: ROUTE.COMPANY_KPI_DICTIONARY.squad,
  });

  useInitAndDestroyPage({
    dispatch,
    // @ts-ignore
    Creators,
  });

  useEffect(() => {
    dispatch(Creators.getFilterOptionsRequest());
    dispatch(Creators.getKPIDictionaryRequest());
    dispatch(Creators.getKPIAcronymDictionaryRequest());
  }, [dispatch]);

  return (
    <div className={classes.pageContainer}>
      <Space direction="vertical" className="w-100">
        <KpiDictionaryFilter />
        <KpiDictionaryTable />
      </Space>
    </div>
  );
};

const reduxKey = REDUX_KEY.COMPANY.KPI_DICTIONARY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CompanyKpiDictionaryPage);
