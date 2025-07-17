import { useRef, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';

export default function ClientListImporter() {
  const { t } = useTranslation('clientListDoubleCheckerPage');
  const dispatch = useDispatch();
  const classes = useStyles();

  const [file, setFile] = useState(null);

  const inputRef = useRef();

  const handleOpenDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = e => {
    const fileTemp = e.target.files[0];
    if (fileTemp.size === 0) {
      handleOnError(t('WARNINGS.NO_DATA'));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      handleOnDataLoad(data, fileTemp);
    };

    reader.onerror = handleOnError;
    reader.readAsDataURL(fileTemp);
  };

  const handleOnDataLoad = (data, fileTemp) => {
    setFile(fileTemp);
    dispatch(Creators.setCsvFileName({ csvFileName: fileTemp.name }));
    dispatch(Creators.setCsvData({ csvData: { data, type: fileTemp.type } }));
    dispatch(ToastCreators.success({ message: t('READY_TO_IMPORT') }));
  };

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(null);
      dispatch(Creators.setCsvFileName({ csvFileName: '' }));
      dispatch(Creators.setCsvData({ csvData: null }));
    }
  };

  return (
    <div>
      <input
        key="0"
        ref={inputRef}
        type="file"
        name="csvInput"
        id="csvInput"
        className={classes.fileInput}
        onChange={handleFileChange}
        accept="text/csv, .csv"
      />
      <div key="1" className={classes.wrapper}>
        <Button type="dashed" onClick={handleOpenDialog} size="large">
          {t('global:SELECT_FILE')}
        </Button>
        <input type="text" readOnly value={file ? file.name : ''} className={classes.fileName} />
        <Button danger onClick={handleRemoveFile}>
          {t('global:REMOVE')}
        </Button>
      </div>
    </div>
  );
}
