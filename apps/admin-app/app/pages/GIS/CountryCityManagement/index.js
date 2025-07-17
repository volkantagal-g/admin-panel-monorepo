import { Row, Col, Typography, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { useEffect } from 'react';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { usePageViewAnalytics } from '@shared/hooks';
import { Creators } from './redux/actions';

import { ROUTE } from '@app/routes';
import { CountryCreate, CountryList } from './components';
import CityList from './components/City/List';
import CityCreate from './components/City/Create';

const { Title } = Typography;
const { Panel } = Collapse;

const CountryCityManagement = () => {
  usePageViewAnalytics({
    name: ROUTE.GIS_COUNTRY_CITY_MANAGEMENT.name,
    squad: ROUTE.GIS_COUNTRY_CITY_MANAGEMENT.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('gisCountryCityManagementPage');

  const pageTitle = t('PAGE_TITLE');

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getCountriesWPageSizeRequest());
  }, [dispatch]);
  return (
    <>
      <Row justify="end" align="middle">
        <Col flex={5}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>

      <Collapse defaultActiveKey={['countryList']} ghost>
        <Panel header={t('COUNTRY_LIST')} key="countryList">
          <Row justify="end" align="middle">
            <CountryCreate />
            <CountryList />
          </Row>
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={['cityList']} ghost>
        <Panel header={t('CITY_LIST')} key="cityList">
          <Row justify="end" align="middle">
            <CityCreate />
            <CityList />
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};

const reduxKey = REDUX_KEY.GIS.COUNTRY_CITY_MANAGEMENT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(CountryCityManagement);
