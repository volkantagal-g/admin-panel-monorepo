import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { useTheme } from 'react-jss';

import {
  Button,
  Modal,
  Switch,
  Search,
  Table,
} from '@shared/components/GUI';
import { getColumns } from './config';
import { getMarketProductTagsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import AddOrEditTagModalForm from '../AddOrEditTagModalForm';
import { FORM_MODE } from '@shared/shared/constants';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import add from '@shared/assets/GUI/Icons/Solid/Add.svg';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useConfirmationModal from '@app/pages/MarketProduct/DetailV2/hooks/useConfirmationModal';

const DescriptionTagsModal = memo(({ onCancel, formTags, onOk }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  // TODO: we should optimize this, we are currently fetching and showing all of them:
  const tagsList = useSelector(getMarketProductTagsSelector.getData);
  const isLoading = useSelector(getMarketProductTagsSelector.getIsPending);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const classes = useStyles();
  const [isShowingCheckedOnly, setIsShowingCheckedOnly] = useState(false);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [tagModalParams, setTagModalParams] = useState({ mode: FORM_MODE.ADD });
  const selectedLanguage = useSelector(getSelectedLanguage);
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState(formTags?.map(tag => tag.value));
  const langKey = getLangKey();
  // const [deletionModal, deletionModalContext] = Modal.useModal();
  const [showDeleteModal, deletionConfirmationModal] = useConfirmationModal();

  const tagsListOrdered = useMemo(() => {
    const selectedTagIdsSet = new Set(selectedRowKeys);

    return [
      ...tagsList.filter(tag => selectedTagIdsSet.has(tag._id)),
      ...tagsList.filter(tag => !selectedTagIdsSet.has(tag._id)),
    ];
  }, [selectedRowKeys, tagsList]);

  useEffect(() => {
    const selectedTagIdsSet = new Set(selectedRowKeys);

    const tagList = isShowingCheckedOnly
      ? tagsListOrdered.filter(tag => selectedTagIdsSet.has(tag._id))
      : tagsListOrdered;

    if (!debouncedSearchText) {
      setTableData(tagList.map(tag => ({ ...tag })));

      return;
    }

    const searchTerm = `name.${selectedLanguage}`;
    const key = '_id';
    setTableData(tagList
      .filter(tag => getSelectFilterOption(debouncedSearchText, tag, true, searchTerm, key))
      .map(tag => ({ ...tag })));
  }, [tagsListOrdered, debouncedSearchText, selectedLanguage, formTags, isShowingCheckedOnly, selectedRowKeys]);

  const openAddTagModal = useCallback(() => {
    setIsTagModalVisible(true);
    setTagModalParams({ mode: FORM_MODE.ADD });
  }, []);

  const openEditTagModal = useCallback(tag => {
    setIsTagModalVisible(true);
    setTagModalParams({ mode: FORM_MODE.EDIT, tagId: tag._id });
  }, []);

  const handleSelect = useCallback((record, isChecked) => {
    let keys = [...selectedRowKeys];
    if (isChecked) {
      keys = [...selectedRowKeys, record?._id];
    }
    else {
      keys = keys.filter(key => key !== record?._id);
    }

    setSelectedRowKeys(keys);
  }, [selectedRowKeys, setSelectedRowKeys]);

  const deleteTag = useCallback(tagId => {
    showDeleteModal({
      message: t('DETAILS_INFO.DELETE_TAG_CONFIRMATION'),
      onOk: () => {
        handleSelect({ _id: tagId }, false);
        dispatch(Creators.deleteMarketProductTagRequest({ tagId }));
      },
      okText: t('button:YES'),
      cancelText: t('button:NO'),
    });
  }, [dispatch, showDeleteModal, handleSelect, t]);

  const handleTagModalCancel = () => {
    setIsTagModalVisible(false);
  };

  const columns = useMemo(
    () => getColumns({
      language: selectedLanguage,
      handleEdit: openEditTagModal,
      handleRemove: deleteTag,
      translate: t,
    }),
    [openEditTagModal, deleteTag, selectedLanguage, t],
  );

  const handleOkClick = () => {
    const tagsMap = createMap(tagsList);
    const sTags = selectedRowKeys.map(id => {
      return {
        value: id,
        label: tagsMap?.[id]?.name?.[langKey],
      };
    });
    onOk(sTags);
  };

  const rowSelection = useMemo(() => ({
    type: 'checkbox',
    selectedRowKeys,
    onSelect: handleSelect,
  }), [selectedRowKeys, handleSelect]);

  return (
    <Modal title={t('DETAILS_INFO.DESCRIPTION_TAGS')} visible onCancel={onCancel} onOk={handleOkClick}>
      <Row gutter={[theme.spacing(3), theme.spacing(3)]} className="mt-2">
        <Col span={24}>
          <Search onChange={e => setSearchText(e.target.value)} />
        </Col>
        <Col span={24}>
          <div className={classes.tableContainer}>
            <Table
              loading={isLoading}
              rowKey="_id"
              columns={columns}
              data={tableData}
              rowSelection={rowSelection}
              scroll={{ y: 500 }}
            />
          </div>
        </Col>
      </Row>
      <Row justify="end" align="middle" className="mt-3">
        <span className="mr-2">{t('DETAILS_INFO.SHOW_SELECTED_ONLY')}</span>
        <span className="mr-3">
          <Switch
            checked={isShowingCheckedOnly}
            onChange={val => setIsShowingCheckedOnly(val)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
        </span>
        <Button
          size="small"
          icon={(<img src={add} alt="add-icon" />)}
          onClick={openAddTagModal}
        >
          {t('DETAILS_INFO.NEW_TAG')}
        </Button>
      </Row>
      <AddOrEditTagModalForm
        params={tagModalParams}
        visible={isTagModalVisible}
        onCancel={handleTagModalCancel}
        onAfterClose={() => setIsTagModalVisible(false)}
      />
      {deletionConfirmationModal}
    </Modal>
  );
});

export default DescriptionTagsModal;

DescriptionTagsModal.propTypes = {
  ...Modal.propTypes,
  formTags: PropTypes.arrayOf(PropTypes.string),
};

DescriptionTagsModal.defaultProps = {
  ...Modal.defaultProps,
  formTags: [],
};
