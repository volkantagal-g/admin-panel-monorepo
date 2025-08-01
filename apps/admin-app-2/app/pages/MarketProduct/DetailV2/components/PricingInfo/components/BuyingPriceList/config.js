import { EditSaveCancelButtonsWithIcon } from '@shared/components/GUI/EditSaveCancelButtonsWithIcon';
import { InfoIcon, NumberInput, Select, TextInput, Checkbox } from '@shared/components/GUI';
import { priceFormatter } from '@app/pages/MarketProduct/utils';
import { NUMBER_INPUT_STEPS, PRECISON_VALUES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { getVatOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import permKey from '@shared/shared/permKey.json';

const multipleBy = 1000;
export const columns = ({
  t,
  canAccess,
  suppliers,
  editingKey,
  setEditingKey,
  handleEdit,
  handleChange,
  onSave,
  isUpdatePending,
  handleDelete,
  manufacturerName,
  errors,
  values,
  isDeletePending,
  isFresh,
}) => [
  {
    title: t('MANUFACTURER'),
    key: 'manufacturerId',
    render: () => manufacturerName ?? undefined,
  },
  {
    title: t('SUPPLIER'),
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: value => suppliers?.find(({ _id }) => _id === value)?.name,
  },
  {
    title: t('IS_PREFERRED'),
    dataIndex: 'isPreferred',
    key: 'isPreferred',
    render: isPreferred => (isPreferred ? t('YES') : t('NO')),
    editNode: (
      <Checkbox
        name="isPreferred"
        valuePropName="checked"
        errors={errors}
        onChange={event => handleChange('isPreferred', event.target.checked)}
        checked={values?.isPreferred}
      />
    ),
  },
  {
    title: t('VATS'),
    render: record => (priceFormatter((record?.wholesaleVat))),
    key: 'wholesaleVat',
    editNode: <Select
      name="wholesaleVat"
      label={t('BUYING')}
      errors={errors}
      onChange={value => handleChange('wholesaleVat', value)}
      value={values?.wholesaleVat}
      optionsData={getVatOptions()}
      getPopupContainer={() => document.body}
    />,
  },
  {
    title: isFresh ? <>{t('LIST_PRICE_PER_KG')}<InfoIcon title={t('LIST_PRICE_FRESH_INFO')} /></> : t('LIST_PRICE'),
    render: record => (isFresh ? priceFormatter(record.listPrice * multipleBy) : priceFormatter(record?.listPrice)),
    key: 'listPrice',
    editNode: <NumberInput
      errors={errors}
      value={priceFormatter(values?.listPrice)}
      name="listPrice"
      onChange={value => handleChange('listPrice', value)}
      precision={PRECISON_VALUES.TWO_DIGIT}
      step={NUMBER_INPUT_STEPS.TWO_STEP}
    />,
  },
  {
    title: `${t('NET_INVOICE_PRICE')}(${t('WITHOUT_VAT')})`,
    dataIndex: 'netInvoicePriceWithoutVat',
    key: 'netInvoicePriceWithoutVat',
    render: value => (isFresh ? priceFormatter(value * multipleBy) : priceFormatter(value)),
  },
  {
    title: `${t('NET_INVOICE_PRICE')}(${t('WITH_VAT')})`,
    render: record => (isFresh ? priceFormatter(record.netInvoicePriceWithVat * multipleBy) : priceFormatter(record?.netInvoicePriceWithVat)),
    key: 'netInvoicePriceWithVat',
    editNode: <TextInput
      errors={errors}
      value={priceFormatter(values?.netInvoicePriceWithVat)}
      disabled
      name="netInvoicePriceWithVat"
    />,
  },
  {
    title: `${t('NET_BUYING_PRICE')}(${t('WITHOUT_VAT')})`,
    dataIndex: 'netNetBuyingPriceWithoutVat',
    key: 'netNetBuyingPriceWithoutVat',
    render: value => (isFresh ? priceFormatter(value * multipleBy, 4) : priceFormatter(value, 4)),
  },
  {
    title: `${t('NET_BUYING_PRICE')}(${t('WITH_VAT')})`,
    render: record => (isFresh ? priceFormatter(record.netNetBuyingPriceWithVat * multipleBy, 4) : priceFormatter(record?.netNetBuyingPriceWithVat, 4)),
    key: 'netNetBuyingPriceWithVat',
    editNode: <TextInput
      errors={errors}
      value={priceFormatter(values?.netNetBuyingPriceWithVat, 4)}
      disabled
      name="netNetBuyingPriceWithVat"
    />,
  },
  {
    title: `${t('PRICE_REDUCTION')} (%)`,
    dataIndex: 'totalPriceReduction',
    key: 'totalPriceReduction',
    editNode: <NumberInput
      errors={errors}
      value={values?.totalPriceReduction}
      name="totalPriceReduction"
      onChange={value => handleChange('totalPriceReduction', value)}
    />,
  },
  {
    title: t('PAYMENT_DUE_DAY'),
    dataIndex: 'paymentDueDay',
    key: 'paymentDueDay',
    editNode: <NumberInput
      errors={errors}
      value={values?.paymentDueDay}
      name="paymentDueDay"
      onChange={value => handleChange('paymentDueDay', value)}
    />,
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    fixed: 'right',
    render: record => {
      return canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT) && (
        <EditSaveCancelButtonsWithIcon
          record={record}
          editingKey={editingKey}
          setEditingKey={setEditingKey}
          isEditing={handleEdit}
          onSave={onSave}
          isUpdatePending={isUpdatePending || isDeletePending}
          onDelete={handleDelete}
          editingKeyProp="supplierId"
        />
      );
    },
  },
];

export const EditableCell = ({
  editNode,
  editing,
  children,
  ...restProps
}) => (
  <td {...restProps}>
    {editing ? editNode : children}
  </td>
);
