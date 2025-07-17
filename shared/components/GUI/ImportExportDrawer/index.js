import { memo, useState } from 'react';
import { Col, Drawer, Radio as RadioAntd, Row, Space } from 'antd';

import { useDispatch } from 'react-redux';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

import { t } from '@shared/i18n';
import { Button } from '@shared/components/GUI/Button';
import { Radio } from '@shared/components/GUI/Radio';

import useStyles from './styles';
import { IMPORT_EXPORT_STATE, IMPORT_EXPORT_TYPES } from '@shared/components/GUI/constants';
import { PureTable } from '@shared/components/GUI/PureTable';
import { getFormattedCSVExample } from '@shared/components/GUI/utils';
import { Dragger } from '@shared/components/GUI/Dragger';
import { getBase64 } from '@shared/utils/common';

export const ImportExportDrawer = memo(function ImportExportDrawer({
  visible,
  onClose,
  importExportOptions,
  onImport,
  exampleCsvDownloader,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [actionType, setActionType] = useState(null);
  const [dispatchItem, setDispatchItem] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [exampleCSVFile, setExampleCSVFile] = useState({});
  const [fileList, setFileList] = useState([]);
  const [state, setState] = useState(IMPORT_EXPORT_STATE.INITIAL);
  const [activeAccept, setActiveAccept] = useState();

  const handleChange = (action, type, example, key, index) => {
    setActionType(type);
    setDispatchItem(action);
    setExampleCSVFile(example || {});
    setSelectedValue(key);
    if (actionType === IMPORT_EXPORT_TYPES.IMPORT) {
      setActiveAccept((importExportOptions[index].accept ?? []).join(','));
    }
  };

  const handleClose = () => {
    setActionType(null);
    setDispatchItem(null);
    setSelectedValue(null);
    setExampleCSVFile({});
    setFileList([]);
    setState(IMPORT_EXPORT_STATE.INITIAL);
    onClose();
  };

  const handleExport = () => {
    dispatch(dispatchItem);
    handleClose();
  };

  const handleNext = () => {
    setState(IMPORT_EXPORT_STATE.IMPORT_FILE);
  };

  const handlePrevious = () => {
    setState(IMPORT_EXPORT_STATE.INITIAL);
  };

  const { columns, data } = getFormattedCSVExample(exampleCSVFile);

  const handleImport = () => {
    getBase64(fileList?.[0], loadedBase64File => {
      onImport(loadedBase64File, selectedValue);
      handleClose();
    });
  };

  return (
    <Drawer
      title={t('CUSTOM_ELEMENTS.TITLE.IMPORT_EXPORT')}
      placement="bottom"
      height="80vh"
      closable={false}
      zIndex={SIDEBAR_Z_INDEX + 1}
      visible={visible}
      onClose={handleClose}
      destroyOnClose
      extra={(
        <Space>
          <Button
            onClick={handleClose}
            size="small"
            color="secondary"
          >{t('CANCEL')}
          </Button>
          {actionType === IMPORT_EXPORT_TYPES.EXPORT && (
          <Button size="small" onClick={handleExport}>
            {t('EXPORT_EXCEL')}
          </Button>
          )}
          {actionType === IMPORT_EXPORT_TYPES.IMPORT && state === IMPORT_EXPORT_STATE.INITIAL && (
            <Button size="small" color="default" type="link" onClick={handleNext}>
              {t('NEXT')}
            </Button>
          )}
          {actionType === IMPORT_EXPORT_TYPES.IMPORT && state === IMPORT_EXPORT_STATE.IMPORT_FILE && (
            <>
              <Button size="small" color="default" type="link" onClick={handlePrevious}>
                {t('PREV')}
              </Button>
              {fileList?.length ? (
                <Button size="small" onClick={handleImport}>
                  {t('IMPORT_EXCEL')}
                </Button>
              ) : null}
            </>
          )}
        </Space>
      )}
    >
      {state === IMPORT_EXPORT_STATE.INITIAL && (
      <RadioAntd.Group className={classes.group} defaultValue={selectedValue}>
        {importExportOptions?.map(({ key, type, title, explanation, action, example }, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div role="button" tabIndex={0} key={key} className={classes.option} onClick={() => handleChange(action, type, example, key, index)}>
            <Radio value={key}>
              {title}
              <div className={classes.explanation}>{explanation}</div>
            </Radio>
          </div>
        ))}
      </RadioAntd.Group>
      )}
      {state === IMPORT_EXPORT_STATE.IMPORT_FILE && (
      <Row gutter={[16, 16]}>
        {exampleCsvDownloader && (
          <Col>
            {exampleCsvDownloader(selectedValue)}
          </Col>
        ) }
        {!exampleCsvDownloader && (
        <Col xs={24}>
          <PureTable columns={columns} data={data} />
        </Col>
        ) }
        <Col xs={24}>
          <Dragger fileList={fileList} setFileList={setFileList} accept={activeAccept} />
        </Col>
      </Row>
      )}
    </Drawer>
  );
});
