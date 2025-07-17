import { Typography, Row, Col } from 'antd';

import { t } from '@shared/i18n';
import Image from '@shared/components/UI/Image';

const traPrefix = 'localsReturnsPage:MODAL';
const { Text } = Typography;

export const generateColumns = ({
  isShopReturnReasonVisible,
  classNames: {
    nameWrapper,
    productImg,
    productName,
    productPrice,
    productQuantity,
    returnPrice,
    returnText,
  },
}) => {
  const rules = [
    {
      title: t(`${traPrefix}:PRODUCT`),
      dataIndex: 'name',
      key: 'name',
      width: 320,
      render: (name, product) => (
        <Row wrap={false}>
          <Col flex="64px" className={productImg}>
            <Image src={product?.imageUrl} width={64} height={64} />
          </Col>
          <Col className={nameWrapper}>
            <Text className={productName}>{name}</Text>
            <span className={productPrice}>{product?.priceText}</span>
          </Col>
        </Row>
      ),
    },
    {
      title: t(`${traPrefix}:QUANTITY`),
      width: 60,
      render: () => <div className={productQuantity}>1</div>,
    },
    {
      title: t(`${traPrefix}:CUSTOMER_RETURN_REASON`),
      dataIndex: 'returnReasonDescription',
      key: 'returnReasonDescription',
      render: rejectReasonDescription => (
        <Text className={returnText}>{rejectReasonDescription}</Text>
      ),
    },
    ...(isShopReturnReasonVisible ? [{
      title: t(`${traPrefix}:SHOP_RETURN_REASON`),
      dataIndex: 'rejectReasonDescription',
      key: 'rejectReasonDescription',
      render: returnReasonDescription => (
        <Text className={returnText}>{returnReasonDescription}</Text>
      ),
    }] : []),
    {
      title: t(`${traPrefix}:RETURN_AMOUNT`),
      dataIndex: 'priceText',
      key: 'priceText',
      width: 100,
      render: priceText => <Text className={returnPrice}>{priceText}</Text>,
    },
  ];

  return rules;
};
