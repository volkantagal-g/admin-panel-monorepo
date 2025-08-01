/* eslint-disable testing-library/render-result-naming-convention */
import { Table, Tag } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { getLangKey } from '@shared/i18n';
import {
  DEMOGRAPHY_LABELS,
  SEGMENT_LABELS,
  SIZE_LABELS,
} from '@app/pages/MarketProductChainManagement/constants';
import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';
import ProductActionsMenu from './ProductActionsMenu';

const useStyles = createUseStyles({
  tableContainer: {
    marginTop: '16px',
    '& .ant-table': {
      backgroundColor: colors.backgroundWhite,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: `0 2px 8px ${colors.boxShadowLight}`,
    },
    '& .ant-table-thead > tr > th': {
      backgroundColor: '#fcfcfd !important',
      color: '#777',
      fontWeight: 600,
      padding: '14px 16px',
      borderBottom: '1px solid #eaeaea',
      '&::before': { display: 'none' },
      '&:first-child': { borderTopLeftRadius: '12px' },
      '&:last-child': { borderTopRightRadius: '12px' },
    },
    '& .ant-table-tbody > tr > td': {
      padding: '14px 16px',
      borderBottom: `1px solid ${colors.borderGray}`,
      fontSize: '14px',
      height: '60px',
    },
    '& .ant-table-tbody > tr': { height: '60px' },
    '& .ant-table-tbody > tr:hover > td': { backgroundColor: '#f5f7fe !important' },
    '& .ant-pagination': {
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .ant-pagination-item, & .ant-pagination-prev, & .ant-pagination-next, & .ant-pagination-jump-prev, & .ant-pagination-jump-next': {
        margin: '0 4px',
        height: '32px',
        minWidth: '32px',
        borderRadius: '4px',
        lineHeight: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& a': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        },
        '&:hover': {
          borderColor: colors.purple,
          '& a, & button': { color: colors.purple },
        },
      },
      '& .ant-pagination-item-active': {
        borderColor: '#ded9fb',
        backgroundColor: '#f3f0ff',
        '& a': {
          color: '#5a31dc',
          fontWeight: 700,
        },
        '&:hover': { borderColor: '#c3b5ff' },
      },
      '& .ant-pagination-prev, & .ant-pagination-next': {
        '& .ant-pagination-item-link': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          borderRadius: '4px',
          '&:hover': {
            borderColor: colors.purple,
            '& .anticon': { color: colors.purple },
          },
        },
      },
      '& .ant-pagination-options': {
        marginLeft: '12px',
        height: '32px',
        '& .ant-select-selector': {
          height: '32px',
          borderRadius: '4px',
          '& .ant-select-selection-item': { lineHeight: '30px' },
        },
        '& .ant-pagination-options-quick-jumper': {
          height: '32px',
          marginLeft: '12px',
          '& input': {
            height: '32px',
            borderRadius: '4px',
            '&:hover, &:focus': { borderColor: colors.purple },
          },
        },
      },
      '& .ant-pagination-jump-prev, & .ant-pagination-jump-next': {
        '& .ant-pagination-item-link-icon': { color: colors.purple },
        '& .ant-pagination-item-container': {
          '& .ant-pagination-item-ellipsis': {
            color: '#bbb',
            '&:hover': { color: colors.purple },
          },
        },
      },
      '& .ant-pagination-total-text': {
        marginRight: '12px',
        fontSize: '14px',
        color: '#666',
      },
    },
    '& .ant-table-column-sorter': {
      marginLeft: '8px',
      '& .ant-table-column-sorter-inner': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    '& .ant-table-column-sorter-up.active, & .ant-table-column-sorter-down.active': { color: colors.purple },
    '& .even-row': { backgroundColor: '#fafafa' },
  },
  numericCell: {
    textAlign: 'center',
    fontWeight: 700,
    color: '#333',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  localCell: {
    display: 'inline-block',
    color: colors.successGreen,
    fontWeight: 500,
    backgroundColor: colors.successBackground,
    padding: '6px 12px',
    borderRadius: 6,
  },
  nonLocalCell: {
    display: 'inline-block',
    color: colors.errorRed,
    fontWeight: 500,
    backgroundColor: colors.errorBackground,
    padding: '6px 12px',
    borderRadius: 6,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#777',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    letterSpacing: '0.2px',
  },
  domainTag: {
    margin: '3px',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '12px',
    border: 'none',
    display: 'inline-block',
    fontWeight: '500',
  },
  getir10Tag: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  getirMoreTag: {
    backgroundColor: '#e6e6fa',
    color: '#6347b5',
  },
  getirWaterTag: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
  },
});

const renderRichText = text => {
  if (!text) return '-';

  // Dil anahtarına göre metni getir
  if (typeof text === 'object') {
    return text[getLangKey()] || text.en || '-';
  }

  return text;
};

const renderArray = (array, labelMap) => {
  if (!Array.isArray(array) || !array.length) return '-';

  // Etiket map'i varsa değerleri map'leyelim
  if (labelMap) {
    return array
      .map(item => labelMap[item]?.[getLangKey()] || item)
      .join(', ');
  }

  return array.join(', ');
};

