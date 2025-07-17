import { Form, Checkbox, Row, Col, Popover } from 'antd';

import { InfoCircleFilled } from '@ant-design/icons';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components/GUI';

import useStyles from './styles';

import {
  IMPORT_EXPORT_KEYS,
  exampleDomainLimit,
  exampleNutritionalInfo,
  exampleProductDetails,
  exampleCategoryPositions,
  exampleSupplyAndLogistic,
  examplePricingMetadata,
  exampleProductToggles,
} from './constants';

import { generateExcel } from './excel';

export function CsvDownloader({ value }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();

  let normalTypeText;

  switch (value) {
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL:
      normalTypeText = t(
        IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL,
      );
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL:
      normalTypeText = t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL);
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL:
      normalTypeText = t(
        IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL,
      );
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL:
      normalTypeText = t(
        IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL,
      );
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL:
      normalTypeText = t(
        IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL,
      );
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL:
      normalTypeText = t(
        IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL,
      );
      break;
    case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL:
      normalTypeText = t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL);
      break;
    default:
      break;
  }

  const handleJsonToCSV = () => {
    const formValues = form.getFieldsValue();

    if (value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL) {
      generateExcel([exampleDomainLimit], 'example_domain_limit');
    }
    if (value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL) {
      generateExcel([exampleNutritionalInfo], 'example_nutritional_info');
    }
    if (
      value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL
    ) {
      generateExcel([exampleProductDetails], 'example_product_details');
    }
    if (
      value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL
    ) {
      generateExcel([exampleCategoryPositions], 'example_category_positions');
    }
    if (value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL) {
      const jsonExampleSupplyAndLogistic = () => {
        let json = { productId: exampleSupplyAndLogistic.productId };
        formValues?.importConfig?.forEach(block => {
          json = { ...json, ...exampleSupplyAndLogistic[block] };
        });
        return [json];
      };
      generateExcel(
        jsonExampleSupplyAndLogistic(),
        'example_supply_and_logistic',
      );
    }
    if (value === IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL) {
      const jsonExamplePricingMetadata = () => {
        let json = { productId: examplePricingMetadata.productId };
        formValues?.importConfig?.forEach(block => {
          json = { ...json, ...examplePricingMetadata[block] };
        });
        return [json];
      };
      generateExcel(
        jsonExamplePricingMetadata(),
        'example_pricing_metadata',
      );
    }
    if (value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL) {
      generateExcel([exampleProductToggles], 'example_product_toggles');
    }
    toast.success(t('READY_TO_DOWNLOAD'));
  };

  const handleFinish = () => {
    handleJsonToCSV();
  };

  return (
    <>
      <span className={classes.title} data-testid="CsvDownloader">{normalTypeText}</span>
      <Popover placement="right" content={t('DOWNLOAD_INFO_MESSAGE')} trigger="hover">
        <InfoCircleFilled className={classes.infoIcon} />
      </Popover>
      {value === IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL ? (
        <Form form={form} className={classes.content}>
          <div className={classes.item}>
            <Form.Item name="importConfig" label={t('IMPORT_CONFIG')}>
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value="brandImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('BRAND_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="packagingInfoImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('PACKAGING_INFO_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="transferInfoImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('TRANSFER_INFO_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="generalInfoImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('GENERAL_INFO_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="masterCategoryV2Import"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('MASTER_CATEGORY_V2_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="expiryDateInfoImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('EXPIRY_DATE_INFO_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="demandAndStorageInfoImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('DEMAND_AND_STORAGE_INFO_IMPORT')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="segmentsImport"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('SEGMENTS_IMPORT')}
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </Form>
      ) : null}
      {value === IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL ? (
        <Form form={form} className={classes.content}>
          <div className={classes.item}>
            <Form.Item name="importConfig" label={t('IMPORT_CONFIG')}>
              <Checkbox.Group>
                <Row>
                  <Col span={12}>
                    <Checkbox
                      value="manufacturer"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('MANUFACTURER')}
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="depositAndEcoContribution"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('DEPOSIT_AND_ECO_CONTRIBUTION')}
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="unitPriceInfo"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('UNIT_PRICE_INFO.TITLE')}
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="sellingPriceVAT"
                      style={{ lineHeight: '32px' }}
                    >
                      {t('SELLING_PRICE_VAT')}
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </Form>
      ) : null}
      <div className={classes.buttons}>
        <Button
          data-testid="download-button"
          size="small"
          color="primary"
          type="link"
          className={classes.button}
          onClick={handleFinish}
        >
          {t('DOWNLOAD')}
        </Button>
      </div>
    </>
  );
}
