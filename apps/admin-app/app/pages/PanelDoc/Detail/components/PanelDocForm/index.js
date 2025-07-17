import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button, Input, Select, Collapse, Spin, Card, Alert, Switch, Popconfirm } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link, Prompt } from 'react-router-dom';

import { getSelectFilterOption } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getUser } from '@shared/redux/selectors/auth';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

import {
  getInitialValues,
  getValidationSchema,
  manipulateValuesOnSubmit,
} from './formHelper';
import { panelDocByIdSelector, panelDocUpdateSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { EditFilesTable } from './EditFilesTable';
import { EditFaqTable } from './EditFaqTable';
import { getFilesColumns } from './tableConfig';
import { ROUTE } from '@app/routes';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import ContentEditor from '@shared/components/ContentEditor';

const { Panel } = Collapse;

const PanelDocForm = () => {
  const [form] = Form.useForm();

  const classes = useStyles();
  const { t } = useTranslation(['panelDocDetailPage']);
  const dispatch = useDispatch();

  const panelDocData = useSelector(panelDocByIdSelector.getData);
  const isPending = useSelector(panelDocByIdSelector.getIsPending);
  const isUpdatePending = useSelector(panelDocUpdateSelector.getIsPending);
  const components = panelDocData?.page?.components;

  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (!panelDocData) return;
    editorRef.current.setContents(panelDocData.content);
    // it expects panelDocData itself to be in the dependency list, but I only want this to update when the content changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelDocData?.content]);

  const isValidForActivation = useMemo(() => {
    const fakeTranslation = () => 'fake';
    const fakePanelDoc = { ...panelDocData, isActive: true };
    // validate against the schema as if it was active
    return getValidationSchema({ panelDocData: fakePanelDoc, t: fakeTranslation }).isValidSync(panelDocData);
  }, [panelDocData]);

  const handleHighlightStatusChange = value => {
    dispatch(Creators.panelDocUpdateHighlightRequest({ existingPanelDoc: panelDocData, isHighlighted: value }));
    AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, {
      button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.HIGHLIGHT_STATUS_CHANGED,
      isHighlighted: value,
    });
  };

  const handleActivenessStatusChange = value => {
    dispatch(Creators.panelDocUpdateActivenessRequest({ existingPanelDoc: panelDocData, isActive: value }));
    AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, {
      button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.DOCUMENT_ACTIVE_INACTIVE,
      isActive: value,
    });
  };

  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialValues = useMemo(() => getInitialValues({ panelDocData }), [panelDocData]);
  const validationSchema = useMemo(() => getValidationSchema({ panelDocData, t }), [panelDocData, t]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: values => {
      const updateFields = manipulateValuesOnSubmit(panelDocData, values);
      dispatch(Creators.panelDocUpdateRequest({ data: { existingPanelDoc: panelDocData, ...updateFields }, contentEditor: editorRef.current }));
      setIsFormEditable(false);
      AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.SAVE });
    },
  });

  const componentsOptions = useMemo(() => {
    return (components || []).map(comp => {
      return {
        value: comp._id,
        label: comp.name[getLangKey()],
      };
    });
  }, [components]);

  const { handleSubmit, values, touched, errors, setFieldValue, setFieldTouched, resetForm } = formik;

  function resetFormWrapped() {
    resetForm();
    form.resetFields();
    setIsFormEditable(false);
    AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.CANCEL });
  }

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  if (isPending) {
    return <Spin />;
  }

  const user = getUser()._id;
  const isCurrentUserPageOwner = (panelDocData?.page?.pageOwners || []).includes(user);

  const getHandleBlur = fieldName => {
    return () => {
      setFieldTouched(fieldName, true, true);
    };
  };

  /*
   * currently disabled as <Prompt /> has been temporarily removed from react-router-dom v6
   * see: https://reactrouter.com/en/main/upgrading/v5#prompt-is-not-currently-supported
   */
  const promptUserWhenLeavingPage = isFormEditable && false;
  return (
    <Form
      form={form}
      id="panel-doc-detail-form"
      onFinish={handleSubmit}
      layout="vertical"
      className={classes.form}
      initialValues={initialValues}
    >
      {getPageTitle()}
      {promptUserWhenLeavingPage && (
      <Prompt message={location => {
        if (location.pathname.startsWith(ROUTE.PAGE_DETAIL.path.replace(':id', ''))) return t('CONFIRM_NAVIGATE_TO_DETAIL_PAGE');
        return t('CONFIRM_EXIT_PAGE');
      }}
      />
      )}
      <Card title={t('GENERAL_DETAIL')} className={classes.card}>

        <Row gutter={[4, 4]} align="bottom">
          <Col xs={24} sm={12}>
            <Form.Item
              help={get(touched, 'name.tr') && get(errors, 'name.tr')}
              validateStatus={get(touched, 'name.tr') && get(errors, 'name.tr') ? 'error' : 'success'}
              name={['name', 'tr']}
              label={`${t('FORM.DOCUMENT_NAME')} (TR)`}
            >
              <Input
                value={values.name.tr}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('name.tr', value);
                }}
                onBlur={getHandleBlur('name.tr')}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              help={get(touched, 'name.en') && get(errors, 'name.en')}
              validateStatus={get(touched, 'name.en') && get(errors, 'name.en') ? 'error' : 'success'}
              name={['name', 'en']}
              label={`${t('FORM.DOCUMENT_NAME')} (EN)`}
            >
              <Input
                value={values.name.en}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('name.en', value);
                }}
                onBlur={getHandleBlur('name.en')}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[4, 4]} align="bottom">
          <Col xs={24} sm={12}>
            <Form.Item
              help={get(touched, 'description.tr') && get(errors, 'description.tr')}
              validateStatus={get(touched, 'description.tr') && get(errors, 'description.tr') ? 'error' : 'success'}
              name={['description', 'tr']}
              label={`${t('FORM.DOCUMENT_DESCRIPTION')} (TR)`}
            >
              <Input
                value={values.description.tr}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('description.tr', value);
                }}
                onBlur={getHandleBlur('description.tr')}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              help={get(touched, 'description.en') && get(errors, 'description.en')}
              validateStatus={get(touched, 'description.en') && get(errors, 'description.en') ? 'error' : 'success'}
              name={['description', 'en']}
              label={`${t('FORM.DOCUMENT_DESCRIPTION')} (EN)`}
            >
              <Input
                value={values.description.en}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('description.en', value);
                }}
                onBlur={getHandleBlur('description.en')}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[4, 4]} align="bottom">
          <Col xs={24} sm={12}>
            <Form.Item
              help={get(errors, 'componentIds')}
              validateStatus={get(errors, 'componentIds') ? 'error' : 'success'}
              name={['componentIds']}
              label={t('FORM.RELATED_COMPONENTS')}
            >
              <Select
                value={values.componentIds}
                onChange={ids => {
                  setFieldValue('componentIds', ids);
                }}
                mode="multiple"
                options={componentsOptions}
                filterOption={getSelectFilterOption}
                placeholder={isFormEditable && t('COMPONENTS_PLACEHOLDER')}
                disabled={!isFormEditable}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={t('CONTENT')} className={classes.card}>
        <ContentEditor
          ref={editorRef}
          readOnly={!isFormEditable}
          contentFileUrls={panelDocData?.contentFileUrls}
          tooltips={{
            heading: t('EDITOR.HEADING'),
            size: t('EDITOR.SIZE'),
            bold: t('EDITOR.BOLD'),
            italic: t('EDITOR.ITALIC'),
            underline: t('EDITOR.UNDERLINE'),
            fontColour: t('EDITOR.FONT_COLOUR'),
            fontBackgroundColour: t('EDITOR.FONT_BACKGROUND_COLOUR'),
            removeFormatting: t('EDITOR.REMOVE_FORMATTING'),
            numberedList: t('EDITOR.NUMBERED_LIST'),
            bulletList: t('EDITOR.BULLET_LIST'),
            indent: t('EDITOR.INDENT'),
            dedent: t('EDITOR.DEDENT'),
            alignment: t('EDITOR.ALIGNMENT'),
            insertImage: t('EDITOR.INSERT_IMAGE'),
            insertTable: t('EDITOR.INSERT_TABLE'),
            insertRowAbove: t('EDITOR.INSERT_ROW_ABOVE'),
            insertRowBelow: t('EDITOR.INSERT_ROW_BELOW'),
            insertColumnLeft: t('EDITOR.INSERT_COLUMN_LEFT'),
            insertColumnRight: t('EDITOR.INSERT_COLUMN_RIGHT'),
            deleteRow: t('EDITOR.DELETE_ROW'),
            deleteColumn: t('EDITOR.DELETE_COLUMN'),
            undo: t('EDITOR.UNDO'),
            redo: t('EDITOR.REDO'),
          }}
          placeholder={t('CONTENT_PLACEHOLDER')}
        />
      </Card>
      <Card title={t('FILES_TITLE')} className={classes.card}>
        {isFormEditable && getFilesInputs()}
        {!isFormEditable && getFilesView()}
      </Card>
      <Card title={t('FAQS')} className={classes.card}>
        {isFormEditable && getFaqsInputs()}
        {!isFormEditable && getFaqsView()}

      </Card>

      {isCurrentUserPageOwner && getFormActionButtons()}
    </Form>
  );

  function getPageTitle() {
    const pageUrl = ROUTE.PAGE_DETAIL.path.replace(':id', panelDocData?.page?._id);

    return (
      <div className={classes.pageTitle}>
        <span><Link to={pageUrl}>{panelDocData?.page?.name?.[getLangKey()]}</Link></span>
        {isCurrentUserPageOwner && getFormActionButtons(true)}
      </div>
    );
  }

  function getFilesInputs() {
    const files = values.files || [];

    const isParentError = typeof get(errors, 'files') === 'string';

    const insertFirstFile = () => {
      insertFile(0);
      AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.ADD_FIRST_FILE });
    };

    if (files.length === 0) {
      return (
        <Row>
          <Col>
            {touched.files && isParentError && <Alert message={errors.files} type="error" showIcon />}
            <Button type="primary" onClick={insertFirstFile}>
              {t('ADD_FIRST_FILE')}<PlusOutlined />
            </Button>
          </Col>
        </Row>
      );
    }

    return (
      <EditFilesTable
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        getHandleBlur={getHandleBlur}
        onFileUpload={onFileUpload}
        insertFile={insertFile}
        removeFile={removeFile}
        isPending={isPending}
      />
    );

    function insertFile(index) {
      const newFile = {
        title: {
          tr: '',
          en: '',
        },
        langKeys: [],
        fakeId: Date.now(),
        data: null,
        fileName: '',
      };

      const newFiles = [...files];
      newFiles.splice(index, 0, newFile);
      setFieldValue('files', newFiles);
    }

    function removeFile(index) {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFieldValue('files', newFiles);
      if (newFiles.length === 0) {
        setFieldTouched('files', true, true);
      }

      const fieldsToClear = [
        `files[${index}].langKeys`,
        `files[${index}].title.tr`,
        `files[${index}].title.en`,
        `files[${index}].data`,
      ];
      fieldsToClear.forEach(field => setFieldTouched(field, false));
    }

    function onFileUpload(event, index) {
      const file = get(event, 'target.files[0]', null);

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const data = get(reader, 'result', null);

          if (data) {
            const newFiles = [...files];
            const newFile = { ...newFiles[index] };
            newFile.data = data;
            newFile.fileName = file.name;
            newFile.contentType = file.type;
            // if there was an uploaded file before, remove its key
            newFile.fileKey = undefined;
            newFile.softRemoved = false;

            newFiles[index] = newFile;
            setFieldValue('files', newFiles);
          }
        };
        reader.readAsDataURL(file);
      }
      else {
        // no file means user cleared the file input
        const newFiles = [...files];
        const newFile = { ...newFiles[index] };
        newFile.data = undefined;
        newFile.fileName = undefined;
        newFile.contentType = undefined;
        // if there was an uploaded file before, remove its key
        newFile.fileKey = undefined;
        newFile.softRemoved = false;
        newFiles[index] = newFile;
        setFieldValue('files', newFiles);
      }
    }
  }

  function getFilesView() {
    const allFiles = get(values, 'files', []);

    return (
      <AntTableV2
        data={allFiles}
        columns={getFilesColumns(t, classes.tableFileName)}
        loading={isPending}
        footer={null}
        scroll={null}
      />
    );
  }

  function getFaqsInputs() {
    const faqs = values.faqs || [];
    const isParentError = typeof get(errors, 'faqs') === 'string';

    const insertFirstFaq = () => {
      insertFaq(0);
      AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.ADD_FIRST_FAQ });
    };

    if (faqs.length === 0) {
      return (
        <Row>
          <Col>
            {touched.faqs && isParentError && <Alert message={errors.faqs} type="error" showIcon />}
            <Button type="primary" onClick={insertFirstFaq}>
              {t('ADD_FIRST_FAQ')}<PlusOutlined />
            </Button>
          </Col>
        </Row>
      );
    }

    return (
      <EditFaqTable
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        getHandleBlur={getHandleBlur}
        insertFaq={insertFaq}
        removeFaq={removeFaq}
        isPending={isPending}
      />
    );

    function insertFaq(index) {
      const newFaqs = [...faqs];
      const newFaq = {
        fakeId: Date.now(),
        question: {
          tr: '',
          en: '',
        },
        answer: {
          tr: '',
          en: '',
        },
      };

      newFaqs.splice(index, 0, newFaq);
      setFieldValue('faqs', newFaqs);
      setFieldTouched('faqs');
    }

    function removeFaq(index) {
      const newFaqs = [...faqs];
      newFaqs.splice(index, 1);
      setFieldValue('faqs', newFaqs);
      setFieldTouched('faqs');
    }
  }

  function getFaqsView() {
    const allFaqs = values.faqs || [];
    const langAvailableFaqs = allFaqs.filter(faq => {
      return faq?.question?.[getLangKey()];
    });

    const emptyText = allFaqs.length ? t('NO_FAQS_FOR_LANG') : t('NO_FAQS');

    const header = faq => (
      <div className={classes.question}>
        {faq.question?.[getLangKey()] || '-'}
      </div>
    );

    return (
      !langAvailableFaqs.length ? (
        <div style={{ textAlign: 'center' }}>
          {emptyText}
        </div>
      ) :
        (
          <Collapse defaultActiveKey={[]}>
            {
              langAvailableFaqs.map(faq => {
                return (
                  <Panel header={header(faq)} key={faq._id || faq.fakeId}>
                    <p>{faq.answer?.[getLangKey()] || '-'}</p>
                  </Panel>
                );
              })
            }
          </Collapse>
        )
    );
  }

  function getFormActionButtons(atTop = false) {
    const isSwitchDisabled = !isCurrentUserPageOwner || isPending || isUpdatePending || (!panelDocData?.isActive && !isValidForActivation);

    const buttons = isFormEditable ? [
      <Button
        key="cancel"
        onClick={() => resetFormWrapped()}
      >
        {t('CANCEL')}
      </Button>,

      <Button
        type="primary"
        htmlType="submit"
        key="save"
        loading={isPending || isUpdatePending}
      >
        {t('SAVE')}
      </Button>,
    ] :
      (
        <Button
          onClick={() => {
            setIsFormEditable(true);
            AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.DOCUMENTATION_DETAIL.BUTTON.DOCUMENT_EDIT });
          }}
          type="primary"
          loading={isPending || isUpdatePending}
          htmlType="button"
        >
          {t('EDIT')}
        </Button>
      );

    const highlightExpiryDate = moment(panelDocData.lastHighlightedAt).add(2, 'months').format(getLocalDateTimeFormat());
    return (
      <Row gutter={[4, 4]} className={classes.actionButtons}>
        {atTop && (
          <>
            <div className={classes.highlightContainer}>
              <Popconfirm
                title={t('HIGHLIGHT_CONFIRMATION')}
                disabled={panelDocData?.isHighlighted}
                onConfirm={() => handleHighlightStatusChange(!panelDocData?.isHighlighted)}
              >
                <Button
                  className={classes.highlightButton}
                  title={panelDocData?.isHighlighted ? t('REMOVE_HIGHLIGHT_TOOLTIP') : t('HIGHLIGHT_TOOLTIP')}
                  onClick={() => {
                    if (panelDocData?.isHighlighted) handleHighlightStatusChange(false);
                  }}
                >
                  {panelDocData?.isHighlighted ? t('NO_HIGHLIGHT') : t('HIGHLIGHT')}
                </Button>
              </Popconfirm>
              {panelDocData?.isHighlighted &&
                <span className={classes.highlightExpiryDate}>{t('END_DATE')}: {highlightExpiryDate}</span>}
            </div>
            <Switch
              key="0"
              loading={isPending || isUpdatePending}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              checked={panelDocData?.isActive}
              onChange={handleActivenessStatusChange}
              className={panelDocData?.isActive ? 'bg-success' : 'bg-danger'}
              disabled={isSwitchDisabled}
            />
          </>
        )}
        {buttons}
      </Row>
    );
  }
};

export default memo(PanelDocForm);