const ProductsTable = ({
  data,
  loading,
  pagination,
  onChange,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const renderColumnTitle = useCallback(title => {
    return <span className={classes.tableHeader}>{title}</span>;
  }, [classes]);

  const columns = useMemo(() => {
    const baseColumns = {
      name: {
        title: renderColumnTitle(t('name')),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        sortField: 'nameTR',
        render: name => renderRichText(name),
        width: 250,
      },
      domainTypes: {
        title: renderColumnTitle(t('domain')),
        dataIndex: 'domainTypes',
        key: 'domainTypes',
        sorter: true,
        sortField: 'domainType',
        render: domainTypes => {
          // Hardcoded mapping for domain types
          const domainTypeMap = {
            1: { label: 'Getir10', className: classes.getir10Tag },
            3: { label: 'GetirMore', className: classes.getirMoreTag },
            4: { label: 'GetirWater', className: classes.getirWaterTag },
          };

          // Render a single domain tag based on hardcoded mapping
          const renderDomainTag = domain => {
            // Skip null/undefined values
            if (domain === null || domain === undefined) return null;

            // Convert to string for consistency
            const domainKey = String(domain);

            // Check if we have a mapping for this domain
            if (domainTypeMap[domainKey]) {
              const { label, className } = domainTypeMap[domainKey];
              return (
                <Tag
                  key={`domain-${domainKey}`}
                  className={`${classes.domainTag} ${className}`}
                >
                  {label}
                </Tag>
              );
            }

            // Fallback for unknown domains
            return (
              <Tag
                key={`domain-${domainKey}`}
                className={`${classes.domainTag} ${classes.getir10Tag}`}
              >
                {`Domain: ${domain}`}
              </Tag>
            );
          };

          // Handle array of domain types
          if (Array.isArray(domainTypes)) {
            if (domainTypes.length === 0) return '-';
            return (
              <div>
                {domainTypes.map(domain => renderDomainTag(domain))}
              </div>
            );
          }

          // Handle single domain type
          if (domainTypes !== null && domainTypes !== undefined) {
            return renderDomainTag(domainTypes);
          }

          // No domain types
          return '-';
        },
        width: 150,
      },
      demographies: {
        title: renderColumnTitle(t('demography')),
        dataIndex: 'demographies',
        key: 'demographies',
        render: demographies => renderArray(demographies, DEMOGRAPHY_LABELS),
        width: 150,
        sorter: true,
        sortField: 'demography',
      },
      sizes: {
        title: renderColumnTitle(t('size')),
        dataIndex: 'sizes',
        key: 'sizes',
        render: sizes => renderArray(sizes, SIZE_LABELS),
        width: 150,
        sorter: true,
        sortField: 'size',
      },
      category: {
        title: renderColumnTitle(t('category')),
        dataIndex: 'category',
        key: 'category',
        render: category => renderRichText(category),
        width: 150,
        sorter: true,
        sortField: 'masterSubClassNameTR',
      },
      segment: {
        title: renderColumnTitle(t('segment')),
        dataIndex: 'segment',
        key: 'segment',
        render: segment => SEGMENT_LABELS[segment]?.[getLangKey()] || segment || '-',
        width: 150,
        sorter: true,
        sortField: 'productSegmentPlanning',
      },
      darkstoreCount: {
        title: renderColumnTitle(t('DS')),
        dataIndex: 'darkstoreCount',
        key: 'darkstoreCount',
        render: count => <span className={classes.numericCell}>{count || 0}</span>,
        width: 100,
        align: 'center',
      },
      supplierCount: {
        title: renderColumnTitle(t('Suppliers')),
        dataIndex: 'supplierCount',
        key: 'supplierCount',
        render: count => <span className={classes.numericCell}>{count || 0}</span>,
        width: 100,
        align: 'center',
      },
      chainCount: {
        title: renderColumnTitle(t('Chains')),
        dataIndex: 'chainCount',
        key: 'chainCount',
        render: count => <span className={classes.numericCell}>{count || 0}</span>,
        width: 100,
        align: 'center',
      },
      isLocal: {
        title: renderColumnTitle(t('isLocal')),
        dataIndex: 'isLocal',
        key: 'isLocal',
        render: isLocal => (isLocal ? <span className={classes.localCell}>{t('YES')}</span> : <span className={classes.nonLocalCell}>{t('NO')}</span>),
        width: 100,
        sorter: true,
        sortField: 'isLocal',
      },
      actions: {
        title: '',
        key: 'actions',
        width: 80,
        render: (_, record) => (
          <ProductActionsMenu record={record} t={t} />
        ),
      },
    };

    // Display all columns by default
    return Object.values(baseColumns);
  }, [t, classes, renderColumnTitle]);

  return (
    <div className={classes.tableContainer}>
      <Table
        rowKey="productVertexId"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
        scroll={{ x: 'max-content', y: 600 }}
        bordered={false}
        size="middle"
        rowClassName={(record, index) => (index % 2 === 0 ? '' : 'even-row')}
        className="product-table"
      />
    </div>
  );
};

export default ProductsTable;
