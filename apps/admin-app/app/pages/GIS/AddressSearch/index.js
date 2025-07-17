import { Row, Col, Typography, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';

import { useCallback, useEffect } from 'react';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { Creators } from './redux/actions';

import saga from './redux/saga';
import reducer from './redux/reducer';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { AdressList } from './components';
import { addressSearchSelector } from './redux/selectors';
import { REDUX_KEY } from '@shared/shared/constants';

const { Title } = Typography;

const AddressSearch = () => {
  usePageViewAnalytics({
    name: ROUTE.GIS_ADDRESS_SEARCH.name,
    squad: ROUTE.GIS_ADDRESS_SEARCH.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('gisAddressSearchPage');
  const pageTitle = t('PAGE_TITLE');

  const searchResult = useSelector(addressSearchSelector.addressesData);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const handleOnChange = useCallback(event => {
    const { value } = event.target;
    if (value) {
      return dispatch(Creators.addressSearchRequest({ body: { data: value } }));
    }
    return dispatch(Creators.addressSearchSuccess({ data: [] }));
  }, [dispatch]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col flex={5}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Row>
        <Input
          size="large"
          className="mb-2"
          placeholder={t('global:SEARCH')}
          onChange={handleOnChange}
        />
      </Row>
      <Row>
        {searchResult?.length !== 0 ? <AdressList data={searchResult} /> : null}
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.GIS.ADDRESS_SEARCH;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AddressSearch);
