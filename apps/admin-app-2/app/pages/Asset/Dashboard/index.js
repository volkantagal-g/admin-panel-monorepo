import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { Layout, Row, Col } from 'antd';

import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  Filter, Header, DeviceTypeChart, DeviceStatusChart, AssignmentStatusChart,
  RentalChart, MDMChart, BrandsChart, AssetOwnersChart,
} from './components';
import AntCard from '@shared/components/UI/AntCard';
import { ASSET_COUNTRY_OPTIONS } from '../constants';

const reduxKey = REDUX_KEY.ASSET.DASHBOARD;

const AssetDashboardPage = () => {
  const { t } = useTranslation(['assetPage', 'global']);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ country: ASSET_COUNTRY_OPTIONS(t).map(({ value }) => value) });

  usePageViewAnalytics({ name: ROUTE.IT_ASSET_DASHBOARD.name, squad: ROUTE.IT_ASSET_DASHBOARD.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const handleFiltersChange = currentFilters => {
    setFilters(currentFilters);
  };
  return (
    <Layout>
      <Header filters={filters} />
      <AntCard bordered={false}>
        <Filter filters={filters} onFiltersChange={handleFiltersChange} />
      </AntCard>
      <AntCard bordered={false}>
        <Row gutter={[8, 8]}>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <DeviceTypeChart filters={filters} />
            </AntCard>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <DeviceStatusChart filters={filters} />
            </AntCard>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <AssignmentStatusChart filters={filters} />
            </AntCard>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <RentalChart filters={filters} />
            </AntCard>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <MDMChart filters={filters} />
            </AntCard>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <BrandsChart filters={filters} />
            </AntCard>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <AntCard>
              <AssetOwnersChart filters={filters} />
            </AntCard>
          </Col>
        </Row>
      </AntCard>
    </Layout>
  );
};

export default AssetDashboardPage;
