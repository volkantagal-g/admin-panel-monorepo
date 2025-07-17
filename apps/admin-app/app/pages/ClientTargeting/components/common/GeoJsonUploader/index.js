import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../../redux/actions';
import { validateGeoJson } from '../../../utils';
import { clientListSections } from '../../../constants';

import useStyles from './styles';

const { Text } = Typography;

const GeoJsonUploader = ({ activeKey, value }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const inputRef = useRef(null);

  const handleChange = event => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    const selectedFile = event.target.files[0];
    const message = t('ERR_CHECK_FILE');

    if (!selectedFile.size) {
      handleClearInput();
      return dispatch(ToastCreators.error({ message }));
    }

    fileReader.onload = e => {
      try {
        const geoJson = validateGeoJson(e.target.result);
        dispatch(Creators.setGeoJson({ activeKey, geoJson }));

        const sectionName = activeKey.split('.')[0];

        dispatch(Creators.setInput({ activeKey, clientListKey: 'cities', value: [] }));
        if (sectionName === clientListSections.getirFoodServiceDetail) {
          dispatch(Creators.setInput({ activeKey, clientListKey: 'chainRestaurants', value: [] }));
          dispatch(Creators.setInput({ activeKey, clientListKey: 'restaurants', value: [] }));
          dispatch(Creators.setInput({ activeKey, clientListKey: 'importedRestaurants', value: [] }));
          dispatch(Creators.setInput({ activeKey, clientListKey: 'isChainSelected', value: false }));
        }
        else {
          dispatch(Creators.setInput({ activeKey, clientListKey: 'warehouses', value: [] }));
          dispatch(Creators.setInput({ activeKey, clientListKey: 'selectableWarehouses', value: [] }));
        }
      }
      catch ({ message }) {
        handleClearInput();
        dispatch(ToastCreators.error({ message }));
      }
    };

    return null;
  };

  const handleClearInput = () => {
    const geoJson = null;
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    dispatch(Creators.setGeoJson({ activeKey, geoJson }));
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>Geo JSON</Text>
      <div className={classes.inputContainer}>
        {value ? (
          <Text className={classes.fullWidth} key="uploadedText">
            {t('FILE_UPLOADED')}
          </Text>
        ) : (
          <input ref={inputRef} type="file" key="hiddenInput" onChange={handleChange} />
        )}
        <Button className={classes.closeButton} onClick={handleClearInput} disabled={!value} key="uploadButton">
          <CloseOutlined />
        </Button>
      </div>
    </Space>
  );
};

export default GeoJsonUploader;
