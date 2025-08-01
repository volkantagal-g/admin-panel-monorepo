import {
  parentProductWholesaleBonusesWithOthers,
  parentProductWholesaleBonusTypes,
  WHOLESALE_BONUSES_COMING_FROM_SAP,
} from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { MARKET_PRODUCT_WHOLESALE_BONUS_TYPE } from '@shared/shared/constants';
import { NumberInput, Select } from '@shared/components/GUI';
import { getBonusTypeOptions } from './helper';
import { EditSaveCancelButtonsWithIcon } from '@shared/components/GUI/EditSaveCancelButtonsWithIcon';
import { freshProductsConstant } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/formHelper';
import permKey from '@shared/shared/permKey.json';

export const columns = ({
  t,
  canAccess,
  suppliers,
  editingKey,
  setEditingKey,
  handleEdit,
  handleDelete,
  isUpdatePending,
  handleChange,
  onSave,
  errors,
  values,
  isFresh,
}) => [
  {
    title: t('SUPPLIER'),
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: supplierId => suppliers?.find(({ _id }) => _id === supplierId)?.name,
  },
  {
    title: t('BONUS_TYPE'),
    dataIndex: 'bonus',
    key: 'bonus',
    render: bonus => parentProductWholesaleBonusesWithOthers?.[bonus]?.[getLangKey()],
  },
  {
    title: t('AMOUNT_TYPE'),
    dataIndex: 'bonusType',
    key: 'bonusType',
    render: bonusType => parentProductWholesaleBonusTypes?.[bonusType]?.[getLangKey()],
    editNode: <Select
      value={values?.bonusType}
      errors={errors}
      optionsData={getBonusTypeOptions()}
      name="bonusType"
      onChange={value => handleChange('bonusType', value)}
      label={t('AMOUNT_TYPE')}
    />,
  },
  {
    title: t('VALUE'),
    key: 'value',
    render: ({ bonusAsAmount, bonusAsPercent, bonusType }) => {
      const bonusAsAmountValue = isFresh ? bonusAsAmount * freshProductsConstant : bonusAsAmount;
      return (bonusType === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT ?
        bonusAsPercent && `${bonusAsPercent}%` : bonusAsAmountValue);
    },
    editNode: <NumberInput
      value={values?.value}
      errors={errors}
      name="value"
      onChange={value => handleChange('value', value)}
    />,
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    fixed: 'right',
    render: record => canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT) &&
    (record?.bonus !== WHOLESALE_BONUSES_COMING_FROM_SAP.OTHER && record?.bonus !== WHOLESALE_BONUSES_COMING_FROM_SAP.OTHER_TWENTY) && (
    <EditSaveCancelButtonsWithIcon
      record={record}
      editingKey={editingKey}
      setEditingKey={setEditingKey}
      isEditing={handleEdit}
      onDelete={handleDelete}
      onSave={onSave}
      isUpdatePending={isUpdatePending}
    />
    ),
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
