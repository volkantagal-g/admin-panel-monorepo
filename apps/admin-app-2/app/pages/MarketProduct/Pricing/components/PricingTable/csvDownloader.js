import { Form, Radio as RadioAntd } from 'antd';

import { toast } from 'react-toastify';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Radio, Button } from '@shared/components/GUI';

import useStyles from './styles';
import {
  exampleDomainAmountGetirJson,
  exampleDomainAmountThirdPartyJson,
  exampleDomainJson,
  exampleDomainPercentGetirJson,
  exampleDomainPercentThirdPartyJson,
  exampleWarehouseAmountGetirJson,
  exampleWarehouseAmountThirdPartyJson,
  exampleWarehouseJson,
  exampleWarehousePercentGetirJson,
  exampleWarehousePercentThirdPartyJson,
  exampleWasteAmountGetirJson,
  exampleWasteAmountThirdPartyJson, exampleWastePercentGetirJson,
  exampleWastePercentThirdPartyJson, exampleBuyingPricesJson,
} from '@app/pages/MarketProduct/Pricing/components/PricingTable/config';
import { generateExcel } from '@app/pages/MarketProduct/Pricing/components/PricingTable/excel';

export function CsvDownloader({ value }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('marketProductPricingPage');
  const classes = useStyles();

  const [type, setType] = useState('');

  let normalTypeText;
  switch (value) {
    case 'import_domain_prices':
      normalTypeText = t('DOMAIN_PRICE');
      break;
    case 'import_warehouse_prices':
      normalTypeText = t('WAREHOUSE_PRICE');
      break;
    default:
      normalTypeText = t('WASTE_PRICE');
  }

  let discountedTypeText;
  switch (value) {
    case 'import_domain_prices':
      discountedTypeText = t('DISCOUNTED_DOMAIN_PRICE');
      break;
    case 'import_warehouse_prices':
      discountedTypeText = t('DISCOUNTED_WAREHOUSE_PRICE');
      break;
    default:
      discountedTypeText = t('WASTE_PRICE');
  }

  const handleJsonToCSV = () => {
    const { priceType, supportType, discountType } = form.getFieldsValue();
    if (value === 'import_domain_prices') {
      if (priceType === 'normal') {
        generateExcel(exampleDomainJson, 'domain_prices_example');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'amount') {
        generateExcel(exampleDomainAmountThirdPartyJson, 'domain_prices_amount_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'amount') {
        generateExcel(exampleDomainAmountGetirJson, 'domain_prices_amount_getir_example');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'percent') {
        generateExcel(exampleDomainPercentThirdPartyJson, 'domain_prices_percent_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'percent') {
        generateExcel(exampleDomainPercentGetirJson, 'domain_prices_percent_getir_example');
      }
    }
    if (value === 'import_warehouse_prices') {
      if (priceType === 'normal') {
        generateExcel(exampleWarehouseJson, 'warehouse_prices_example');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'amount') {
        generateExcel(exampleWarehouseAmountThirdPartyJson, 'warehouse_prices_amount_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'amount') {
        generateExcel(exampleWarehouseAmountGetirJson, 'warehouse_prices_amount_getir_example');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'percent') {
        generateExcel(exampleWarehousePercentThirdPartyJson, 'warehouse_prices_percent_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'percent') {
        generateExcel(exampleWarehousePercentGetirJson, 'warehouse_prices_percent_getir_example');
      }
    }
    if (value === 'import_waste_prices') {
      if (priceType === 'normal') {
        generateExcel([], 'waste_prices');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'amount') {
        generateExcel(exampleWasteAmountThirdPartyJson, 'waste_prices_amount_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'amount') {
        generateExcel(exampleWasteAmountGetirJson, 'waste_prices_amount_getir_example');
      }
      if (priceType === 'discounted' && supportType === 'supplier' && discountType === 'percent') {
        generateExcel(exampleWastePercentThirdPartyJson, 'waste_prices_percent_third_party_example');
      }
      if (priceType === 'discounted' && supportType === 'getir' && discountType === 'percent') {
        generateExcel(exampleWastePercentGetirJson, 'waste_prices_percent_getir_example');
      }
    }
    if (value === 'import_buying_prices') {
      generateExcel(exampleBuyingPricesJson, 'import_buying_prices_example');
    }
    toast.success(t('READY_TO_DOWNLOAD'));
  };
  const handleFinish = () => {
    if (Object.values(form.getFieldsValue())?.includes(undefined)) {
      toast.error(t('SELECTION_ERROR'));
    }
    else {
      handleJsonToCSV();
    }
  };
  return (
    <>
      {value !== 'import_buying_prices' ? (
        <Form form={form} className={classes.content}>
          <div className={classes.item}>
            <span className={classes.title}>Price Type</span>
            <Form.Item name="priceType">
              <RadioAntd.Group
                onChange={({ target: { value: typeValue } }) => setType(typeValue)}
              >
                {value !== 'import_waste_prices' && (
                  <Radio value="normal">{normalTypeText}</Radio>
                )}
                <Radio value="discounted">{discountedTypeText}</Radio>
              </RadioAntd.Group>
            </Form.Item>
          </div>
          {(type === 'discounted' || value === 'import_waste_prices') && (
            <>
              <div className={classes.item}>
                <span className={classes.title}>{t('SUPPORT_TYPE')}</span>
                <Form.Item name="supportType">
                  <RadioAntd.Group>
                    <Radio value="supplier">{t('SUPPORT_TYPE_SUPPLIER')}</Radio>
                    <Radio value="getir">{t('SUPPORT_TYPE_GETIR')}</Radio>
                  </RadioAntd.Group>
                </Form.Item>
              </div>
              <div className={classes.item}>
                <span className={classes.title}>{t('DISCOUNT_TYPE')}</span>
                <Form.Item name="discountType">
                  <RadioAntd.Group>
                    <Radio value="amount">{t('AMOUNT')}</Radio>
                    <Radio value="percent">{t('PERCENT')}</Radio>
                  </RadioAntd.Group>
                </Form.Item>
              </div>
            </>
          )}
        </Form>
      ) : null}
      <div className={classes.buttons}>
        <Button
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
