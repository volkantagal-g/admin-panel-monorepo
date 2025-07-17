import { useSelector } from 'react-redux';
import { useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'antd';

import { Table, Select } from '@shared/components/GUI';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { getColumns, getSubtitleOptions } from './formHelper';
import edit from '@shared/assets/GUI/Icons/Solid/EditPurple.svg';
import copy from '@shared/assets/GUI/Icons/Solid/Copy.svg';
import trash from '@shared/assets/GUI/Icons/Solid/Trash.svg';
import AddOrEditTableModalForm from '../AddOrEditTableModalForm';
import { FORM_MODE } from '@shared/shared/constants';
import useStyles from './styles';

const AdditionalPropertyTable = memo(({ table, onDeleteClick }) => {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();

  const selectedLanguage = useSelector(getSelectedLanguage);

  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [tableModalParams, setTableModalParams] = useState({ mode: FORM_MODE.ADD });

  const openTableModal = params => () => {
    setIsTableModalVisible(true);
    setTableModalParams(params);
  };

  const handleTableModalCancel = useCallback(() => setIsTableModalVisible(false), []);

  const handleTableModalRequestCompletion = useCallback(lastSelectedSubtitleIndexInModal => {
    setSubtitleIndex(lastSelectedSubtitleIndexInModal);
    setIsTableModalVisible(false);
  }, []);

  return (
    <div className="mb-4">
      <Row className={`${classes.tableName} mb-3`}>{table.title?.[selectedLanguage]}</Row>
      <Row className="mb-4">
        <label
          role="presentation"
          className="mr-4 pointer"
          onClick={openTableModal({ mode: FORM_MODE.EDIT, table })}
        >
          <img className="mr-2" src={edit} alt="edit-icon" />
          <span>{t('ADDITIONAL_PROPERTY_INFO.EDIT_TABLE')}</span>
        </label>
        <label
          role="presentation"
          className="mr-4 pointer"
          onClick={() => onDeleteClick(table.index)}
        >
          <img className="mr-2" src={trash} alt="trash-icon" />
          <span>{t('ADDITIONAL_PROPERTY_INFO.DELETE_TABLE')}</span>
        </label>
        <label
          role="presentation"
          className="pointer"
          onClick={openTableModal({ mode: FORM_MODE.ADD, table })}
        >
          <img className="mr-2" src={copy} alt="copy-icon" />
          <span>{t('ADDITIONAL_PROPERTY_INFO.COPY_TABLE')}</span>
        </label>
      </Row>
      <Row className="mb-3">
        <Select
          label={t('ADDITIONAL_PROPERTY_INFO.SUBTITLE')}
          value={subtitleIndex}
          optionsData={getSubtitleOptions(table.sections, selectedLanguage)}
          onChange={index => setSubtitleIndex(index)}
          disabled={false}
        />
      </Row>
      <Table
        columns={getColumns(t, selectedLanguage)}
        data={table.sections[subtitleIndex]?.items ?? []}
      />
      {isTableModalVisible && (
        <AddOrEditTableModalForm
          subtitleIndex={subtitleIndex}
          params={tableModalParams}
          onCancel={handleTableModalCancel}
          onRequestCompletion={handleTableModalRequestCompletion}
        />
      )}
    </div>
  );
});

export default AdditionalPropertyTable;
