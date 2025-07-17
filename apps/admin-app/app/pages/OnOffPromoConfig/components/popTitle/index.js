import { Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import { CONFIG_PARAMETERS as configParameters } from '../../constants';
import useStyles from '../../styles';

const PopTitle = ({ changedWarehouses, configToggle }) => {
  const classes = useStyles();
  const { t } = useTranslation('onOffPage');

  const popDict = {};
  const countryList = [];
  const cityLists = [];

  changedWarehouses.map(warehouse => {
    popDict[warehouse.warehouse] =
      `${warehouse.config} to ${configParameters[configToggle]}`;
    if (!countryList.includes(warehouse.country)) {
      countryList.push(warehouse.country);
    }
    if (!cityLists.includes(warehouse.city)) {
      cityLists.push(warehouse.city);
    }
    return (popDict, countryList, cityLists);
  });

  return (
    <Row
      container
      justifyContent="center"
      direction="column"
      className={classes.poptitleGridContainer}
    >
      <Col className={classes.poptitleGridItemFirstChild} span={24}>
        {t('THERE_ARE_N_WAREHOUSES_YOU_WANT_TO_CHANGE', { count: changedWarehouses.length })}
      </Col>
      <Col className={classes.poptitleGridItemSecondChild} span={24}>
        {t('ARE_YOU_SURE_CHANGE_WAREHOUSE')}
      </Col>
      <Col className={classes.poptitleGridItemThirdChild} span={24}>
        <span className={classes.poptitleSpanEffected}>
          {t('EFFECTED_COUNTRIES')}
        </span>
        {countryList.map(country => (
          <span>{country}, </span>
        ))}
      </Col>
      <Col className={classes.onoffPopconfirmBox} span={24}>
        <span className={classes.specialEffected}>{t('EFFECTED_CITIES')}</span>
        {cityLists.map(city => (
          <span className={classes.cityListsSpan}>{city}, </span>
        ))}
      </Col>
      <Col spacing={1} className={classes.onoffPopconfirmBox} span={24}>
        {Object.entries(popDict).map(([key, value]) => (
          <Row container item key={uuidv4()} justifyContent="flex-start">
            <Row className={classes.poptitleSpanEffected} span={8} sm={4}>
              {key} :
            </Row>
            <Row span={8} sm={4} className={classes.effectedCitiesList}>
              {' '}
              {value}
            </Row>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export default PopTitle;
