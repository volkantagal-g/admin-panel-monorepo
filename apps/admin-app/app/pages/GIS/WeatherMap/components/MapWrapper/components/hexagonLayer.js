import { H3HexagonLayer } from '@deck.gl/geo-layers/';
import { IconLayer } from '@deck.gl/layers';

import moment from 'moment';
import { filter, get, inRange, reverse, toUpper } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { cellToLatLng } from 'h3-js';

import { useTranslation } from 'react-i18next';

import { featureCollection as tFeatureCollection, point as tPoint } from '@turf/turf';

import { useSelector } from 'react-redux';

import { DeckGLOverlay, PointClusterLayer } from '@shared/containers/GIS/Maps';
import { getH3HexagonFillColor } from '../../../utils/helper';
import { WEATHER_CODE_FIELD, MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL } from '../../../utils/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const HexagonLayer = ({ weatherForecastData, filters, zoomLevel }) => {
  const [hexData, setHexData] = useState([]);
  const { selectedHour, selectedDay, selectedField } = filters;
  const { t } = useTranslation('gisWeatherMapPage');
  const isInZoomRange = inRange(Math.round(zoomLevel), MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const selectedTimezone = get(selectedCountry, 'timezones.0.timezone');

  useEffect(() => {
    const datestringMap = weatherForecastData?.forecasts?.map(forecast => {
      const date = moment(forecast.forecast_datetime).tz(selectedTimezone).format();
      return { ...forecast, forecastDateString: date };
    });
    const formattedDateTime = moment(`${selectedDay?.split('T')[0]} ${selectedHour}:00:00`).format();
    const filteredDataByDate = filter(datestringMap, { forecastDateString: formattedDateTime });

    return (setHexData(filteredDataByDate));
  }, [selectedDay, selectedHour, weatherForecastData?.forecasts, selectedField, selectedTimezone]);

  const memoizedHexLayer = useMemo(() => {
    return new H3HexagonLayer({
      id: `alerted-layer-${selectedField}`,
      data: hexData,
      pickable: true,
      wireframe: false,
      filled: true,
      extruded: true,
      getHexagon: d => d.h3Id,
      getFillColor: d => getH3HexagonFillColor(filters.selectedField, d?.[filters.selectedField]),
      getElevation: 0,
      opacity: 0.5,
    });
  }, [filters.selectedField, hexData, selectedField]);

  const memoizedIconLayer = useMemo(() => {
    if (isInZoomRange) {
      return new IconLayer({
        id: `alerted-layer-${selectedField}`,
        data: hexData,
        getIcon: d => ({
          url: d.weather_icons[0],
          width: 64,
          height: 64,
          anchorY: 64,
          mask: false,
        }),
        getSize: () => 2,
        pickable: true,
        sizeScale: 20,
        getPosition: d => reverse(cellToLatLng(d.h3Id)),
      });
    }

    return [];
  }, [hexData, isInZoomRange, selectedField]);

  const renderLayers = useCallback(() => {
    if (weatherForecastData.forecasts) {
      if (selectedField !== WEATHER_CODE_FIELD) {
        return memoizedHexLayer;
      }
      if (selectedField === WEATHER_CODE_FIELD) {
        return memoizedIconLayer;
      }
    }
    return null;
  }, [memoizedHexLayer, memoizedIconLayer, selectedField, weatherForecastData.forecasts]);

  const getTooltip = ({ object }) => {
    const iconTooltip = (object && `${t(toUpper(selectedField))}: ${t(`WEATHER_CODES.${object[selectedField]}`)}`);
    const hexTooltip = (object && `${t(toUpper(selectedField))}: ${t(`${object[selectedField]}`)}`);
    return (selectedField === WEATHER_CODE_FIELD) ? iconTooltip : hexTooltip;
  };

  const hexGeojson = tFeatureCollection(
    hexData.map(hex => {
      const { h3Id, ...properties } = hex;
      const [latitude, longitude] = cellToLatLng(h3Id);
      const geoJsonFeature = tPoint([longitude, latitude], properties);
      return geoJsonFeature;
    }),
  );

  return (
    <>
      <DeckGLOverlay
        layers={renderLayers()}
        getTooltip={getTooltip}
      />
      {
        ((!isInZoomRange && (selectedField === WEATHER_CODE_FIELD)) &&
          <PointClusterLayer geoJsonData={hexGeojson} />
        )
      }
    </>
  );
};

export default HexagonLayer;
