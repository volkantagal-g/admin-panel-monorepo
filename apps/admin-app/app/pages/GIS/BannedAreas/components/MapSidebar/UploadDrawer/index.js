import { Button, Divider, Drawer } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';

import { useTranslation } from 'react-i18next';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '@app/pages/GIS/BannedAreas/redux/actions';

import useStyles from './styles';
import { validateGeoJSON } from '../../../utils/helper';

function UplaoadDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [geoJSON, setGeoJSON] = useState('');

  const { t } = useTranslation('gisBannedAreasPage');

  const handleGeoJSONChange = event => {
    const tempValue = event.target.value;
    setGeoJSON(tempValue);
  };

  const handleGeoJSONAddButtonClick = () => {
    try {
      if (!geoJSON.length) {
        setIsDrawerOpen(false);
        return;
      }
      const tempGeojson = validateGeoJSON(geoJSON, t);
      const tempGeom = tempGeojson.features;

      dispatch(Creators.setGeometry({ geometry: tempGeom }));
      dispatch(Creators.setTempGeoJson({ tempGeoJson: tempGeojson }));
      setIsDrawerOpen(false);
      setGeoJSON('');
    }
    catch ({ message }) {
      dispatch(ToastCreators.error({ message }));
    }
  };

  const showDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      className={classes.drawerWrapper}
      mask={false}
      placement="right"
      closable
      maskClosable
      onClose={showDrawer}
      visible={isDrawerOpen}
      key="bottom"
    >
      <TextArea
        value={geoJSON}
        className={classes.jsonView}
        placeholder={t('GEOJSON_FIELD_NOTICE')}
        onChange={handleGeoJSONChange}
        autoSize={{ minRows: 30, maxRows: 32 }}
      />
      <Divider />
      <Button block type="primary" onClick={handleGeoJSONAddButtonClick}>
        {t('ADD_GEOJSON')}
      </Button>
    </Drawer>

  );
}

export default UplaoadDrawer;
