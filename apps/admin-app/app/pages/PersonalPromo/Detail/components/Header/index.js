import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';

const { PageHeader, Button } = require('antd');
const { useTranslation } = require('react-i18next');

const Header = () => {
  const { t } = useTranslation('personalPromoPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const orderId = get(orderDetail, '_id', false);
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE')}
      extra={
        orderId && (
          <Link
            to={`/foodOrder/detail/${orderId}`}
          >
            <Button>
              {t('GO_BACK_TO_ORDER')}
              <RightOutlined />
            </Button>
          </Link>
        )
      }
    />
  );
};

export default Header;
