import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Collapse, Row, Col, Spin } from 'antd';

import { clientSelector, accessSelector } from '@app/pages/Client/Detail/redux/selectors';
import { countriesSelector } from '@shared/redux/selectors/common';
import ClientDetailCountrySelection from './ClientDetailCountrySelection';
import CountrySelectionModal from './CountrySelectionModal';
import { GATEWAY_ERRORS } from '@shared/shared/constants';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_COUNTRY_BASED_PERMISSIONS_COMPONENT_COLLAPSE_';

const CountryBasedPermissions = () => {
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const errorCode = useSelector(accessSelector.getErrorCode);
  const countryCodes = useSelector(accessSelector.getCountryCodes);
  const countries = useSelector(countriesSelector.getData);
  const [clientCountries, setClientCountries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  // since non operational countries will not be returned from the getCountries api,
  // this country selection will not show non operational countries like XW, XF, XC
  // if it is requested one day to show country data of a client from a no-longer operational country
  // then the developer should call getCountries with `includeNonOperationals: true` request body parameter
  // otherwise the default behavior will not be returning those countries
  useEffect(() => {
    if (countryCodes && countries) {
      const selected = countries.filter(country => (
        countryCodes.find(code => code === country?.code?.alpha2)
      ));
      setClientCountries(selected);
    }
  }, [countries, countryCodes]);

  if (errorCode === GATEWAY_ERRORS.CLIENT_HAS_NO_DATA_IN_THIS_COUNTRY.errorCode) {
    return (
      <CountrySelectionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        countries={clientCountries}
      />
    );
  }

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel showArrow={false} header={t('COUNTRY_SELECTION.SELECT_COUNTRY')} key={`${COLLAPSE_KEY_PREFIX}1`}>
        <Spin spinning={!client?._id}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <ClientDetailCountrySelection countries={clientCountries} />
            </Col>
          </Row>
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(CountryBasedPermissions);
