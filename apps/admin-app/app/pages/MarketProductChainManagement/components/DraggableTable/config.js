import { CheckCircleFilled } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';

import checkIcon from '@app/pages/MarketProductChainManagement/assets/Icons/check.svg';
import {
  DarkStoreActions, PlatformActions,
  ProductActions,
} from '@app/pages/MarketProductChainManagement/components/DraggableTable/menu';
import { renderDomainTags } from '@app/pages/MarketProductChainManagement/components/DraggableTable/utils';

import {
  BOOLEAN_LABELS,
  DARKSTORE_TABS,
  DEMOGRAPHY_LABELS,
  PAGE_TYPES,
  PRODUCT_TABS,
  SEGMENT_LABELS,
  SIZE_LABELS,
  TABLE_COLUMN_TYPES,
  WAREHOUSE_TABS,
  WAREHOUSE_TYPE_LABELS,
  getirMarketDomainTypes,
} from '@app/pages/MarketProductChainManagement/constants';

const createBaseColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  width: 150,
  sorter: true,
});

const createTextColumn = (title, dataIndex) => ({ ...createBaseColumn(title, dataIndex) });

const createNumericColumn = (title, dataIndex) => ({
  ...createBaseColumn(title, dataIndex),
  align: 'right',
  render: value => {
    if (dataIndex === 'netBuyingPrice') {
      if (value === null || value === undefined || value === 0) {
        return '';
      }
      return `₺ ${value}`;
    }

    if (dataIndex === 'bonuses' && value !== undefined && value !== null) {
      return `% ${value}`;
    }

    return value;
  },
});

const createDomainColumn = title => ({
  ...createBaseColumn(title, 'domain'),
  width: 150,
  render: value => {
    if (!value) return null;

    let domains = [];
    if (Array.isArray(value)) {
      domains = value;
    }
    else if (typeof value === 'string') {
      domains = value.split(',').map(d => d.trim());
    }

    return renderDomainTags(domains);
  },
  sorter: (a, b) => {
    if (!a.domain || !b.domain) return 0;

    let aDomain = '';
    if (Array.isArray(a.domain)) {
      aDomain = a.domain[0] || '';
    }
    else if (typeof a.domain === 'string') {
      aDomain = a.domain.split(',')[0]?.trim() || '';
    }

    let bDomain = '';
    if (Array.isArray(b.domain)) {
      bDomain = b.domain[0] || '';
    }
    else if (typeof b.domain === 'string') {
      bDomain = b.domain.split(',')[0]?.trim() || '';
    }

    return aDomain.localeCompare(bDomain);
  },
});

const createActionColumn = (renderAction, classes) => ({
  ...createBaseColumn('', 'actions'),
  render: (_, record) => (
    <span className={classes.actionsColumn}>
      {renderAction({ record, classes })}
    </span>
  ),
});

const createLabelColumn = (title, dataIndex, labels) => ({
  ...createBaseColumn(title, dataIndex),
  render: value => labels[value]?.tr || value,
});

const createBooleanColumn = (title, dataIndex, classes) => ({
  ...createBaseColumn(title, dataIndex),
  render: value => {
    if (dataIndex === 'preferred') {
      return value ? (
        <div className={classes?.tickContainer}>
          <CheckCircleFilled className={classes?.tickIcon} style={{ color: '#52c41a' }} />
        </div>
      ) : (
        <div className={classes?.tickContainer}>
          <span className={classes?.tickCell}>-</span>
        </div>
      );
    }
    return value ? <img src={checkIcon} alt="check" /> : '';
  },
});

const createBooleanLocalColumn = (title, dataIndex, classes) => ({
  ...createBaseColumn(title, dataIndex),
  render: value => {
    const isTrue = value === true || value === 'true';
    return (
      <div className={classes?.rightAligned}>
        <span className={isTrue ? classes?.trueLabel : classes?.falseLabel}>
          {isTrue ? BOOLEAN_LABELS.true[getLangKey()] : BOOLEAN_LABELS.false[getLangKey()]}
        </span>
      </div>
    );
  },
});

