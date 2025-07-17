import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectCountry from '../Select/Country';
import SelectWeek from '../Select/Week';
import { getNumberOfWeek } from '../../utils';

const Filter = ({ filters, onFilterChange }) => {
  const { t } = useTranslation('euGrowthComparison');

  const handleCountryOnChange = country => {
    onFilterChange({ ...filters, country });
  };

  const handleWeekOnChange = week => {
    onFilterChange({ ...filters, week });
  };

  const getCalculatedWeekOptions = () => {
    const { country } = filters;
    if (!country) {
      return [];
    }

    const numberOfWeek = getNumberOfWeek(country);

    const options = Array.from(
      { length: numberOfWeek },
      (_, index) => ({
        value: numberOfWeek - index,
        label: t('WEEK_X', { week: numberOfWeek - index }),
      }));
    return options;
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col xs={12} sm={12} md={4}>
            <SelectCountry
              onChange={handleCountryOnChange}
              value={filters.country?.countryCode}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <SelectWeek
              onChange={handleWeekOnChange}
              value={filters.week}
              options={getCalculatedWeekOptions()}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Filter;
