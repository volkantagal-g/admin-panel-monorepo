import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Creators } from '../../../redux/actions';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from './styles';
import { countryCityManagementSelector } from '../../../redux/selectors';

const CountryList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('gisCountryCityManagementPage');
  const classes = useStyles();

  const [selectedRowKeys, setSelectedRowKeys] = useState();

  const countriesData = useSelector(countryCityManagementSelector.countryData);
  const { Can } = usePermission();

  const handleRowClick = record => {
    setSelectedRowKeys(record.id);
    dispatch(Creators.setCountryId({ id: record.id }));
    dispatch(CommonCreators.getCitiesRequest({ countryId: [record.id] }));
  };

  const columns = useMemo(() => tableColumns(t, Can), [t, Can]);

  return (
    <div
      className={classes.tableColumn}
    >
      <AntTableV2
        data-testid="country-table"
        data={countriesData}
        columns={columns}
        isScrollableToTop={false}
        onRow={record => ({ onClick: () => handleRowClick(record) })}
        rowSelection={{
          selectedRowKeys: [selectedRowKeys],
          hideSelectAll: true,
          type: 'radio',
        }}
      />
    </div>
  );
};

export default CountryList;
