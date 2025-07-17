import { Col, Row, Tabs, Slider } from 'antd';
import { debounce, includes, toUpper } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import { REQUIRED_FIELDS, SLIDER_HOUR_MARKS } from '../../utils/constants';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

const { TabPane } = Tabs;

const WeatherController = ({
  weatherFields = [],
  setFilters,
  filters,
}) => {
  const { t } = useTranslation('gisWeatherMapPage');

  const [currentField, setCurrentTab] = useState('temperature');

  const classes = useStyles();

  const handleTabsChange = useCallback(selectedField => {
    setCurrentTab(selectedField);
    return setFilters({ ...filters, selectedField });
  }, [filters, setFilters]);

  const handleSliderChange = useCallback(selectedHour => {
    return setFilters({ ...filters, selectedHour });
  }, [filters, setFilters]);

  const getWeatherTabsByFields = useMemo(() => {
    return (
      weatherFields &&
      weatherFields.map(field => {
        if (includes(REQUIRED_FIELDS, field)) {
          return <TabPane tab={t(`${toUpper(field)}`)} key={field} />;
        }
        return null;
      })
    );
  }, [t, weatherFields]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs onChange={handleTabsChange} activeKey={currentField || filters.selectedField}>
            {getWeatherTabsByFields}
          </Tabs>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Slider
            selectKey="hours"
            marks={SLIDER_HOUR_MARKS}
            className={classes.sliderWrapper}
            tipFormatter={tag => `${tag}:00`}
            min={0}
            dots
            max={24}
            step={1}
            defaultValue={filters.selectedHour}
            onChange={debounce(handleSliderChange, DEFAULT_DEBOUNCE_MS)}

          />
        </Col>
      </Row>
    </>
  );
};

export default WeatherController;
