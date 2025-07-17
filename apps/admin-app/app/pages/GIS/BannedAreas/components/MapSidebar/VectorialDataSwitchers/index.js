import { Col, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import useStyles from './styles';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { bannedAreaPageSelector } from '@app/pages/GIS/BannedAreas/redux/selectors';
import { Creators } from '@app/pages/GIS/BannedAreas/redux/actions';
import { optionClassNames } from '../../../utils/constants';

function VectorialDataSwitchers(props) {
  const { disableSwitcher } = props;
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountry);
  const classes = useStyles();
  const { t } = useTranslation('gisBannedAreasPage');
  const mapOptions = useSelector(bannedAreaPageSelector.getMapOptions);
  const formValues = useSelector(bannedAreaPageSelector.getFormValues);
  const scheduledBanFormValues = useSelector(bannedAreaPageSelector.getscheduledBanFormValues);

  const g10Polygons = useSelector(bannedAreaPageSelector.getG10Polygons);
  const gbPolygons = useSelector(bannedAreaPageSelector.getGbPolygons);
  const gsPolygons = useSelector(bannedAreaPageSelector.getGsPolygons);

  const countryCode = selectedCountry.code.alpha2;
  const { success, danger } = optionClassNames;

  const handleMapOptionsChange = ({ isShowG10Areas, isShowGBAreas, isShowGSAreas }) => {
    dispatch(Creators.setMapOptions({ isShowG10Areas, isShowGBAreas, isShowGSAreas }));
  };

  useEffect(() => {
    if (mapOptions.isShowG10Areas && (formValues.cityId || scheduledBanFormValues.cityId) && g10Polygons.length === 0) {
      dispatch(Creators.getG10PolygonsRequest());
    }
    if (mapOptions.isShowGBAreas && (formValues.cityId || scheduledBanFormValues.cityId) && gbPolygons.length === 0) {
      dispatch(Creators.getGbPolygonsRequest());
    }
    if (mapOptions.isShowGSAreas && (formValues.cityId || scheduledBanFormValues.cityId) && gsPolygons.length === 0) {
      dispatch(Creators.getGsPolygonsRequest());
    }
  }, [dispatch,
    formValues.cityId,
    g10Polygons.length,
    gbPolygons.length,
    gsPolygons.length,
    mapOptions.isShowG10Areas,
    mapOptions.isShowGBAreas,
    mapOptions.isShowGSAreas,
    scheduledBanFormValues.cityId]);

  return (
    <>
      <Col span={24} className={classes.switchWrapper}>
        <Switch
          checked={mapOptions.isShowG10Areas}
          onChange={status => handleMapOptionsChange({ ...mapOptions, isShowG10Areas: status })}
          className={mapOptions.isShowG10Areas ? success : danger}
          disabled={disableSwitcher}
        />
        <span> {t('SHOW_G10_WMS')}</span>
      </Col>
      {countryCode === 'TR' ? (
        <Col span={24} className={classes.switchWrapper}>
          <Switch
            checked={mapOptions.isShowGBAreas}
            onChange={status => handleMapOptionsChange({ ...mapOptions, isShowGBAreas: status })}
            className={mapOptions.isShowGBAreas ? success : danger}
            disabled={disableSwitcher}
          />
          <span> {t('SHOW_GB_WMS')}</span>
        </Col>
      ) : undefined}
      {countryCode === 'TR' ? (
        <Col span={24} className={classes.switchWrapper}>
          <Switch
            checked={mapOptions.isShowGSAreas}
            onChange={status => handleMapOptionsChange({ ...mapOptions, isShowGSAreas: status })}
            className={mapOptions.isShowGSAreas ? success : danger}
            disabled={disableSwitcher}
          />
          <span> {t('SHOW_GS_WMS')}</span>
        </Col>
      ) : undefined}
    </>
  );
}

export default VectorialDataSwitchers;
