import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import useStyles from './styles';
import { generateColumns } from './config';
import { ORDER_PERIOD } from './constants';
import { operationalCountriesSelector as countriesSelector, getCitiesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';

const Table = ({ identifier, currentCityId, currentCountryId, isHeaderShow }) => {
  const classes = useStyles();
  const headers = Object.keys(ORDER_PERIOD);
  const cities = useSelector(getCitiesSelector.getData);
  const countries = useSelector(countriesSelector.getData || []);
  const currentCityName = useMemo(() => {
    return cities.find(city => city.id === currentCityId)?.name[getLangKey()];
  }, [cities, currentCityId]);
  const currentCountryName = useMemo(() => {
    return countries.find(country => country.id === currentCountryId)?.name[getLangKey()];
  }, [countries, currentCountryId]);

  const TODAY = 'TODAY';

  return (
    <table className={classes.selectedIdentifierActiveOrdersTable}>
      {
        isHeaderShow && (
          <thead>
            {headers.map((header, index) => (
              <tr key={header}>
                {index === 0 && (<th> </th>)}
                { generateColumns({ header }).map(column => (
                  header === TODAY && (
                  <th key={column.value} className={classes.tableHeaders}>
                    {column.desc[ORDER_PERIOD[header]]?.split('(')[0]}
                  </th>
                  )
                ))}
              </tr>
            ))}
          </thead>
        )
      }
      <tbody>
        {headers.map((header, index) => (
          <tr key={header}>
            {index === 0 && (
            <td key={currentCityName} className={classes.cityCountryName} rowSpan={3}>
              {currentCityName || currentCountryName}
            </td>
            )}
            { generateColumns({ header }).map(column => (
              <td key={column.value} title={column.desc[ORDER_PERIOD[header]]} className={classes[column.class]} colSpan={column.colSpan}>
                {column.render(ORDER_PERIOD[header], get(identifier, column.objectIndexer, {}))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
