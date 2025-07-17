import { useCallback, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Button,
  Space,
  Select,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';

import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { fetchersSelector } from '../../redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import TagOption from '../TagOption';

const { Panel } = Collapse;
const { Text } = Typography;

const FetchData = () => {
  const { t } = useTranslation(['artisanOrderActivePage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedCity = useSelector(fetchersSelector.getCity);
  const cities = useSelector(getCitiesSelector.getData);

  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });

  const debouncedCitySelect = useMemo(() => debounce(city => {
    return dispatch(Creators.setCity({ city }));
  }, 100), [dispatch]);

  const citySelect = useCallback(city => {
    debouncedCitySelect(city);
  }, [debouncedCitySelect]);

  const debouncedFetchActiveOrders = useMemo(() => debounce(() => {
    return dispatch(Creators.getActivesRequest({ cityId: selectedCity }));
  }, 200), [dispatch, selectedCity]);

  const fetchActiveOrders = useCallback(() => {
    if (isEmpty(selectedCity)) {
      return dispatch(ToastCreators.error({ message: t('ERROR.NO_CITY') }));
    }
    return debouncedFetchActiveOrders();
  }, [debouncedFetchActiveOrders, dispatch, selectedCity, t]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FETCH_DATA')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('global:CITY')}</Text>
                  <Select
                    placeholder={t('FILTER.CITY_DESC')}
                    className={classes.fetchSelect}
                    onChange={citySelect}
                    showArrow
                    allowClear
                  >
                    {cityList}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Button type="primary" onClick={fetchActiveOrders}>
                  {t('global:FETCH_DATA')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default FetchData;
