import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Button, Col, Input, Row, Space, Typography } from 'antd';

import { PromoUsageType } from '@app/pages/Promo/constantValues';

import { usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import PersonalPromoTable from './components/PersonalPromoTable';
import CodeBulkModal from '@shared/containers/CodeBulkModal';
import { PromoStatus } from '@app/pages/Promo/types';

const { Title } = Typography;

const reduxKey = REDUX_KEY.PERSONAL_PROMO.LIST;

function PersonalPromoListPage() {
  usePageViewAnalytics({
    name: ROUTE.PERSONAL_PROMO_LIST.name,
    squad: ROUTE.PERSONAL_PROMO_LIST.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('personalPromoPage');

  const [promoCode, setPromoCode] = useState();
  const [isPersonalPromosEditModalVisible, setIsPersonalPromosEditModalVisible] = useState(false);

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (promoCode) {
      dispatch(
        Creators.getPersonalPromoRequest({
          promoCode,
          promoUsageType: PromoUsageType.PERSONAL,
        }),
      );
    }
  }, [dispatch, promoCode]);

  const handlePersonalPromoEditModal = () => setIsPersonalPromosEditModalVisible(!isPersonalPromosEditModalVisible);

  const handleDisable = id => {
    const body = {
      status: PromoStatus.Inactive,
      promoCode,
      promoUsageType: PromoUsageType.PERSONAL,
    };
    dispatch(
      Creators.disablePersonalPromoRequest({
        id,
        body,
      }),
    );
  };

  return (
    <>
      <CodeBulkModal
        isModalVisible={isPersonalPromosEditModalVisible}
        handleModal={handlePersonalPromoEditModal}
        codeType="promoCodes"
      />
      <Row>
        <Col
          xs={24}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Title level={3}>{t('PERSONAL_PROMO_LIST_PAGE_TITLE')}</Title>
          <Button
            size="small"
            onClick={handlePersonalPromoEditModal}
            style={{ margin: '5px 15px 0 0' }}
          >
            {t('EDIT_CODES')}
          </Button>
        </Col>
      </Row>
      <Space direction="vertical">
        <Row>
          <Col xs={24}>
            <Input.Search
              placeholder={t('PERSONAL_PROMO_LIST_PAGE_TITLE')}
              onSearch={value => setPromoCode(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <PersonalPromoTable
              showFooter={!promoCode}
              handleDisable={handleDisable}
            />
          </Col>
        </Row>
      </Space>
    </>
  );
}

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });

export default compose(withReducer, withSaga)(PersonalPromoListPage);
