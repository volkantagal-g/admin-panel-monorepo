import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import ChainConfigurationForm from '../ChainConfigurationForm';
import useStyles from './styles';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
import { Creators } from '../../redux/actions';
import { Chain as ChainType, ChainDetail, RootState } from '../../redux/types';

interface BulkEditDrawerProps {
  selectedCount: number;
}

const BulkEditDrawer: React.FC<BulkEditDrawerProps> = ({ selectedCount }) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Redux state'ten durumları al
  const isBulkEditing = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.isBulkEditing || false);
  const isDrawerOpen = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.isDrawerOpen || false);
  const bulkEditError = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.error || null);
  const selectedChainIds = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.selectedChainIds || []);
  const chains = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.chains || []);

  // Create chainsWithUniqueIds array if chains don't already have uniqueId properties
  const chainsWithUniqueIds = React.useMemo(() => {
    return chains.map(chain => {
      if (chain.uniqueId) {
        return chain;
      }
      const { domain } = chain.rawData;
      const domainTypeId = domain?.id;
      const uniqueId = domainTypeId ? `${chain.rawData.chain.id}-${domainTypeId}` : chain.rawData.chain.id;
      return { ...chain, uniqueId };
    });
  }, [chains]);

  const handleClose = () => {
    form.resetFields();
    setFormError(null);
    setFormSuccess(false);
    dispatch(Creators.closeEditDrawer());
  };

  // Reset form when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      form.resetFields();
      setFormError(null);
      setFormSuccess(false);
    }
  }, [isDrawerOpen, form]);

  // Redux state değiştiğinde form durumunu güncelle
  useEffect(() => {
    setIsSubmitting(isBulkEditing);

    if (bulkEditError) {
      setFormError(bulkEditError);
      setFormSuccess(false);
    }
    else if (!isBulkEditing && formError === null && isSubmitting) {
      // Bulk edit tamamlandı, hata yok ve submit edilmiş demektir
      setFormSuccess(true);
    }
  }, [isBulkEditing, bulkEditError, formError, isSubmitting]);

  // Get domain information for selected chains
  const selectedChainsWithDomains = React.useMemo<ChainDetail[]>(() => {
    // Find corresponding chains for each selected ID
    return selectedChainIds.map((selectedId: string) => {
      // Find the matching chain in the chains array
      const chain = chainsWithUniqueIds.find((c: ChainType) => c.uniqueId === selectedId || c.id === selectedId);

      if (chain) {
        // Extract domain information from the found chain
        const { domain } = chain.rawData;
        const domainTypeId = domain?.id;

        return {
          chainId: chain.rawData.chain.id,
          domainTypeId,
        };
      }

      // If no matching chain found (shouldn't happen in normal operation)
      return {
        chainId: selectedId,
        domainTypeId: undefined,
      };
    });
  }, [selectedChainIds, chainsWithUniqueIds]);

  const handleSave = async () => {
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(false);

    try {
      // Formdan değerleri al
      const values = form.getFieldsValue(true);

      // Redux action'ı dispatch et
      dispatch(Creators.bulkEditChainsRequest({
        chainDetails: selectedChainsWithDomains,
        formValues: values,
      }));
    }
    catch (error) {
      // Handle error silently, saga will handle displaying the error
      setFormError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Drawer
      title={t('BULK_EDIT_CHAINS')}
      placement="right"
      onClose={handleClose}
      visible={isDrawerOpen}
      width={720}
      className={classes.drawer}
      destroyOnClose
      extra={(
        <div className={classes.drawerExtra}>
          <Button
            onClick={handleClose}
            className={classes.cancelButton}
            disabled={isSubmitting}
          >
            {t('BUTTONS.CANCEL')}
          </Button>
          <Button
            onClick={handleSave}
            type="primary"
            className={classes.saveButton}
            loading={isSubmitting}
          >
            {t('BUTTONS.SAVE_CHANGES')} ({selectedCount})
          </Button>
        </div>
      )}
    >
      <div className={classes.drawerContent}>
        <p className={classes.subtitle}>{t('BULK_EDIT_CHAINS_SUBTITLE')}</p>
        <ChainConfigurationForm
          form={form}
          isEdit
          isBulkEdit
          onFinish={handleSave}
          onFinishFailed={() => {
            // Handle failed validation silently
            setFormError('Please check the form for errors');
          }}
          loading={isSubmitting}
          error={formError}
          success={formSuccess}
          initialValues={{
            pickedToZero: false,
            isEnabled: false,
          }}
        />
      </div>
    </Drawer>
  );
};

export default BulkEditDrawer;
