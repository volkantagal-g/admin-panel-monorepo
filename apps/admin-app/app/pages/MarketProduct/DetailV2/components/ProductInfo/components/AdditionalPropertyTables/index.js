import { useCallback, useState, memo, useEffect } from 'react';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, unset } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import AddOrEditTableModalForm from './components/AddOrEditTableModalForm';
import { Space, Button, Modal } from '@shared/components/GUI';
import AdditionalPropertyTable from './components/AdditionalPropertyTable';
import add from '@shared/assets/GUI/Icons/Solid/Add.svg';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { FORM_MODE } from '@shared/shared/constants';

const AdditionalPropertyTables = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const [tableModalParams, setTableModalParams] = useState({ mode: FORM_MODE.ADD });

  const openTableModal = params => () => {
    setIsTableModalVisible(true);
    setTableModalParams(params);
  };

  const closeTableModal = useCallback(() => setIsTableModalVisible(false), []);

  useEffect(() => closeTableModal(), [closeTableModal, marketProduct]);

  const [confirmationModal, confirmationModalContext] = Modal.useModal();

  const handleDeleteClick = useCallback(tableIndex => {
    const modalConfig = {
      content: (
        <>
          {t('ADDITIONAL_PROPERTY_INFO.DELETE_TABLE_CONFIRMATION')}
        </>
      ),
      icon: null,
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      onOk: () => {
        const body = {
          additionalPropertyTables: marketProduct.additionalPropertyTables
            .filter(table => table.index !== tableIndex)
            .map((table, index) => ({ ...table, index })),
        };

        body.additionalPropertyTables
          .forEach(table => table.sections
            .forEach(section => section.items
              .forEach(item => unset(item, 'rowId'))));

        dispatch(
          Creators.updateMarketProductRequest({
            id: get(marketProduct, '_id'),
            body,
          }),
        );
      },
      centered: true,
    };
    confirmationModal.confirm(modalConfig);
  }, [dispatch, marketProduct, t, confirmationModal]);

  return (
    <>
      <Space title={(
        <Row justify="space-between">
          <span>{t('ADDITIONAL_PROPERTY_INFO.TITLE')}</span>
          <Button
            size="small"
            onClick={openTableModal({ mode: FORM_MODE.ADD })}
            icon={(<img src={add} alt="add-icon" />)}
          >
            {t('ADDITIONAL_PROPERTY_INFO.NEW_TABLE')}
          </Button>
        </Row>
      )}
      >
        {(marketProduct.additionalPropertyTables ?? []).map(table => {
          return (
            <AdditionalPropertyTable
              table={table}
              onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </Space>
      {isTableModalVisible && (
        <AddOrEditTableModalForm
          params={tableModalParams}
          onCancel={closeTableModal}
        />
      )}
      {confirmationModalContext}
    </>
  );
});

export default AdditionalPropertyTables;
