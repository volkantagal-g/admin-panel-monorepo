import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';

import useQuery from '@shared/shared/hooks/useQuery';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { getCitiesSelector } from '@shared/redux/selectors/common';

import { findCityName } from './utils';

const Header = () => {
  const { t } = useTranslation('localsCourierLiveMonitoringPage');
  const { pathname: url } = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const pageTitle = t('PAGE_TITLE');

  const selectedCity = query.get('selectedCity');
  const cities = useSelector(getCitiesSelector.getData);
  const cityName = useMemo(() => findCityName(selectedCity, cities), [selectedCity, cities]);

  return (
    <>
      <PageTitleHeader title={pageTitle} />
      <PageHeader className="p-0" title={pageTitle} subTitle={cityName} onBack={selectedCity ? () => navigate(url) : null} />
    </>
  );
};

export default Header;
