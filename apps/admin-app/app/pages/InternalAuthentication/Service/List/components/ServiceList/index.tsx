import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Input, Row } from 'antd';
import { isEmpty } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { DbInternalServiceWithTeam } from '@app/pages/InternalAuthentication/types';
import { usePermission } from '@shared/hooks';

import { serviceSelector } from '../../redux/selectors';
import { tableColumns } from './config';

const { Search } = Input;

const getFilteredServices = (serviceData: DbInternalServiceWithTeam[], searchText: string) => {
  if (isEmpty(serviceData)) return [];

  const pattern = new RegExp(searchText, 'i');
  return serviceData.filter(service => {
    if (pattern.test(service.name)) return true;
    if (pattern.test(service.description)) return true;
    return pattern.test(service.team.name);
  });
};

const ServiceList = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const serviceData = useSelector(serviceSelector.getData);
  const isPending = useSelector(serviceSelector.getIsPending);

  const { Can } = usePermission();

  const [searchText, setSearchText] = useState('');
  const filteredServices = getFilteredServices(serviceData, searchText);

  return (
    <>
      <Row>
        <Search
          size="large"
          allowClear
          placeholder={t('SEARCH')}
          onChange={event => {
            setSearchText(event.target.value);
          }}
          enterButton
        />
      </Row>
      <AntTableV2 columns={tableColumns({ t, Can })} data={filteredServices} loading={isPending} />
    </>
  );
};

export default ServiceList;
