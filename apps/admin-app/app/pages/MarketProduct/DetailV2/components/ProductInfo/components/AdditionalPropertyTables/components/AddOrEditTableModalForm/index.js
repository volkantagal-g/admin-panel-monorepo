import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Col, Form, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, set, uniqueId, unset } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { arrayMove } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validationSchema, getInitialValues, getColumns, hasAnySectionWithEmptyItemsList, ADDITIONAL_PROPERTY_TABLE_PRE_ROW_ID } from './formHelper';
import { validate } from '@shared/yup';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Modal, Button, EditSaveCancelButtons, MultiLanguageInput, Select, TableDraggable } from '@shared/components/GUI';
import AddOrEditSectionModalForm from '../AddOrEditSectionModalForm';
import { getSubtitleOptions } from '../AdditionalPropertyTable/formHelper';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import edit from '@shared/assets/GUI/Icons/Solid/EditPurple.svg';
import add from '@shared/assets/GUI/Icons/Solid/Add.svg';
import addPurple from '@shared/assets/GUI/Icons/Solid/AddPurple.svg';
import trash from '@shared/assets/GUI/Icons/Solid/Trash.svg';
import { FORM_MODE } from '@shared/shared/constants';
import useStyles from './styles';
import { usePrevious } from '@shared/hooks';

