import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import LinkOutlined from '@ant-design/icons/lib/icons/LinkOutlined';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

type ExistingProductGroupErrorProps = {
  productGroupId: string
};

export default function ExistingProductGroupError({ productGroupId }: ExistingProductGroupErrorProps) {
  const { t } = useTranslation('marketProductGroupPage');

  return (
    <>
      <Title level={5} style={{ color: 'white' }}>{t('EXISTING_PRODUCT_GROUP')}</Title>
      <p>
        <Link
          style={{ color: 'white' }}
          to={`/marketProduct/group/detail/${productGroupId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('CLICK_TO_OPEN')} {productGroupId} <LinkOutlined />
        </Link>
      </p>
    </>
  );
}
