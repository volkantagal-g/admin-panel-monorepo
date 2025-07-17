import { Button, Col, Input, Modal, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { countryCityManagementSelector } from '../../../redux/selectors';
import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';

const { TextArea } = Input;

const CountryGeometry = props => {
  const { record } = props;
  const { t } = useTranslation('gisCountryCityManagementPage');
  const dispatch = useDispatch();

  const countryBoundary = useSelector(countryCityManagementSelector.countryBoundaryData);
  const isPendingCountryBoundary = useSelector(countryCityManagementSelector.isPendingCountryBoundary);
  const [jsonInputCountry, setJsonInputCountry] = useState();

  useEffect(() => {
    if (countryBoundary && countryBoundary.geometry) {
      setJsonInputCountry(JSON.stringify({
        countryId: record.id,
        geometry: countryBoundary.geometry,
      }, null, 2));
    }
    else {
      setJsonInputCountry(JSON.stringify({
        countryId: record.id,
        geometry: {},
      }, null, 2));
    }
  }, [countryBoundary, record.id]);

  const [isFormModalOpen, setFormModalOpen] = useState(false);

  const handleBoundaryButtonClick = () => {
    dispatch(Creators.getCountryBoundaryRequest({ id: record.id }));
    setFormModalOpen(true);
  };

  const onEditModalCancel = () => {
    setFormModalOpen(false);
  };

  const updateOrCreateCountry = () => {
    try {
      if (countryBoundary && countryBoundary.country) {
        const parseUpdateData = {
          id: countryBoundary.id,
          updatedData: JSON.parse(jsonInputCountry),
        };
        dispatch(Creators.updateCountryBoundaryRequest(parseUpdateData));
      }
      else {
        dispatch(Creators.createCountryBoundaryRequest({ body: JSON.parse(jsonInputCountry) }));
      }
      onEditModalCancel();
    }
    catch (error) {
      setFormModalOpen(true);
    }
  };

  const renderUpdateModalForm = () => {
    if (isPendingCountryBoundary) {
      return <Spin data-testid="update-country-loading-icon" size="large" />;
    }

    return (
      <Row gutter={[16]}>
        <Col span={24}>
          <TextArea
            data-testid="boundary-country-text-area"
            value={jsonInputCountry}
            autoSize={{ minRows: 18, maxRows: 18 }}
            onChange={e => setJsonInputCountry(e.target.value)}
          />
          <Button data-testid="boundary-country-distpatch" onClick={updateOrCreateCountry} type="default" block>
            {countryBoundary && countryBoundary.country ? t('UPDATE_COUNTRY_BOUNDARY') : t('CREATE_COUNTRY_BOUNDARY')}
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleBoundaryButtonClick}
        data-testid={`country-boundary-button-${record.id}`}
      >
        {t('BOUNDARY')}
      </Button>
      <Modal
        title={t('UPDATE_COUNTRY_BOUNDARY')}
        visible={isFormModalOpen}
        getContainer={false}
        destroyOnClose
        centered
        onCancel={onEditModalCancel}
      >
        {renderUpdateModalForm()}
      </Modal>
    </>
  );
};

export default CountryGeometry;
