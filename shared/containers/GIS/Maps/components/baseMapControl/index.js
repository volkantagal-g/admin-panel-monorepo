import { MenuOutlined } from '@ant-design/icons';
import { Card, Radio } from 'antd';
import { find } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { gisMapsSelector } from '../../redux/selectors';

import { MAP_TILES } from '../../utils/constants';

import useStyles from './styles';

const BaseMapControl = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('gisMap');
  const [isContentVisible, setIsContentVisible] = useState(false);
  const currentMapStyle = useSelector(gisMapsSelector.getMapStyle);

  const handleMouseOver = () => {
    setIsContentVisible(true);
  };
  const handleMouseOut = () => {
    setIsContentVisible(false);
  };
  const onBaseMapChange = e => {
    const { value } = e.target;
    const mapStyle = find(MAP_TILES, { title: value });
    dispatch(Creators.setMapStyle({ mapStyle }));
  };
  return (
    <Card
      className={classes.baseControl}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      data-testid="base-map-control"
    >
      {!isContentVisible ? <MenuOutlined />
        : (
          <Radio.Group onChange={onBaseMapChange} value={currentMapStyle.title || 'osm'}>
            <Radio value="osm">{t('BASE_LAYER_NAMES.OSM')}</Radio>
            <Radio value="esri">{t('BASE_LAYER_NAMES.ESRI_SATELLITE')}</Radio>
          </Radio.Group>
        )}
    </Card>
  );
};

export default BaseMapControl;
