import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Col, Input, Row, Space, Typography } from 'antd';

import { usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import DiscountCodeTable from './components/DiscountCodeTable';
import DiscountCodeUsageModal from './components/DiscountCodeUsageModal';
import { DiscountCodesBulkEditUpdateModal } from '@app/pages/DiscountCode/BulkEdit/modal';

const { Title } = Typography;

const reduxKey = REDUX_KEY.DISCOUNT_CODE.LIST;

function DiscountCodeListPage() {
  usePageViewAnalytics({
    name: ROUTE.DISCOUNT_CODE_LIST.name,
    squad: ROUTE.DISCOUNT_CODE_LIST.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('discountCodePage');

  const [discountCode, setDiscountCode] = useState();
  const [discountCodeUsages, setDiscountCodeUsages] = useState();
  const [isDiscountUsageModalVisible, setIsDiscountUsageModalVisible] = useState(false);

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (discountCode) {
      dispatch(Creators.getDiscountCodeRequest({ discountCode }));
    }
  }, [dispatch, discountCode]);

  const handleUsedCountClick = usages => {
    setDiscountCodeUsages(usages);
    setIsDiscountUsageModalVisible(true);
  };

  const handleDiscountCodeUsageModal = () => setIsDiscountUsageModalVisible(!isDiscountUsageModalVisible);

  return (
    <>
      <DiscountCodeUsageModal
        isModalVisible={isDiscountUsageModalVisible}
        handleModal={handleDiscountCodeUsageModal}
        discountCodeUsages={discountCodeUsages}
      />
      <Row>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={3}>{t('DISCOUNT_CODE_SEARCH')}</Title>
          <Space>
            <DiscountCodesBulkEditUpdateModal />
          </Space>
        </Col>
      </Row>
      <Space direction="vertical">
        <Row>
          <Col xs={24}>
            <Input.Search
              placeholder={t('DISCOUNT_CODE_SEARCH')}
              onSearch={value => setDiscountCode(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <DiscountCodeTable
              showFooter={!discountCode}
              OnUsedCountClick={handleUsedCountClick}
            />
          </Col>
        </Row>
      </Space>
    </>
  );
}

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });

export default compose(withReducer, withSaga)(DiscountCodeListPage);
