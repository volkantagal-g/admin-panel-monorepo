import { Modal, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';

const CategoryChangeModal = props => {
  const {
    visible,
    onCancel,
    draggableProductDetails,
  } = props;
  const { t } = useTranslation('marketProductPage');
  const theme = useTheme();

  const handleCancel = () => {
    onCancel();
  };

  const productName = draggableProductDetails?.productName;

  return (
    <Modal
      centered
      visible={visible}
      closable={false}
      footer={(
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <Button key="back" onClick={handleCancel}>
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button
              key="link"
              href={`${draggableProductDetails?.productLink}?scrollTo=${PRODUCT_DETAIL_COMPONENT_ID.POSITION_INFO}&tooltip=true`}
              target="_blank"
              onClick={handleCancel}
            >
              {t('button:CONFIRM')}
            </Button>
          </Col>
        </Row>
      )}
    >
      <div>{t(
        'PRODUCT_SORT.CATEGORY_CHANGE',
        { productName },
      )}
      </div>
    </Modal>
  );
};

export default CategoryChangeModal;
