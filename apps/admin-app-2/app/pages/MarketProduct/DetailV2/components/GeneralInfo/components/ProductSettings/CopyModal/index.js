import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'react-jss';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import {
  createMarketProductSelector,
  getMarketProductByIdSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { Select } from '@shared/components/GUI/Select';
import { getCountryOptions } from '@shared/utils/formHelper';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { prepareProductForGivenCountry } from './utils';
import AntTable from '@shared/components/UI/AntTable';
import { ROUTE } from '@app/routes';
import { usePrevious } from '@shared/hooks';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Modal, Button } from '@shared/components/GUI';
import useConfirmationModal from '@app/pages/MarketProduct/DetailV2/hooks/useConfirmationModal';

const CopyModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation('marketProductPageV2');
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const generalSelectedCountry = getSelectedCountry();
  const [selectedCountryId, setSelectedCountryId] = useState();
  const [copiedProducts, setCopiedProducts] = useState([]);
  const [showConfirmationModal, confirmationModal] = useConfirmationModal();

  const isCreatePending = useSelector(createMarketProductSelector.getIsPending);
  const copiedProduct = useSelector(createMarketProductSelector.getData);
  const prevIsCreatePending = usePrevious(isCreatePending);

  let countries = useSelector(countriesSelector.getData);
  countries = countries.filter(country => country?._id !== generalSelectedCountry?._id);
  const countriesMap = createMap(countries);
  const countryOptions = getCountryOptions(countries);
  const countryName = get(countriesMap, [selectedCountryId, 'name', getLangKey()], '');

  const handleCopyClick = () => {
    showConfirmationModal({
      message: t('COPY_PRODUCT_CONFIRMATION_TEXT'),
      okText: t('COPY'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        const country = get(countriesMap, [selectedCountryId]);
        const newMarketProduct = prepareProductForGivenCountry(marketProduct, country);
        dispatch(Creators.createMarketProductRequest({ body: newMarketProduct }));
      },
    });
  };

  useEffect(() => {
    if (prevIsCreatePending && !isCreatePending && copiedProduct?._id) {
      const newCopiedProducts = [...copiedProducts, copiedProduct];
      setCopiedProducts(newCopiedProducts);
      setSelectedCountryId();
    }
  }, [copiedProduct, copiedProduct?._id, copiedProducts, isCreatePending, prevIsCreatePending]);

  const tableColumns = [
    {
      title: t('global:NAME_1'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 100,
      render: fullName => {
        return get(fullName, [getLangKey()], '');
      },
    },
    {
      title: t('global:COUNTRY'),
      dataIndex: 'country',
      key: 'country',
      width: 100,
      render: country => {
        return get(countriesMap, [country, 'name', getLangKey()], '');
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const marketProductId = get(record, '_id', '');
            const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', marketProductId);
            window.open(path, '_blank');
          },
        };

        return (
          <Button type="default" size="small" onClick={action.onDetailClick}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        width={800}
        visible
        centered
        title={t('COPY_THIS_PRODUCT_TO_ANOTHER_COUNTRY')}
        onCancel={onCancel}
        footer={[
          <Button key="back" color="secondary" onClick={onCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="current-product-info"
            htmlType="submit"
            onClick={handleCopyClick}
            disabled={!countryName}
            loading={isCreatePending}
          >
            {t('COPY')}
          </Button>,
        ]}
      >
        <Row className="mb-5">
          <Col span={24} className="mb-2">
            {t('DESCRIPTION_OF_COPY_PRODUCT')}
          </Col>
          <Col span={24}>
            <Select
              label="Select a country"
              className="w-100"
              value={selectedCountryId}
              optionsData={countryOptions}
              onChange={countryId => {
                setSelectedCountryId(countryId);
              }}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
        {copiedProducts?.length > 0 && (
          <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
            <AntTable
              title={t('COPIED_PRODUCTS')}
              data={copiedProducts}
              columns={tableColumns}
            />
          </Row>
        )}
      </Modal>
      {confirmationModal}
    </>
  );
};

export default CopyModal;
