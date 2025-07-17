import { memo } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, Image, Space } from '@shared/components/GUI';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import ProductStatus from './components/ProductStatus';
import copy from '@shared/assets/GUI/Icons/Solid/Copy.svg';
import useStyles from './styles';
import { copyToClipboard } from '@shared/utils/common';

const SummaryInfo = memo(() => {
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);

  const { t } = useTranslation('marketProductPageV2');
  const selectedLanguage = useSelector(getSelectedLanguage);
  const classes = useStyles();

  return (
    <Space>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={12}>
          <Row className="flex-nowrap">
            <Image
              src={marketProduct.picURL?.[selectedLanguage]}
              className={classes.image}
            />
            <div className="ml-3">
              <p>
                <span className={`${classes.productName} mr-2`}>
                  {marketProduct.fullName?.[selectedLanguage]}
                </span>
                <Tooltip title={t('PRODUCT_DETAILS.COPY_PRODUCT_ID')}>
                  <Button
                    color="secondary"
                    size="small"
                    className="px-2 py-1"
                    onClick={() => copyToClipboard(marketProduct._id)}
                  >
                    <img src={copy} alt="copy" />
                  </Button>
                </Tooltip>
              </p>
              <div>
                {t('PRODUCT_DETAILS.PRODUCT_STATUS.SHORT_DESCRIPTION')}:
                <span className="ml-1 text-dark">
                  {marketProduct.shortDescription?.[selectedLanguage]}
                </span>
              </div>
              <div>
                {t('PRODUCT_DETAILS.PRODUCT_STATUS.BARCODES')}:
                <span className="ml-1 text-dark">
                  {marketProduct.barcodes?.join(', ')}
                </span>
              </div>
            </div>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <ProductStatus />
        </Col>
      </Row>
    </Space>
  );
});

export default SummaryInfo;