const createCommonColumns = (t, classes) => {
  const columns = {
    name: createTextColumn(t('COLUMNS.NAME'), 'name'),
    domain: createDomainColumn(t('COLUMNS.DOMAIN'), getirMarketDomainTypes),
    city: createTextColumn(t('COLUMNS.CITY'), 'city'),
    region: createTextColumn(t('COLUMNS.REGION'), 'region'),
    type: createLabelColumn(t('COLUMNS.TYPE'), 'type', WAREHOUSE_TYPE_LABELS),
    demography: createLabelColumn(t('COLUMNS.DEMOGRAPHY'), 'demography', DEMOGRAPHY_LABELS),
    size: createLabelColumn(t('COLUMNS.SIZE'), 'size', SIZE_LABELS),
    products: createNumericColumn(t('COLUMNS.PRODUCTS'), 'products'),
    suppliers: createNumericColumn(t('COLUMNS.SUPPLIERS'), 'suppliers'),
    warehouses: createNumericColumn(t('COLUMNS.WAREHOUSES'), 'warehouses'),
    darkStores: createNumericColumn(t('COLUMNS.DARK_STORES'), 'darkStores'),
    centralWarehouses: createNumericColumn(t('COLUMNS.CWS'), 'centralWarehouses'),
    cws: createNumericColumn(t('COLUMNS.CWS'), 'cws'),
    category: createTextColumn(t('COLUMNS.CATEGORY'), 'category'),
    segment: createLabelColumn(t('COLUMNS.SEGMENT'), 'segment', SEGMENT_LABELS),
    ds: createTextColumn(t('COLUMNS.DS'), 'ds'),
    chains: createNumericColumn(t('COLUMNS.CHAINS'), 'chains'),
    netBuyingPrice: createNumericColumn(t('COLUMNS.NET_BUYING_PRICE'), 'netBuyingPrice'),
    bonuses: createNumericColumn(t('COLUMNS.BONUSES'), 'bonuses'),
    preferred: createBooleanColumn(t('COLUMNS.PREFERRED'), 'preferred', classes),
    local: createBooleanLocalColumn(t('COLUMNS.LOCAL'), 'local', classes),
    domainTypes: {
      title: t('COLUMNS.DOMAIN'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      width: 150,
      render: domainTypes => domainTypes?.join(', ') || '-',
    },
    demographies: {
      title: t('COLUMNS.DEMOGRAPHY'),
      dataIndex: 'demographies',
      key: 'demographies',
      width: 150,
      render: demographies => demographies?.join(', ') || '-',
    },
    sizes: {
      title: t('COLUMNS.SIZE'),
      dataIndex: 'sizes',
      key: 'sizes',
      width: 150,
      render: sizes => sizes?.join(', ') || '-',
    },
  };

  return columns;
};

const createProductListColumns = t => ({
  name: {
    ...createBaseColumn(t('COLUMNS.NAME'), 'name'),
    render: name => name?.[getLangKey()] || name?.en || '',
    sorter: true,
  },
  domainTypes: {
    ...createBaseColumn(t('COLUMNS.DOMAIN'), 'domainTypes'),
    render: domainTypes => renderDomainTags(domainTypes || []),
    sorter: true,
  },
  demographies: {
    ...createBaseColumn(t('COLUMNS.DEMOGRAPHY'), 'demographies'),
    render: demographies => demographies?.map(d => DEMOGRAPHY_LABELS[d]?.[getLangKey()] || d).join(', '),
    sorter: (a, b) => {
      const aDemography = a.demographies?.[0] || '';
      const bDemography = b.demographies?.[0] || '';
      return String(aDemography).localeCompare(String(bDemography));
    },
  },
  sizes: {
    ...createBaseColumn(t('COLUMNS.SIZE'), 'sizes'),
    render: sizes => sizes?.map(s => SIZE_LABELS[s]?.[getLangKey()] || s).join(', '),
    sorter: (a, b) => {
      const aSize = a.sizes?.[0] || '';
      const bSize = b.sizes?.[0] || '';
      return String(aSize).localeCompare(String(bSize));
    },
  },
  category: {
    ...createBaseColumn(t('COLUMNS.CATEGORY'), 'category'),
    render: category => category?.[getLangKey()] || category?.en || '',
    sorter: (a, b) => {
      const aCategory = a.category?.[getLangKey()] || a.category?.en || '';
      const bCategory = b.category?.[getLangKey()] || b.category?.en || '';
      return aCategory.localeCompare(bCategory);
    },
  },
  segment: {
    ...createBaseColumn(t('COLUMNS.SEGMENT'), 'segment'),
    render: segment => (segment === 0 ? '' : SEGMENT_LABELS[segment]?.[getLangKey()] || segment),
    sorter: (a, b) => {
      const aSegment = SEGMENT_LABELS[a.segment]?.[getLangKey()] || a.segment || '';
      const bSegment = SEGMENT_LABELS[b.segment]?.[getLangKey()] || b.segment || '';
      return aSegment.localeCompare(bSegment);
    },
  },
  darkstoreCount: createNumericColumn(t('COLUMNS.DARK_STORES'), 'darkstoreCount'),
  supplierCount: createNumericColumn(t('COLUMNS.SUPPLIERS'), 'supplierCount'),
  chainCount: createNumericColumn(t('COLUMNS.CHAINS'), 'chainCount'),
});

const tabColumnSelectors = {
  [TABLE_COLUMN_TYPES.WAREHOUSE_PRODUCTS]: columns => [
    columns.name,
    columns.domain,
    columns.demography,
    columns.size,
    columns.category,
    columns.segment,
  ],

  [TABLE_COLUMN_TYPES.WAREHOUSE_CENTRAL]: columns => [
    columns.name,
    columns.domain,
    columns.type,
    columns.city,
    columns.region,
    columns.darkStores,
    columns.products,
    columns.suppliers,
  ],

  [TABLE_COLUMN_TYPES.WAREHOUSE_DARK_STORE]: (columns, t, classes) => [
    columns.name,
    columns.domain,
    columns.type,
    columns.city,
    columns.region,
    columns.demography,
    columns.size,
    columns.products,
    columns.centralWarehouses,
    columns.suppliers,
    createActionColumn(props => <DarkStoreActions t={t} {...props} />, classes),
  ],

  [TABLE_COLUMN_TYPES.WAREHOUSE_SUPPLIERS]: columns => [
    columns.name,
    columns.type,
    columns.category,
    columns.products,
    columns.darkStores,
  ],

  [TABLE_COLUMN_TYPES.WAREHOUSE_PLATFORM]: (columns, t, classes, onDeletePlatform) => [
    columns.name,
    columns.warehouses,
    columns.suppliers,
    columns.products,
    createActionColumn(props => <PlatformActions t={t} onDeletePlatform={onDeletePlatform} {...props} />, classes),
  ],
  [TABLE_COLUMN_TYPES.DARK_STORE_PRODUCTS]: columns => [
    columns.name,
    columns.domain,
    columns.demography,
    columns.size,
    columns.category,
    columns.segment,
    columns.local,
  ],

  [TABLE_COLUMN_TYPES.DARK_STORE_CENTRAL_WAREHOUSE]: columns => [
    columns.name,
    columns.domain,
    columns.city,
    columns.region,
    columns.category,
    columns.products,
    columns.suppliers,
    columns.type,
    columns.demography,
    columns.size,
    columns.warehouses,
    columns.darkStores,
    columns.cws,
    columns.segment,
    columns.ds,
    columns.chains,
  ],
  [TABLE_COLUMN_TYPES.DARK_STORE_SUPPLIERS]: columns => [
    columns.name,
    columns.type,
    columns.category,
    columns.products,
    columns.cws,
  ],
  [TABLE_COLUMN_TYPES.PRODUCT_CENTRAL_WAREHOUSE]: (columns, t, classes, _, isDetailPage) => [
    columns.name,
    columns.domain,
    columns.city,
    columns.region,
    ...(isDetailPage ? [] : [createActionColumn(props => <ProductActions t={t} {...props} />, classes)]),
  ],

  [TABLE_COLUMN_TYPES.PRODUCT_SUPPLIERS]: columns => [
    columns.name,
    columns.type,
    columns.netBuyingPrice,
    columns.bonuses,
    columns.preferred,
  ],

  [TABLE_COLUMN_TYPES.PRODUCT_DARK_STORE]: columns => [
    columns.name,
    columns.domain,
    columns.type,
    columns.city,
    columns.region,
    columns.demography,
    columns.size,
    columns.products,
    columns.cws,
    columns.suppliers,
  ],
};

export const defaultVisibleColumns = {
  [PRODUCT_TABS.PRODUCTS]: [
    'name',
    'domainTypes',
    'demographies',
    'sizes',
    'category',
    'segment',
    'darkstoreCount',
    'supplierCount',
    'chainCount',
    'actions',
  ],
  default: [
    'name',
    'domainTypes',
    'demographies',
    'sizes',
    'category',
    'segment',
    'darkstoreCount',
    'supplierCount',
    'chainCount',
    'actions',
  ],
  [WAREHOUSE_TABS.PRODUCTS]: [
    'name',
    'domain',
    'demography',
    'size',
    'category',
    'segment',
  ],
  [WAREHOUSE_TABS.CENTRAL_WAREHOUSE]: [
    'name',
    'domain',
    'type',
    'city',
    'region',
    'darkStores',
    'products',
    'suppliers',
  ],
  [WAREHOUSE_TABS.DARK_STORE]: [
    'name',
    'domain',
    'city',
    'region',
    'demography',
    'size',
    'type',
    'products',
    'suppliers',
    'actions',
  ],
  [WAREHOUSE_TABS.SUPPLIERS]: [
    'name',
    'type',
    'category',
    'products',
    'darkStores',
  ],
  [PRODUCT_TABS.CENTRAL_WAREHOUSE]: [
    'name',
    'domain',
    'city',
    'region',
  ],
  [PRODUCT_TABS.SUPPLIERS]: [
    'name',
    'type',
    'netBuyingPrice',
    'bonuses',
    'preferred',
  ],
  [DARKSTORE_TABS.PRODUCTS]: [
    'name',
    'domain',
    'demography',
    'size',
    'category',
    'segment',
    'local',
  ],
  [DARKSTORE_TABS.CENTRAL_WAREHOUSE]: [
    'name',
    'domain',
    'city',
    'region',
    'products',
    'suppliers',
  ],
  [DARKSTORE_TABS.SUPPLIERS]: [
    'name',
    'type',
    'category',
    'products',
    'cws',
  ],
  [PRODUCT_TABS.DARK_STORE]: [
    'name',
    'domain',
    'type',
    'city',
    'region',
    'demography',
    'size',
    'products',
    'cws',
    'suppliers',
  ],
};

export const getTableColumns = (t, classes, activeTab, onDeletePlatform, isDetailPage, pageType) => {
  const commonColumns = createCommonColumns(t, classes);
  const productListColumns = createProductListColumns(t);

  if (!isDetailPage && pageType === PAGE_TYPES.PRODUCT) {
    const columns = {
      name: productListColumns.name,
      domainTypes: productListColumns.domainTypes,
      demographies: productListColumns.demographies,
      sizes: productListColumns.sizes,
      category: productListColumns.category,
      segment: productListColumns.segment,
      darkstoreCount: productListColumns.darkstoreCount,
      supplierCount: productListColumns.supplierCount,
      chainCount: productListColumns.chainCount,
      actions: createActionColumn(props => <ProductActions t={t} {...props} />, classes),
    };

    return Object.values(columns).filter(Boolean);
  }

  const columnType = (() => {
    if (pageType === PAGE_TYPES.DARK_STORE) {
      switch (activeTab) {
        case DARKSTORE_TABS.PRODUCTS:
          return TABLE_COLUMN_TYPES.DARK_STORE_PRODUCTS;
        case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
          return TABLE_COLUMN_TYPES.DARK_STORE_CENTRAL_WAREHOUSE;
        case DARKSTORE_TABS.SUPPLIERS:
          return TABLE_COLUMN_TYPES.DARK_STORE_SUPPLIERS;
        default:
          return null;
      }
    }

    if (activeTab === 4) {
      if (pageType === PAGE_TYPES.PRODUCT) {
        return TABLE_COLUMN_TYPES.PRODUCT_SUPPLIERS;
      }
      return TABLE_COLUMN_TYPES.WAREHOUSE_PLATFORM;
    }

    switch (activeTab) {
      case WAREHOUSE_TABS.PRODUCTS:
        return TABLE_COLUMN_TYPES.WAREHOUSE_PRODUCTS;
      case WAREHOUSE_TABS.CENTRAL_WAREHOUSE:
        return TABLE_COLUMN_TYPES.WAREHOUSE_CENTRAL;
      case WAREHOUSE_TABS.DARK_STORE:
        return TABLE_COLUMN_TYPES.WAREHOUSE_DARK_STORE;
      case WAREHOUSE_TABS.SUPPLIERS:
        return TABLE_COLUMN_TYPES.WAREHOUSE_SUPPLIERS;
      case WAREHOUSE_TABS.PLATFORM:
        return TABLE_COLUMN_TYPES.WAREHOUSE_PLATFORM;
      case PRODUCT_TABS.CENTRAL_WAREHOUSE:
        return TABLE_COLUMN_TYPES.PRODUCT_CENTRAL_WAREHOUSE;
      case PRODUCT_TABS.SUPPLIERS:
        return TABLE_COLUMN_TYPES.PRODUCT_SUPPLIERS;
      case PRODUCT_TABS.DARK_STORE:
        return TABLE_COLUMN_TYPES.PRODUCT_DARK_STORE;
      default:
        return null;
    }
  })();

  const selector = tabColumnSelectors[columnType];
  const selectedColumns = selector ? selector(commonColumns, t, classes, onDeletePlatform, isDetailPage) : [];

  return selectedColumns;
};