const AddOrEditTableModalForm = memo(({ onCancel, params, subtitleIndex, onRequestCompletion }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const classes = useStyles();

  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const isPrevUpdatePending = usePrevious(isUpdatePending);
  const selectedLanguage = useSelector(getSelectedLanguage);
  const [saveTooltipVisible, setSaveTooltipVisible] = useState(false);
  const [sectionDeleteConfirmationModal, sectionDeleteConfirmationModalContext] = Modal.useModal();
  const [itemDeleteConfirmationModal, itemDeleteConfirmationModalContext] = Modal.useModal();

  const [sectionModalParams, setSectionModalParams] = useState({ mode: FORM_MODE.ADD });
  const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
  const selectedCountryLanguages = useMemo(() => getSelectedCountryLanguages(), []);
  const initialValues = useMemo(() => ({
    ...getInitialValues(params.table),
    subtitleIndex,
  }), [params.table, subtitleIndex]);

  const onSubmit = formData => {
    const values = { ...formData };

    if (hasAnySectionWithEmptyItemsList(values)) {
      setSaveTooltipVisible(true);
      return;
    }

    setSaveTooltipVisible(false);
    unset(values, 'subtitleIndex');

    const allAdditionalPropertyTables = marketProduct.additionalPropertyTables
      ? [...marketProduct.additionalPropertyTables]
      : [];

    if (params.mode === FORM_MODE.EDIT) {
      allAdditionalPropertyTables[params.table.index] = values;
    }
    else {
      const newIndex = allAdditionalPropertyTables.length;
      allAdditionalPropertyTables.push({ ...values, index: newIndex });
    }

    allAdditionalPropertyTables
      .forEach(table => table.sections
        .forEach(section => section.items
          .forEach(item => unset(item, 'rowId'))));

    dispatch(
      Creators.updateMarketProductRequest({
        id: get(marketProduct, '_id'),
        body: { additionalPropertyTables: allAdditionalPropertyTables },
      }),
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit,
  });

  const { handleSubmit, values, setValues, errors } = formik;

  // Purpose of this useEffect is to tell AdditionalPropertyTable component the last displayed subtitle
  // in the modal after an update request completes, so that it can also automatically display this subtitle
  useEffect(() => {
    if (isPrevUpdatePending && !isUpdatePending && !isGetPending) {
      onRequestCompletion(values.subtitleIndex);
    }
  }, [isPrevUpdatePending, isUpdatePending, values.subtitleIndex, isGetPending, onRequestCompletion]);

  const isMaxSectionLengthReached = values.sections.length >= 2;

  const tableData = useMemo(() => {
    return (values.sections[values.subtitleIndex]?.items ?? [])
      .map(sectionItem => ({ ...sectionItem, errors }));
  }, [values, errors]);

  const modalTitle =
    params.mode === FORM_MODE.EDIT
      ? t('ADDITIONAL_PROPERTY_INFO.EDIT_TABLE')
      : t('ADDITIONAL_PROPERTY_INFO.NEW_TABLE');

  const onDragEnd = useCallback(({ active, over }) => {
    setValues(prevValues => {
      const { sections } = prevValues;
      const { items } = sections[values.subtitleIndex];

      const activeIndex = items.findIndex(i => i.rowId === active.id);
      const overIndex = items.findIndex(i => i.rowId === over?.id);

      sections[values.subtitleIndex].items = arrayMove(items, activeIndex, overIndex)
        .map((item, index) => ({ ...item, index }));

      return {
        ...prevValues,
        sections,
      };
    });
  }, [setValues, values.subtitleIndex]);

  const addRow = useCallback(() => {
    if (values.subtitleIndex === undefined) return;

    setValues(prevValues => {
      const { sections } = prevValues;

      const rowData = {
        index: sections[values.subtitleIndex].items.length,
        name: {},
        value: {},
        unit: {},
      };

      getSelectedCountryLanguages().forEach(lang => {
        rowData.name[lang] = '';
        rowData.value[lang] = '';
        rowData.unit[lang] = '';
        rowData.rowId = uniqueId(ADDITIONAL_PROPERTY_TABLE_PRE_ROW_ID);
      });

      sections[values.subtitleIndex].items.push(rowData);

      return {
        ...prevValues,
        sections,
      };
    });
  }, [values.subtitleIndex, setValues]);

  const deleteRow = useCallback(index => {
    const modalConfig = {
      content: (
        <>
          {t('ADDITIONAL_PROPERTY_INFO.DELETE_ROW_CONFIRMATION')}
        </>
      ),
      icon: null,
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      onOk: () => {
        setValues(prevValues => {
          const { sections } = prevValues;

          sections[values.subtitleIndex].items = sections[values.subtitleIndex].items
            .toSpliced(index, 1)
            .map((item, i) => ({ ...item, index: i }));

          return {
            ...prevValues,
            sections,
          };
        });
      },
      centered: true,
    };
    itemDeleteConfirmationModal.confirm(modalConfig);
  }, [setValues, values.subtitleIndex, t, itemDeleteConfirmationModal]);

  const handleCellValueChange = useCallback(({ value, fieldPath, index }) => {
    setValues(prevValues => {
      const { sections } = prevValues;

      if (fieldPath.includes('name')) {
        set(sections[values.subtitleIndex].items[index], fieldPath, value);
      }
      // Even though the UI shows value and unit columns in one language, backend still needs these
      // values as multilanuage, so we converted these values to multilanguage
      else {
        const [field] = fieldPath.split('.');
        selectedCountryLanguages.forEach(lang => {
          set(sections[values.subtitleIndex].items[index], `${[field]}.${lang}`, value);
        });
      }
      return {
        ...prevValues,
        sections,
      };
    });
  }, [setValues, values.subtitleIndex, selectedCountryLanguages]);

  const columns = useMemo(() => getColumns({
    subtitleIndex: values.subtitleIndex,
    translate: t,
    selectedLanguage,
    onCellChange: handleCellValueChange,
    onRowDelete: deleteRow,
  }), [selectedLanguage, t, values.subtitleIndex, deleteRow, handleCellValueChange]);

  const openSectionModal = sectionParams => {
    return () => {
      setIsSectionModalVisible(true);
      setSectionModalParams(sectionParams);
    };
  };

  const handleSectionModalCancel = () => {
    setIsSectionModalVisible(false);
  };

  const handleSectionModalOk = titles => {
    if (sectionModalParams.mode === FORM_MODE.ADD) {
      setValues(prevValues => {
        const sections = [...prevValues.sections, {
          title: titles,
          index: prevValues.sections.length,
          items: [],
        }];

        return {
          ...prevValues,
          sections,
          subtitleIndex: sections.length - 1,
        };
      });
    }
    else {
      setValues(prevValues => {
        const { sections } = prevValues;
        sections[values.subtitleIndex].title = titles;

        return {
          ...prevValues,
          sections,
        };
      });
    }
    setIsSectionModalVisible(false);
  };

  const deleteSubtitle = useCallback(() => {
    const modalConfig = {
      content: (
        <>
          {t('ADDITIONAL_PROPERTY_INFO.DELETE_SUBTITLE_CONFIRMATION')}
        </>
      ),
      icon: null,
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      onOk: () => {
        setValues(prevValues => {
          const { sections } = prevValues;

          sections.splice(prevValues.subtitleIndex, 1);

          if (sections.length) {
            sections[0].index = 0;
          }

          return {
            ...prevValues,
            sections,
            subtitleIndex: sections.length ? 0 : undefined,
          };
        });
      },
      centered: true,
    };
    sectionDeleteConfirmationModal.confirm(modalConfig);
  }, [setValues, sectionDeleteConfirmationModal, t]);

  return (
    <Modal
      title={modalTitle}
      visible
      width={900}
      onCancel={onCancel}
      footer={(
        <Tooltip placement="topRight" title={saveTooltipVisible ? t('ADDITIONAL_PROPERTY_INFO.NO_EMPTY_SECTIONS') : ''}>
          <div>
            <EditSaveCancelButtons
              disabled={isUpdatePending}
              htmlType="submit"
              isFormEditable
              loading={isUpdatePending}
              onCancelClick={onCancel}
              onSaveClick={handleSubmit}
              // to reset the padding top of this component
              containerClassName={null}
            />
          </div>
        </Tooltip>
      )}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <MultiLanguageInput
          className="mb-3"
          label={t('global:TITLE1')}
          fieldPath={['title']}
          formik={formik}
        />
        <Row gutter={16} className="mb-3" align="middle">
          <Col xs={24} md={12} lg={8}>
            <Select
              name="subtitleIndex"
              errors={errors}
              label={t('ADDITIONAL_PROPERTY_INFO.SUBTITLE')}
              value={values.subtitleIndex}
              optionsData={getSubtitleOptions(values.sections, selectedLanguage)}
              onChange={index => setValues({ ...values, subtitleIndex: index })}
            />
          </Col>
          <Col xs={24} md={12} lg={16}>
            <Row wrap>
              {values.subtitleIndex !== undefined && (
                <label
                  role="presentation"
                  className="mr-4 pointer"
                  onClick={() => openSectionModal({
                    mode: FORM_MODE.EDIT,
                    sectionData: { title: values.sections[values.subtitleIndex].title },
                  })()}
                >
                  <img className="mr-2" src={edit} alt="edit-icon" />
                  <span>{t('ADDITIONAL_PROPERTY_INFO.EDIT_SUBTITLE')}</span>
                </label>
              )}
              <label
                role="presentation"
                className="mr-4 pointer"
                onClick={() => !isMaxSectionLengthReached && openSectionModal({ mode: FORM_MODE.ADD })()}
              >
                <Tooltip placement="bottomRight" title={isMaxSectionLengthReached ? t('ADDITIONAL_PROPERTY_INFO.MAX_2_SECTIONS') : ''}>
                  <img className="mr-2" src={addPurple} alt="add-icon" />
                  <span>{t('ADDITIONAL_PROPERTY_INFO.ADD_SUBTITLE')}</span>
                </Tooltip>
              </label>
              <label
                role="presentation"
                className="pointer"
                onClick={deleteSubtitle}
              >
                <img className="mr-2" src={trash} alt="delete-icon" />
                <span>{t('ADDITIONAL_PROPERTY_INFO.DELETE_SUBTITLE')}</span>
              </label>
            </Row>
          </Col>
        </Row>
        <div className={`${classes.noValidationErrorMessage} mb-3`}>
          <TableDraggable
            rowKey="rowId"
            onDragEnd={onDragEnd}
            columns={columns}
            data={tableData}
          />
        </div>
        <Button
          size="small"
          onClick={addRow}
          icon={(<img src={add} alt="add-icon" />)}
        >
          {t('ADDITIONAL_PROPERTY_INFO.ADD_ROW')}
        </Button>
      </Form>
      {isSectionModalVisible && (
        <AddOrEditSectionModalForm
          params={sectionModalParams}
          onOk={handleSectionModalOk}
          onCancel={handleSectionModalCancel}
        />
      )}
      {itemDeleteConfirmationModalContext}
      {sectionDeleteConfirmationModalContext}
    </Modal>
  );
});

export default AddOrEditTableModalForm;

AddOrEditTableModalForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onRequestCompletion: PropTypes.func,
  subtitleIndex: PropTypes.number,
  params: PropTypes.shape({
    table: PropTypes.shape({}),
    mode: PropTypes.oneOf([FORM_MODE.ADD, FORM_MODE.EDIT]).isRequired,
  }).isRequired,
};

AddOrEditTableModalForm.defaultProps = {
  onRequestCompletion: () => {},
  subtitleIndex: undefined,
};
