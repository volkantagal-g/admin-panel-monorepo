import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button as AntButton, Modal, Tabs, Collapse, Radio, Checkbox } from 'antd';

import {
  ImportOutlined,
  ExportOutlined,
  LeftOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components/GUI/Button';

import { MIME_TYPE } from '@shared/shared/constants';

import { Dragger } from '@shared/components/GUI/Dragger';
import { getExampleImportUpdate, getExampleImportCreate } from './constants';
import { generateExcel } from './excel';
import { Creators } from '../../redux/actions';
import { getBase64 } from '@shared/utils/common';
import useStyles from './styles';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const ImportExportButton = () => {
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const dispatch = useDispatch();
  const classes = useStyles();

  const tabKeys = {
    import: 'import',
    export: 'export',
  };

  const importActionKey = {
    create: 'create',
    update: 'update',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

  const [value, setValue] = useState('L1');

  const [activeTab, setActiveTab] = useState(tabKeys.import);
  const [activeImportAction, setActiveImportAction] = useState(
    importActionKey.create,
  );
  const checkOptions = ['L1', 'L2', 'L3', 'L4'];
  const defaultCheckedList = ['L1', 'L2', 'L3', 'L4'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  const [fileList, setFileList] = useState([]);

  const handleJsonToCsv = () => {
    if (
      activeTab === tabKeys.import &&
      activeImportAction === importActionKey.create
    ) {
      generateExcel(
        [getExampleImportCreate(value, countryCode)],
        `example_master_category_create_${value}`,
      );
    }
    if (
      activeTab === tabKeys.import &&
      activeImportAction === importActionKey.update
    ) {
      generateExcel(
        [getExampleImportUpdate(checkedList)],
        `example_master_category_update_${checkedList.join('_')}`,
      );
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsNextModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsNextModalOpen(false);

    setActiveTab(tabKeys.import);
    setActiveImportAction(importActionKey.create);
    setValue('L1');
    setCheckedList(defaultCheckedList);
    setIndeterminate(false);
    setCheckAll(true);
    setFileList([]);
  };

  const handleNext = () => {
    setIsModalOpen(false);
    setIsNextModalOpen(true);
  };

  const handleSample = () => {
    handleJsonToCsv();
  };

  const handleExport = () => {
    dispatch(Creators.exportMasterCategoryRequest({ levels: checkedList }));
    handleCancel();
  };

  const handleBack = () => {
    setIsModalOpen(true);
    setIsNextModalOpen(false);
    setFileList([]);
  };

  const handleImport = () => {
    getBase64(fileList?.[0], loadedBase64File => {
      if (activeImportAction === importActionKey.create) {
        dispatch(
          Creators.importCreateMasterCategoryRequest({ loadedFile: loadedBase64File }),
        );
      }
      if (activeImportAction === importActionKey.update) {
        dispatch(
          Creators.importUpdateMasterCategoryRequest({ loadedFile: loadedBase64File }),
        );
      }
      handleCancel();
    });
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  const onChangeCheckList = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < checkOptions.length);
    setCheckAll(list.length === checkOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? checkOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const disableGoNext = () => {
    if (!activeImportAction) {
      return true;
    }
    if (activeImportAction === importActionKey.update && !checkedList.length) {
      return true;
    }
    return false;
  };

  const disableExport = () => {
    if (activeTab === tabKeys.export && !checkedList.length) {
      return true;
    }
    return false;
  };

  const disabledImport = () => {
    if (!fileList.length) {
      return true;
    }
    return false;
  };

  return (
    <>
      <AntButton
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        {t('global:CUSTOM_ELEMENTS.TITLE.IMPORT_EXPORT')}
      </AntButton>

      <Modal
        title={t('global:CUSTOM_ELEMENTS.TITLE.IMPORT_EXPORT')}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <Button key="cancel" color="default" onClick={handleCancel}>
              {t('global:CANCEL')}
            </Button>
            {activeTab === tabKeys.import ? (
              <Button
                type="primary"
                key="next"
                onClick={handleNext}
                disabled={disableGoNext()}
              >
                {t('global:NEXT')}
              </Button>
            ) : null}
            {activeTab === tabKeys.export ? (
              <Button
                type="primary"
                key="export"
                onClick={handleExport}
                disabled={disableExport()}
              >
                {t('global:EXPORT_EXCEL')}
              </Button>
            ) : null}
          </>,
        ]}
      >
        <Tabs
          defaultActiveKey={tabKeys.import}
          onChange={activeKey => {
            setActiveTab(activeKey);
          }}
          activeKey={activeTab}
        >
          <Tabs.TabPane
            tab={(
              <>
                <ImportOutlined style={{ transform: 'rotate(90deg)' }} />
                {t('IMPORT')}
              </>
            )}
            key={tabKeys.import}
          >
            <Collapse
              accordion
              defaultActiveKey={[importActionKey.create]}
              activeKey={activeImportAction}
              onChange={activeAction => {
                setActiveImportAction(activeAction);
              }}
              expandIconPosition="right"
            >
              <Collapse.Panel
                header={<div className={classes.importHeader}>{t('MASTER_CATEGORY_CREATE')}</div>}
                key={importActionKey.create}
              >
                <p className={classes.importLevelsInfo}>{t('PRODUCT_MASTER_CATEGORY_LEVELS')} <InfoCircleOutlined /></p>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value="L1" key="L1">
                    L1
                  </Radio>
                  <Radio value="L2" key="L2">
                    L2
                  </Radio>
                  <Radio value="L3" key="L3">
                    L3
                  </Radio>
                  <Radio value="L4" key="L4">
                    L4
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>
              <Collapse.Panel
                header={<div className={classes.importHeader}>{t('MASTER_CATEGORY_UPDATE')}</div>}
                key={importActionKey.update}
              >
                <p className={classes.importLevelsInfo}>{t('PRODUCT_MASTER_CATEGORY_LEVELS')} <InfoCircleOutlined /></p>
                <Checkbox.Group
                  options={checkOptions}
                  value={checkedList}
                  onChange={onChangeCheckList}
                />
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  {t('SELECT_ALL')}
                </Checkbox>
              </Collapse.Panel>
            </Collapse>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={(
              <>
                <ExportOutlined style={{ transform: 'rotate(90deg)' }} />
                {t('EXPORT')}
              </>
            )}
            key={tabKeys.export}
          >
            <p className={classes.importLevelsInfo}>{t('PRODUCT_MASTER_CATEGORY_LEVELS')} <InfoCircleOutlined /></p>
            <Checkbox.Group
              options={checkOptions}
              value={checkedList}
              onChange={onChangeCheckList}
            />
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              {t('global:SELECT_ALL')}
            </Checkbox>
          </Tabs.TabPane>
        </Tabs>
      </Modal>

      <Modal
        title={t('global:IMPORT_EXCEL')}
        visible={isNextModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className={classes.importFooter}>
            <span>
              <Button key="example" color="default" onClick={handleSample}>
                {t('global:EXAMPLE_EXCEL')}
              </Button>
            </span>
            <span>
              <Button color="default" key="next" onClick={handleBack}>
                <LeftOutlined />
                {t('global:BACK')}
              </Button>

              <Button
                type="primary"
                key="import"
                onClick={handleImport}
                disabled={disabledImport()}
              >
                {t('global:IMPORT')}
              </Button>
            </span>
          </div>,
        ]}
      >
        <h6>
          {importActionKey.create === activeImportAction
            ? `${t('MASTER_CATEGORY_CREATE')} ${value}`
            : `${t('MASTER_CATEGORY_UPDATE')} ${checkedList.join(', ')}`}
        </h6>
        <Dragger
          fileList={fileList}
          setFileList={setFileList}
          accept={[MIME_TYPE.XLS, MIME_TYPE.XLSX]}
        />
      </Modal>
    </>
  );
};

export default ImportExportButton;
