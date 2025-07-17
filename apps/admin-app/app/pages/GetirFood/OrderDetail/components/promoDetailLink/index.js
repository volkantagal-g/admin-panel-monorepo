import { Button, Col, Row } from 'antd';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { get } from 'lodash';

import { useTranslation } from 'react-i18next';

import { RightOutlined } from '@ant-design/icons';

import { useTheme } from 'react-jss';

import AntCard from '@shared/components/UI/AntCard';
import { orderDetailSelector } from '../../redux/selectors';

const PromoDetailLink = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const personalPromoId = get(orderDetail, 'personalPromoId', false);
  const theme = useTheme();
  const { t } = useTranslation('foodOrderPage');
  if (!personalPromoId) {
    return null;
  }

  return (
    <Row gutter={[theme.spacing(2)]}>
      <Col xs={24}>
        <AntCard
          title={t('PROMO_DETAIL_LINK.TITLE')}
          extra={(
            <Link
              to={{
                pathname: `/personalPromo/detail/${personalPromoId}`,
                search: `?foodOrderId=${orderDetail._id}`,
              }}
            >
              <Button type="text" ghost>
                {t('PROMO_DETAIL_LINK.DESCRIPTION')}
                <RightOutlined />
              </Button>
            </Link>
          )}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        />
      </Col>
    </Row>
  );
};

export default PromoDetailLink;
