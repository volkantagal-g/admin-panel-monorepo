import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, PageHeader, Row, Col, Tabs } from 'antd';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import { Form } from './components';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_SPS_DOMAIN_VALUE, SpsDomainTypes } from './constants';
import { formattedRequestBody } from './utils';
import { dysConfigsSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.DYS_CONFIGS.UPDATE;

const DysConfiguration = () => {
  const { t } = useTranslation('dysConfigurationsPage');
  const dispatch = useDispatch();
  const classes = useStyles();
  usePageViewAnalytics({ name: ROUTE.DYS_CONFIGS.name, squad: ROUTE.DYS_CONFIGS.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [selectedTab, setSelectedTab] = useState(DEFAULT_SPS_DOMAIN_VALUE);

  useEffect(() => {
    dispatch(Creators.getDysConfigsRequest());
  }, [dispatch]);

  const dysConfigs = useSelector(dysConfigsSelector.getData);

  const updateDysConfigs = values => {
    const updateData = formattedRequestBody(values, dysConfigs, selectedTab);

    dispatch(Creators.updateDysConfigsRequest({ updateData }));
  };

  const { TabPane } = Tabs;

  const handleSelectedTab = key => {
    if (key !== selectedTab) {
      setSelectedTab(key);
    }
  };

  const renderTabPanes = () => {
    const countryBasedDomains = Object.keys(dysConfigs || []).map(value => {
      const tabName = SpsDomainTypes[value][getLangKey()];
      return (
        <TabPane tab={tabName} key={value}>
          <Form submitRequest={updateDysConfigs} selectedTab={selectedTab} />
        </TabPane>
      );
    });
    return (
      <Tabs defaultActiveKey={selectedTab} onChange={handleSelectedTab}>
        {countryBasedDomains}
      </Tabs>
    );
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Row>
        <Col>
          <PageHeader className="p-0 page-title" title={t('dysConfigurationsPage:DYS_CONFIGS')} />
        </Col>
      </Row>
      <Col>
        {renderTabPanes()}
      </Col>
    </Space>

  );
};

export default DysConfiguration;
