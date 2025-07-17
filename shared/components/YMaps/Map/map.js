import { Map, SearchControl, TrafficControl, TypeSelector, ZoomControl, YMaps } from 'react-yandex-maps';

import { ENVIRONMENT } from '@shared/config';
import { DEFAULT_MAP_OPTIONS } from '@shared/shared/constants';
import { getFullLangKey } from '@shared/i18n';

const YandexMap = ({
  isShowSearchControl = false,
  searchControlOptions = {},
  isShowTrafficControl = false,
  trafficControlOptions = {},
  isShowTypeSelector = false,
  typeSelectorOptions = {},
  isShowZoomControl = false,
  zoomControlOptions = {},
  width = '100%',
  height = '100%',
  state = {
    center: DEFAULT_MAP_OPTIONS.CENTER,
    zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL,
  },
  children,
  ...otherProps
}) => {
  return (
    <YMaps
      query={{
        lang: getFullLangKey(),
        apikey: ENVIRONMENT.YANDEX_JS_KEY,
      }}
    >
      <Map
        height={height}
        width={width}
        state={state}
        options={{ autoFitToViewport: 'always' }}
        {...otherProps}
      >
        {isShowSearchControl ? <SearchControl options={searchControlOptions} /> : undefined}
        {isShowTrafficControl ? <TrafficControl options={trafficControlOptions} /> : undefined}
        {isShowTypeSelector ? <TypeSelector options={typeSelectorOptions} /> : undefined}
        {isShowZoomControl ? <ZoomControl options={zoomControlOptions} /> : undefined}
        {children}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
