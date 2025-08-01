import { message, Modal, Spin } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateMatchDarkStore } from '@shared/api/marketProductChainManagement';
import { Button, Select } from '@shared/components/GUI';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import { MATCH_FILTER_IDS, REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { DATASET_OPTIONS } from '../constants';
import { Creators } from '../redux/actions';
import useStyles from './styles';

const BulkEditModal = ({ isOpen, onClose, onChangeCW, centralWarehouses, dataset, selectedValue, filterValues, expandedDarkStoreDetails, expandedPanels }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedCW, setSelectedCW] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { darkstoreMatchData } = useSelector(state => ({ darkstoreMatchData: state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE]?.darkstoreMatchData || {} }));

  const handleChangeCW = async () => {
    try {
      setIsLoading(true);
      const selectedCWDetails = centralWarehouses.find(cw => cw.value === selectedCW);

      if (selectedCWDetails && darkstoreMatchData?.darkStores) {
        const darkstoreCWMatches = darkstoreMatchData.darkStores.map(darkStore => {
          const match = {
            darkstoreVertexId: darkStore.id,
            masterCategoryCWMatches: [],
            productCWMatches: [],
          };

          const isExpanded = expandedPanels?.current?.has
            ? expandedPanels.current.has(darkStore.id)
            : expandedPanels?.has(darkStore.id);
          const darkStoreDetails = expandedDarkStoreDetails?.[darkStore.id];

          if (isExpanded && darkStoreDetails?.productsWithMasterCategories) {
            darkStoreDetails.productsWithMasterCategories.forEach(category => {
              if (!category?.products?.length) return;

              category.products.forEach(product => {
                if (!product?.id) return;

                match.productCWMatches.push({
                  productVertexId: product.id,
                  productCWVertexId: selectedCWDetails.value,
                });
              });
            });
          }

          return match;
        });

        await updateMatchDarkStore({ darkstoreCWMatches });
        message.success(t('BULK_EDIT_SUCCESS'));

        const darkstoreVertexIds = darkstoreCWMatches.map(match => match.darkstoreVertexId);

        const filterPayload = {};
        if (filterValues) {
          Object.entries(filterValues).forEach(([key, value]) => {
            if (value?.length && MATCH_FILTER_IDS[key]) {
              filterPayload[MATCH_FILTER_IDS[key]] = value;
            }
          });
        }

        switch (dataset) {
          case DATASET_OPTIONS.CITY:
            filterPayload.cityVertexIds = [selectedValue];
            break;
          case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
            filterPayload.centralWarehouseVertexIds = [selectedValue];
            break;
          case DATASET_OPTIONS.DARK_STORE:
            filterPayload.darkstoreVertexIds = darkstoreVertexIds;
            break;
          default:
            break;
        }

        Object.keys(filterPayload).forEach(key => {
          if (!filterPayload[key] || filterPayload[key].length === 0) {
            delete filterPayload[key];
          }
        });

        dispatch(Creators.fetchDarkStoresMatchRequest(
          dataset,
          selectedValue,
          filterPayload,
        ));
      }

      onChangeCW();
    }
    catch (error) {
      message.error(t('BULK_EDIT_ERROR'));
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={t('BULK_EDIT')}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      className={classes.modal}
      centered
    >
      <div className={classes.bulkEditContainer}>
        <div className={classes.subtitle}>
          {t('BULK_EDIT_SUBTITLE')}
        </div>

        <Select
          className={classes.filterSelect}
          label={t('CENTRAL_WAREHOUSE')}
          optionsData={centralWarehouses}
          showSearch
          showArrow
          value={selectedCW}
          onChange={value => setSelectedCW(value)}
          disabled={isLoading}
          suffixIcon={<img src={chevronDown} alt="chevron-down" />}
        />
      </div>

      <div className={classes.modalFooter}>
        <Button color="default" onClick={onClose} disabled={isLoading}>{t('CANCEL')}</Button>
        <Button
          color="primary"
          onClick={handleChangeCW}
          disabled={!selectedCW || isLoading}
          loading={isLoading}
        >
          {t('CHANGE_THE_CW')}
        </Button>
      </div>

      {isLoading && (
        <div className={classes.loadingOverlay}>
          <Spin size="large" />
        </div>
      )}
    </Modal>
  );
};

export default BulkEditModal;
