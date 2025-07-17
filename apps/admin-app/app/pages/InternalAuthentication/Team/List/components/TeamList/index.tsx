import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Input, Row } from 'antd';
import { isEmpty } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { DbInternalTeam } from '@app/pages/InternalAuthentication/types';
import { usePermission } from '@shared/hooks';

import { teamsSelector } from '../../redux/selectors';
import { tableColumns } from './config';

const { Search } = Input;

const getFilteredTeams = (teamsData: DbInternalTeam[], searchText: string) => {
  if (isEmpty(teamsData)) return [];

  const pattern = new RegExp(searchText, 'i');
  return teamsData.filter(team => {
    if (pattern.test(team.name)) return true;
    return pattern.test(team.description);
  });
};

const TeamList = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);

  const teamsData = useSelector(teamsSelector.getData);
  const teamsArePending = useSelector(teamsSelector.getIsPending);

  const [searchText, setSearchText] = useState('');

  const { Can } = usePermission();

  const filteredTeams = getFilteredTeams(teamsData, searchText);

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
      <AntTableV2 columns={tableColumns({ t, Can })} data={filteredTeams} loading={teamsArePending} />
    </>
  );
};

export default TeamList;
