import { Button, Col, Input, Modal, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { countryCityManagementSelector } from '../../../redux/selectors';
import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';

const { TextArea } = Input;

const CityGeometry = props => {
  const { record } = props;
  const { t } = useTranslation('gisCountryCityManagementPage');
  const dispatch = useDispatch();

  const cityBoundary = useSelector(countryCityManagementSelector.cityBoundaryData);
  const isPendingCityBoundary = useSelector(countryCityManagementSelector.isPendingCityBoundary);

  const [jsonInputCity, setJsonInputCity] = useState();

  useEffect(() => {
    if (cityBoundary && cityBoundary.geometry) {
      setJsonInputCity(JSON.stringify({
        cityId: record.id,
        geometry: cityBoundary.geometry,
      }, null, 2));
    }
    else {
      setJsonInputCity(JSON.stringify({
        cityId: record.id,
        geometry: {},
      }, null, 2));
    }
  }, [cityBoundary, record.id]);

  const [isFormModalOpen, setFormModalOpen] = useState(false);

  const handleBoundaryButtonClick = () => {
    dispatch(Creators.getCityBoundaryRequest({ id: record.id }));
    setFormModalOpen(true);
  };

  const onEditModalCancel = () => {
    setFormModalOpen(false);
  };

  const updateOrCreateCity = () => {
    try {
      if (cityBoundary && cityBoundary.city) {
        const parseUpdateData = {
          id: cityBoundary.id,
          updatedData: JSON.parse(jsonInputCity),
        };
        dispatch(Creators.updateCityBoundaryRequest(parseUpdateData));
      }
      else {
        dispatch(Creators.createCityBoundaryRequest({ body: JSON.parse(jsonInputCity) }));
      }
      onEditModalCancel();
    }
    catch (error) {
      setFormModalOpen(true);
    }
  };

  const renderUpdateModalForm = () => {
    if (isPendingCityBoundary) {
      return <Spin data-testid="update-city-loading-icon" size="large" />;
    }

    return (
      <Row gutter={[16]}>
        <Col span={24}>
          <TextArea
            data-testid="boundary-city-text-area"
            value={jsonInputCity}
            autoSize={{ minRows: 18, maxRows: 18 }}
            onChange={e => setJsonInputCity(e.target.value)}
          />
          {cityBoundary && cityBoundary.city ? (
            <Button onClick={updateOrCreateCity} type="default" block>
              {t('UPDATE_CITY_BOUNDARY')}
            </Button>
          ) : (
            <Button data-testid="boundary-city-distpatch" onClick={updateOrCreateCity} type="default" block>
              {t('CREATE_CITY_BOUNDARY')}
            </Button>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleBoundaryButtonClick}
        data-testid={`city-boundary-button-${record.id}`}
      >
        {t('BOUNDARY')}
      </Button>
      <Modal
        data-testid="create-modal"
        title={t('UPDATE_CITY_BOUNDARY')}
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

export default CityGeometry;
