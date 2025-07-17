import { Button, Checkbox, Tooltip } from 'antd';

import MatchIcon from '@app/pages/CommerceIntelligence/assets/icons/circleMatch.svg';
import GrayTrashIcon from '@app/pages/CommerceIntelligence/assets/icons/grayTrash.svg';
import RedCloseIcon from '@app/pages/CommerceIntelligence/assets/icons/redClose.svg';
import ProductCard from '@app/pages/CommerceIntelligence/components/ProductCard';

const renderSelectCheckbox = (classes, getChildCheckboxState, handleChildCheckboxChange) => (_, { productName, parentProductId }, index) => {
  const childProductId = `${productName}-${index}`;
  const isSelected = getChildCheckboxState(parentProductId, childProductId);

  return (
    <Checkbox
      className={classes.checkbox}
      checked={isSelected}
      onClick={e => e.stopPropagation()}
      onChange={e => handleChildCheckboxChange(parentProductId, childProductId, e.target.checked)}
    />
  );
};

const renderProductCard = (_, { productName, productSize, productImage, competitorName, competitorImage }) => (
  <ProductCard
    title={productName}
    subtitle={productSize}
    image={productImage}
    competitor={{
      name: competitorName,
      image: competitorImage,
    }}
  />
);

const renderMainProductCard = (_, { productName, productSize, productImage }) => (
  <ProductCard
    title={productName}
    subtitle={productSize}
    image={productImage}
  />
);

const renderActionButtons = (classes, t) => () => (
  <div className={classes.actionButtons}>
    <Tooltip title={t('INDIRECT_MATCH')} overlayClassName={classes.tooltip}>
      <Button
        type="text"
        icon={<img src={RedCloseIcon} alt={t('INDIRECT_MATCH')} />}
        className={`${classes.actionButton} ${classes.indirectMatchButton}`}
      />
    </Tooltip>
    <Tooltip title={t('DIRECT_MATCH')} overlayClassName={classes.tooltip}>
      <Button
        type="text"
        icon={<img src={MatchIcon} alt={t('DIRECT_MATCH')} />}
        className={`${classes.actionButton} ${classes.directMatchButton}`}
      />
    </Tooltip>
    <Tooltip title={t('DELETE_MATCH')} overlayClassName={classes.tooltip}>
      <Button
        type="text"
        icon={<img src={GrayTrashIcon} alt={t('DELETE_MATCH')} />}
        className={`${classes.actionButton} ${classes.deleteButton}`}
      />
    </Tooltip>
  </div>
);

const renderParentCheckbox = (classes, getParentCheckboxState, handleParentCheckboxChange) => (_, { productId }) => {
  const { checked, indeterminate } = getParentCheckboxState(productId);

  return (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      indeterminate={indeterminate}
      onClick={e => e.stopPropagation()}
      onChange={e => handleParentCheckboxChange(productId, e.target.checked)}
    />
  );
};

export const createChildTableColumns = (classes, t, getChildCheckboxState, handleChildCheckboxChange) => [
  {
    title: '',
    dataIndex: 'select',
    key: 'select',
    width: 50,
    render: renderSelectCheckbox(classes, getChildCheckboxState, handleChildCheckboxChange),
  },
  {
    title: t('PRODUCT'),
    dataIndex: 'productName',
    key: 'productName',
    sorter: (a, b) => a.productName.localeCompare(b.productName),
    showSorterTooltip: false,
    render: renderProductCard,
  },
  {
    title: '',
    key: 'action',
    width: 120,
    align: 'right',
    render: renderActionButtons(classes, t),
  },
];

export const createMainTableColumns = (classes, t, getMasterCheckboxState, getParentCheckboxState, handleMasterCheckboxChange, handleParentCheckboxChange) => {
  const { checked, indeterminate } = getMasterCheckboxState();
  const masterCheckbox = (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleMasterCheckboxChange}
    />
  );

  return [
    {
      title: masterCheckbox,
      dataIndex: 'select',
      key: 'select',
      width: 50,
      render: renderParentCheckbox(classes, getParentCheckboxState, handleParentCheckboxChange),
    },
    {
      title: t('PRODUCT'),
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      showSorterTooltip: false,
      render: renderMainProductCard,
    },
    {
      title: t('PRODUCT_ID'),
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: t('CATEGORY'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: t('SUB_CATEGORY'),
      dataIndex: 'subCategory',
      key: 'subCategory',
    },
    {
      title: t('BRAND'),
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: t('UNIT'),
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: t('QTY'),
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: t('MATCH'),
      dataIndex: 'match',
      key: 'match',
    },
    {
      key: 'expand',
      dataIndex: 'expand',
      title: '',
      width: 40,
    },
  ];
};
