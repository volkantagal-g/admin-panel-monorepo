import { message, Modal, Spin, Table, Tooltip } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateMatchDarkStore } from '@shared/api/marketProductChainManagement';
import { Button } from '@shared/components/GUI';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';

import { MATCH_FILTER_IDS } from '@app/pages/MarketProductChainManagement/constants';
import { DATASET_OPTIONS } from '../constants';
import { Creators } from '../redux/actions';
import useStyles from './styles';

const SaveChangesModal = ({ isOpen, onClose, onSaveSuccess, changes, setFieldValue, values, filterValues, expandedDarkStoreDetails }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    centralWarehouses,
    darkstoreMatchData,
  } = useSelector(state => ({
    centralWarehouses: state?.PAGE_MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS?.centralWarehouses || [],
    darkstoreMatchData: state?.PAGE_MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS?.darkstoreMatchData,
  }));

  const getCentralWarehouseValue = useCallback(centralWarehouse => {
    if (!centralWarehouse) return null;
    return centralWarehouse.value || centralWarehouse;
  }, []);

  const getCentralWarehouseLabel = useCallback(record => {
    const cw = centralWarehouses.find(item => item.value === record.centralWarehouse?.value || item.value === record.centralWarehouse);
    return cw?.label || record.centralWarehouse?.value || record.centralWarehouse || '';
  }, [centralWarehouses]);

  const processChanges = useCallback(changesList => {
    const groups = {};
    const productLevelCWMap = new Map();
    const categoryLevelCWMap = new Map();

    const createOrUpdateGroup = (darkstoreId, updater) => {
      const baseGroup = {
        darkstore: null,
        masterCategoryCWMatches: [],
        productCWMatches: [],
        darkstoreCWVertexId: null,
      };
      const updatedGroup = { ...baseGroup, ...groups[darkstoreId] };
      const result = updater(updatedGroup);
      groups[darkstoreId] = result || updatedGroup;
    };

    const extractCWValue = change => getCentralWarehouseValue(change.centralWarehouse);

    changesList.forEach(change => {
      const { darkStoreDetails, darkstoreIsDelete, centralWarehouse, isCategory, productDetails } = change;
      const darkstoreId = darkStoreDetails?.id;
      if (!darkstoreId) return;

      const cwValue = extractCWValue(change);
      const productId = productDetails?.id;

      createOrUpdateGroup(darkstoreId, group => {
        const updatedGroup = { ...group, darkstore: darkStoreDetails };

        const pushIfValid = (list, entry) => {
          if (entry && Object.values(entry).some(Boolean)) list.push(entry);
        };

        if (darkstoreIsDelete && !productDetails && !change.categoryName) {
          return {
            ...updatedGroup,
            darkstoreIsDelete: true,
            masterCategoryCWMatches: [],
            productCWMatches: [],
          };
        }

        if (centralWarehouse && !productDetails && !change.categoryName && !isCategory) {
          return {
            ...updatedGroup,
            darkstoreCWVertexId: cwValue,
            masterCategoryCWMatches: [],
          };
        }

        if (isCategory && productId) {
          categoryLevelCWMap.set(`${darkstoreId}_${productId}`, cwValue);
          const match = {
            masterCategoryVertexId: productId,
            masterCategoryIsDelete: change.masterCategoryIsDelete === true,
          };
          if (!match.masterCategoryIsDelete && cwValue) {
            match.masterCategoryCWVertexId = cwValue;
          }
          pushIfValid(updatedGroup.masterCategoryCWMatches, match);
          return updatedGroup;
        }

        if (productId) {
          if (cwValue && change.productIsDelete !== true) {
            productLevelCWMap.set(`${darkstoreId}_${productId}`, cwValue);
          }
          const match = {
            productVertexId: productId,
            productIsDelete: change.productIsDelete === true,
          };
          if (!match.productIsDelete && cwValue) {
            match.productCWVertexId = cwValue;
          }
          pushIfValid(updatedGroup.productCWMatches, match);
          return updatedGroup;
        }

        return updatedGroup;
      });
    });

    Object.entries(groups).forEach(([darkstoreId, group]) => {
      const darkStore = darkstoreMatchData?.darkStores?.find(ds => ds.id === darkstoreId);
      const darkStoreDetails = expandedDarkStoreDetails?.[darkstoreId];

      if (group.darkstoreIsDelete) {
        const categoriesData = darkStoreDetails?.productsWithMasterCategories || darkStore?.categories || [];
        const deletedProducts = categoriesData.flatMap(cat => (cat.products || []).map(prod => ({
          productVertexId: prod.id,
          productIsDelete: true,
        })));
        groups[darkstoreId] = { ...group, productCWMatches: deletedProducts };
        return;
      }

      const deletedMasterCategories = new Set(
        group.masterCategoryCWMatches
          .filter(match => match.masterCategoryIsDelete)
          .map(match => match.masterCategoryVertexId),
      );

      if (deletedMasterCategories.size > 0) {
        const existingProductIds = new Set(group.productCWMatches.map(p => p.productVertexId));
        const categoriesData = darkStoreDetails?.productsWithMasterCategories || darkStore?.categories || [];
        categoriesData
          .filter(cat => {
            const categoryId = cat.id || cat.masterCategory?.id;
            return deletedMasterCategories.has(categoryId);
          })
          .forEach(cat => {
            (cat.products || []).forEach(prod => {
              if (!existingProductIds.has(prod.id)) {
                group.productCWMatches.push({
                  productVertexId: prod.id,
                  productIsDelete: true,
                });
              }
            });
          });
      }

      const existing = new Set(group.productCWMatches.map(p => `${p.productVertexId}_${p.productCWVertexId}`));
      const matchedIds = new Set(group.productCWMatches.map(p => p.productVertexId));

      const categoriesData = darkStoreDetails?.productsWithMasterCategories || darkStore?.categories || [];

      categoriesData.forEach(cat => {
        const products = cat.products || [];

        products.forEach(prod => {
          if (!prod?.id || matchedIds.has(prod.id)) {
            return;
          }

          const productKey = `${darkstoreId}_${prod.id}`;
          const categoryId = cat.id || cat.masterCategory?.id;
          const categoryKey = `${darkstoreId}_${categoryId}`;
          const cwId = productLevelCWMap.get(productKey) || categoryLevelCWMap.get(categoryKey) || group.darkstoreCWVertexId;

          if (cwId && !existing.has(`${prod.id}_${cwId}`)) {
            group.productCWMatches.push({
              productVertexId: prod.id,
              productCWVertexId: cwId,
              productIsDelete: false,
            });
            matchedIds.add(prod.id);
          }
        });
      });
    });

    return groups;
  }, [getCentralWarehouseValue, darkstoreMatchData, expandedDarkStoreDetails]);

  const createApiPayload = useCallback(groups => {
    return Object.entries(groups).map(([darkstoreId, data]) => ({
      darkstoreVertexId: darkstoreId,
      masterCategoryCWMatches: data.masterCategoryCWMatches || [],
      productCWMatches: data.productCWMatches || [],
    }));
  }, []);

  const handleDeleteChange = useCallback(changeToDelete => {
    const updatedChanges = changes.filter(change => {
      const isMasterCategoryChange = change.productDetails?.products !== undefined;
      const getName = () => {
        if (isMasterCategoryChange) {
          return change.productDetails?.nameTR || change.productDetails?.nameEN;
        }
        return change.productDetails?.masterCategory?.nameTR ||
          change.productDetails?.masterCategory?.nameEN || '';
      };
      const category = getName();
      const product = isMasterCategoryChange
        ? ''
        : change.productDetails?.nameTR || change.productDetails?.nameEN || '';

      const changeKey = isMasterCategoryChange
        ? `${change.darkStore}-cat-${category}`
        : `${change.darkStore}-prod-${category}-${product}`;

      const deleteKey = changeToDelete.isCategory
        ? `${changeToDelete.darkStore}-cat-${changeToDelete.categoryName}`
        : `${changeToDelete.darkStore}-prod-${changeToDelete.masterCategory}-${changeToDelete.product}`;

      return changeKey !== deleteKey;
    });

    setFieldValue('changes', updatedChanges);
  }, [changes, setFieldValue]);

  const handleSave = useCallback(async () => {
    if (!changes?.length) return;

    setIsLoading(true);
    try {
      const darkstoreGroups = processChanges(changes);
      const darkstoreCWMatches = createApiPayload(darkstoreGroups);

      if (!darkstoreCWMatches.length) {
        message.error(t('INVALID_DATA'));
        return;
      }

      const response = await updateMatchDarkStore({ darkstoreCWMatches });

      if (response?.success === false && response?.error === null) {
        message.loading(t('UPDATE_IN_PROGRESS'), 5);

        setFieldValue('changes', []);
        onClose();

        const currentDataset = values.dataset;
        const currentSelectedValue = values.selectedValue;
        const filterPayload = {};

        if (filterValues) {
          Object.entries(filterValues).forEach(([key, value]) => {
            if (value?.length && MATCH_FILTER_IDS[key]) {
              filterPayload[MATCH_FILTER_IDS[key]] = value;
            }
          });
        }

        const darkstoreVertexIds = darkstoreCWMatches.map(match => match.darkstoreVertexId);

        switch (currentDataset) {
          case DATASET_OPTIONS.CITY:
            filterPayload.cityVertexIds = [currentSelectedValue];
            break;
          case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
            filterPayload.centralWarehouseVertexIds = [currentSelectedValue];
            break;
          case DATASET_OPTIONS.DARK_STORE:
            filterPayload.darkstoreVertexIds = darkstoreVertexIds;
            break;
          default:
            break;
        }

        if (onSaveSuccess) {
          onSaveSuccess();
        }

        dispatch(Creators.fetchDarkStoresMatchRequest(
          currentDataset,
          currentSelectedValue,
          filterPayload,
        ));
      }
      else if (response?.success) {
        message.success(t('SAVE_SUCCESS'));

        setFieldValue('changes', []);
        onClose();

        const currentDataset = values.dataset;
        const currentSelectedValue = values.selectedValue;
        const filterPayload = {};

        if (filterValues) {
          Object.entries(filterValues).forEach(([key, value]) => {
            if (value?.length && MATCH_FILTER_IDS[key]) {
              filterPayload[MATCH_FILTER_IDS[key]] = value;
            }
          });
        }

        const darkstoreVertexIds = darkstoreCWMatches.map(match => match.darkstoreVertexId);

        switch (currentDataset) {
          case DATASET_OPTIONS.CITY:
            filterPayload.cityVertexIds = [currentSelectedValue];
            break;
          case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
            filterPayload.centralWarehouseVertexIds = [currentSelectedValue];
            break;
          case DATASET_OPTIONS.DARK_STORE:
            filterPayload.darkstoreVertexIds = darkstoreVertexIds;
            break;
          default:
            break;
        }

        if (onSaveSuccess) {
          onSaveSuccess();
        }

        dispatch(Creators.fetchDarkStoresMatchRequest(
          currentDataset,
          currentSelectedValue,
          filterPayload,
        ));
      }
      else {
        throw new Error(response?.error?.message || 'Unknown error');
      }
    }
    catch (error) {
      message.error(t('SAVE_ERROR'));
    }
    finally {
      setIsLoading(false);
    }
  }, [changes, processChanges, createApiPayload, t, setFieldValue, onClose, onSaveSuccess, dispatch, values, filterValues]);

  const columns = useMemo(() => [
    {
      title: t('DARK_STORE'),
      dataIndex: 'darkStore',
      key: 'darkStore',
      sorter: (a, b) => a.darkStore.localeCompare(b.darkStore),
    },
    {
      title: t('COLUMNS.CATEGORY'),
      dataIndex: 'Category',
      key: 'category',
      render: (_, record) => (record.isCategory ? record.categoryName : record.masterCategory || ''),
      sorter: (a, b) => {
        const aVal = a.isCategory ? a.categoryName : a.masterCategory || '';
        const bVal = b.isCategory ? b.categoryName : b.masterCategory || '';
        return aVal.localeCompare(bVal);
      },
    },
    {
      title: t('PRODUCT'),
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (record.isCategory ? '' : record.product || ''),
      sorter: (a, b) => (a.product || '').localeCompare(b.product || ''),
    },
    {
      title: t('CENTRAL_WAREHOUSE'),
      dataIndex: 'centralWarehouse',
      key: 'centralWarehouse',
      render: (_, record) => getCentralWarehouseLabel(record),
      sorter: (a, b) => getCentralWarehouseLabel(a).localeCompare(getCentralWarehouseLabel(b)),
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_, record) => (
        <Tooltip title={t('REMOVE_CHANGE')} placement="top">
          <span
            className={`${classes.deleteButton} ${isLoading ? 'disabled' : ''}`}
            onClick={isLoading ? undefined : () => handleDeleteChange(record)}
            onKeyDown={isLoading ? undefined : e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDeleteChange(record);
              }
            }}
            tabIndex={isLoading ? -1 : 0}
            role="button"
            aria-label={t('DELETE_CHANGE')}
          >
            ×
          </span>
        </Tooltip>
      ),
    },
  ], [t, getCentralWarehouseLabel, handleDeleteChange, isLoading, classes.deleteButton]);

  const sortedData = useMemo(() => {
    if (!changes?.length) return [];

    const grouped = changes.reduce((acc, change) => {
      const isMasterCategoryChange = change.productDetails?.products !== undefined;
      const getName = () => {
        if (isMasterCategoryChange) {
          return change.productDetails?.nameTR
            || change.productDetails?.nameEN;
        }
        return change.productDetails?.masterCategory?.nameTR
          || change.productDetails?.masterCategory?.nameEN
          || '';
      };
      const category = getName();
      const product = isMasterCategoryChange
        ? ''
        : change.productDetails?.nameTR
          || change.productDetails?.nameEN
          || '';
      const key = isMasterCategoryChange
        ? `${change.darkStore}-cat-${category}`
        : `${change.darkStore}-prod-${category}-${product}`;
      if (!acc[key] || acc[key].timestamp < change.timestamp) {
        acc[key] = { ...change, isCategory: isMasterCategoryChange, masterCategory: category, categoryName: isMasterCategoryChange ? category : '', product };
      }
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => {
      const dsc = a.darkStore.localeCompare(b.darkStore);
      if (dsc !== 0) return dsc;
      const aCat = a.isCategory ? a.categoryName : a.masterCategory;
      const bCat = b.isCategory ? b.categoryName : b.masterCategory;
      if (aCat !== bCat) return aCat.localeCompare(bCat);
      if (a.isCategory) return -1;
      if (b.isCategory) return 1;
      return (a.product || '').localeCompare(b.product || '');
    });
  }, [changes]);

  return (
    <Modal
      title={t('ARE_YOU_SURE_YOU_WANT_TO_SAVE_CHANGES')}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className={classes.modal}
      centered
      closable={false}
    >
      <div className={classes.modalContent}>
        {isLoading && <div className={classes.loadingOverlay}><Spin size="large" /></div>}
        <div className={classes.subtitle}>{t('OVERVIEW_YOUR_CHANGES_BEFORE_SAVING')}</div>
        <Table
          columns={columns}
          dataSource={sortedData}
          pagination={false}
          className={classes.table}
        />
        <div className={classes.footer}>
          <Button onClick={onClose} color="default" disabled={isLoading}>{t('CANCEL')}</Button>
          <Button type="primary" onClick={handleSave} disabled={isLoading || !sortedData?.length}>{t('SAVE')}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveChangesModal;
